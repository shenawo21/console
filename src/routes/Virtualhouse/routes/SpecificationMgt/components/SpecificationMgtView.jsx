import React, {Component, PropTypes} from 'react';

import DataTable from 'components/DataTable'

import {Row, Col, Button, Icon, Alert, Cascader, Tabs, Form } from 'hen';
import {Link} from 'react-router';
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

const quickButton = <Button>添加规格值</Button>;

class specificationMgt extends Component {

    constructor(){
        super();
        this.getSpecList= this.getSpecList.bind(this);
        this.callback= this.callback.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            specList: []
        }
    }

    _getColumns(){
        const context = this;
        let columns = [{
            key: '1',
            title: '规格名称',
            dataIndex: 'account'
        }, {
            key: '2',
            title: '操作',
            dataIndex: 'name'
        }];
        
        return columns;
    }
    
    // 按钮
    quickButton(){ 
        return <Button>添加属性规格</Button>
    }
    //根据商品类目获取规格属性
    getSpecList(value) {    	
        const context = this;
        const { specList } = context.props;        
        specList(value);
    }
    
    callback(key) {
    	console.log(key);
    }
    
    //提交数据
    handleSubmit(e) {
        const context = this;
        const { specList } = context.state;
	    const {  } = context.props;
        e.preventDefault();
           
            /*storeManage({
                enterpriseSpecList: specList
            });*/

        
    }

    render() {
        const {formOptions, cateList, item, ...other} = this.props;
        const note = <ol>
            <li>1、选择企业经营的商品类目，以读取平台绑定的商品类目及类目下的规格类型，如类目：“服装”；规格类型：“颜色”、“尺码”等。</li>
            <li>2、添加所属规格类型下的规格值，已有规格值可以删除；新增的规格值必须填写，否则该行数据不会被更新或者保存。</li>
            <li>3、可通过排序0-255改变规格值显示顺序。</li>
        </ol>
        return (
            <div>
                <Alert message="操作提示：" description={note} type="info" closeText="不再提醒" />
                <Form horizontal >
                    <FormItem
                        label="操作提示："
                        labelCol={{ span: 2 }}
                        wrapperCol={{ span: 16 }}
                    >
                        <Cascader style={{ width: 200 }} options={cateList} onChange={this.getSpecList.bind()} placeholder="请选择" />
                    </FormItem>

                    <Tabs defaultActiveKey="1" onChange={this.callback.bind()} tabBarExtraContent={this.quickButton}>
                        <TabPane tab="颜色" key="1">
                            <DataTable bordered={true} columns={this._getColumns()} {...other} />
                        </TabPane>
                        <TabPane tab="尺寸" key="2">
                            <DataTable bordered={true} columns={this._getColumns()} {...other} />
                        </TabPane>
                    </Tabs>  
                
                    <div className="tc">
                        <Button type="primary" onClick={this.handleSubmit.bind()}>提交保存规格值</Button>
                    </div> 
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

