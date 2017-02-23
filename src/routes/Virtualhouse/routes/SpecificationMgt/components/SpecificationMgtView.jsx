import React, {Component, PropTypes} from 'react';

import DataTable from 'components/DataTable'

import {Row, Col, Button, Icon, Alert, Cascader, Tabs, Form, Input, message } from 'hen';
import {Link} from 'react-router';
import {getPermissions} from 'common/utils'

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;


class specificationMgt extends Component {

    constructor(props) {
        super(props);
        this.getSpecCateList = this.getSpecCateList.bind(this);
        this.callback = this.callback.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            specList: [],      //规格列表
            delSpecList : [],  //删除的规格值列表
            subFlag : false,
            curKey: 0
        }
        const url = location.hash.split('?')[0].split('#')[1]
        this.check = getPermissions(url)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.specListResult != this.props.specListResult) {
            this.setState({
                specList: nextProps.specListResult
            })
        }
    }

    _getColumns() {
        const context = this;
        let columns = [{
            key: '1',
            title: '规格名称',
            dataIndex: 'specValue',
            render(val, row, index){
                //console.log(row)
                let {specList, curKey} = context.state
                return row.id ? <span>{val}</span> : <Input type='text' onChange={(e)=>{
                    specList[curKey].enterpriseSpecList[index].specValue = e.target.value
                    context.setState({specList})
                }} value={val} />
            }
        }, {
            key: '2',
            width: 50,
            title: '操作',
            dataIndex: 'specId',
            render(val, row, index) {
                let checkFlag = row.id ? true : false
                return <Button onClick={context._checkId.bind(context, row.id, checkFlag, index) }>删除</Button>
            }
        }];

        return columns;
    }

    // 添加属性规格
    quickButton() {
        const context = this;
        return <span>{this.check('添加属性规格') ? <Button onClick={context._addSpec.bind(this)}>添加属性规格</Button> : ''}</span>
    }

    //添加规格
    _addSpec() {
        let {specList, curKey} = this.state;
        let value = { specId: specList[curKey].specId, specValue: null };
        let eSpecList = specList[curKey].enterpriseSpecList
        if(eSpecList){
            eSpecList.push(value)
        }else{
            eSpecList = [value]
        }
        specList[curKey].enterpriseSpecList = eSpecList
        this.setState({
            specList
        })
    }

    //删除
    _checkId(id, checkFlag, index) {
        const { checkIsUsed } = this.props, context = this;
        let {curKey, specList, delSpecList} = this.state, curItems = [];

        if (checkFlag) {
            checkIsUsed({id}).then((res)=>{
                if(res.status === 1 && res.data){
                    if(!res.data.checkedResult){
                        if(specList[curKey].enterpriseSpecList.length){
                            let delSpec = specList[curKey].enterpriseSpecList.splice(index, 1)
                            delSpecList.push(delSpec[0].id)
                        }
                        context.setState({
                            specList,
                            delSpecList
                        })
                    }else{
                        let goodsSku = res.data.skuIdList && res.data.skuIdList.join(',');
                        message.error("此规格在skuId为["+ goodsSku +"]商品，不能删除", 3)
                    }
                }
            });
        } else {
            specList[curKey].enterpriseSpecList.length && specList[curKey].enterpriseSpecList.splice(index,1);
            this.setState({
                specList
            })
        }
    }

    //根据商品类目获取规格属性
    getSpecCateList(value) {
        const context = this;
        const id = value[value.length - 1] || ''
        const { getSpecList} = context.props;
        getSpecList(id)
    }

    //tab切换
    callback(key) {
        this.setState({
            curKey: key
        })
    }

    //提交数据
    handleSubmit(e) {
        e.preventDefault();
        const { addSpec, getSpecList } = this.props;
        let {specList, delSpecList} = this.state, addSpecList = [], addList= [];
        
        specList.forEach((val)=>{
            if(val.enterpriseSpecList){
                val.enterpriseSpecList.forEach((item)=>{
                    item.specValue && addSpecList.push({specId:item.specId, specValue:item.specValue, id : item.id})
                })
            }
        })
        addSpecList.forEach((val, i) => {
            val.id == undefined && addList.push({specId:val.specId, specValue:val.specValue});
        })
        if(addList.length || delSpecList.length){
            addSpec({
                enterpriseSpecList: addSpecList,
                deletes: delSpecList
            }).then((res)=>{
                if(res.status === 1){
                    message.success(res.message);                    
                    setTimeout(() => {
                        let id = specList[0].categoryCode;
                        getSpecList(id);
                    }, 500);
                }else{
                    message.error(res.message)
                }
            })
            
        } else{
            message.error('没有添加商品规格值或删除规格值！')
        }
        
    }

    render() {
        const {formOptions, cateList, isLoader,  ...other} = this.props;
        let { specList, curKey } = this.state;
        const note = <ol>
            <li>1、选择企业经营的商品类目，以读取平台绑定的商品类目及类目下的规格类型，如类目：“服装”；规格类型：“颜色”、“尺码”等。</li>
            <li>2、添加所属规格类型下的规格值，已有规格值可以删除；新增的规格值必须填写，否则该行数据不会被更新或者保存。</li>
        </ol>
        return (
            <div>
                <Alert message="操作提示：" description={note} type="info" closeText="不再提醒" />
                <Form horizontal >
                    <FormItem
                        label="选择分类："
                        labelCol={{ span: 2 }}
                        wrapperCol={{ span: 16 }}
                        >
                        <Cascader style={{ width: 200 }} options={cateList} onChange={this.getSpecCateList} changeOnSelect expandTrigger="click" placeholder="请选择" />
                    </FormItem>
                    {
                        specList.length ?
                            <Tabs defaultActiveKey="0" onChange={this.callback} tabBarExtraContent={this.quickButton()}>
                                {
                                    specList && specList.map((val, i) => {
                                        return <TabPane tab={val.name} key={i}>
                                            <DataTable bordered={true} columns={this._getColumns() } dataSource={val.enterpriseSpecList} />
                                        </TabPane>
                                    })
                                }
                            </Tabs> : <p className="tc">没有选择分类或者该分类下没有属性，不能添加规格值</p>
                    }
                    {
                        specList.length ? <div className="tc" style={{marginTop:'20px'}}>
                            <Button type="primary" onClick={this.handleSubmit}>提交保存规格值</Button>
                        </div> : ''
                    }

                </Form>

            </div>
        );
    }

}

specificationMgt.proptype = {

    loading: React.PropTypes.bool,
    params: React.PropTypes.object

}
export default specificationMgt;

