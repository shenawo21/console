import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

import TableCascader from 'components/TableCascader';
import DataTable from 'components/DataTable';
import {Form, Button, Input, Select, message, InputNumber, Modal } from 'hen';
import {getSpecValue} from 'common/utils'
const FormItem = Form.Item;

class OutgoManual extends Component {

     constructor() {
        super();
        this.getData = this.getData.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleOkMessage = this.handleOkMessage.bind(this);
        this.goBack = this.goBack.bind(this);
        this.state = {
            outgoList: [],
            resultVisible : false,      //手动出库处理结果显示
            messageDataSource: [],      //手动出库处理结果
        }
    }
    
    _getFormItems(){
        let context = this;
        const {cateList, shopList} = context.props;
        let config = {
            formItems: [{
                label: "商品名称：",
                name: "title",
                input: {
                    placeholder: "请输入商品名称"
                }
            },{
                label: "所属店铺：",
                name: "shopId",
                select: {
                    placeholder: "请选择所属店铺",
                    optionValue: shopList
                }
            },{
                label: "商品类目：",
                name: "categoryCode",
                wrapperCol: {span: 15},
                cascader: {
                    options: cateList,
                    placeholder: "请选择所属类目",
                    changeOnSelect: true
                }
            }],
            initValue: {
                title : null,
                shopId: null,
                categoryCode : null
            }
        }
        return config;
    }
    
    
    _getColumns(){
        const context = this;
        let columns = [{
            key: '0',
            title: 'SPU编码',
            dataIndex: 'spuId'
        }, {
            key: '1',
            title: 'SKU编码',
            dataIndex: 'skuId'
        }, {
            key: '2',
            title: '商品名称',
            dataIndex: 'title'
        }, {
            key: '3',
            title: '商品类目',
            dataIndex: 'categoryName'
        }, {
            key: '4',
            title: '规格',
            dataIndex: 'specOneValue',
            render(val, row){
                return getSpecValue(row)
            }
        }, {
            key: '5',
            title: '在售库存',
            dataIndex: 'stock'
        }];
        return columns;
    }
    
    _getColumnsDist(){
        const context = this;
        let columns = [{
            key: '0',
            title: 'SPU编码',
            dataIndex: 'spuId'
        }, {
            key: '1',
            title: 'SKU编码',
            dataIndex: 'skuId'
        }, {
            key: '2',
            title: '所属店铺',
            dataIndex: 'shopName'
        }, {
            key: '3',
            title: '商品名称',
            dataIndex: 'title'
        }, {
            key: '4',
            title: '在售库存',
            dataIndex: 'stock'
        }, {
            key: '5',
            title: '出库数量',
            dataIndex: 'incoming',
            render(value, row){
                return <InputNumber type="text" min={1} max={row.stock} placeholder="请输入出库数量" style={{width:150}} onChange={(e) => {
			            let {outgoList} = context.state, outgo = { skuId: row.skuId, spuId: row.spuId, stockId: row.stockId, shopId: row.shopId, price: row.price, incoming: e }, selectItems = [];
                        selectItems = outgoList.filter((val) => {
                            return val.skuId !== row.skuId
                        })
                        selectItems.push(outgo)
                        context.setState({
                            outgoList: selectItems
                        })
                }} defaultValue={value}/> 
            }
        }];
        return columns;
    }

    /**
     * 
     * 选中后，获取的数据
     * @param {any} items
     */
    getData(items) {
        const {outgoList} = this.state, curOutgoList = [];
        if (items) {
            items.forEach((item) => {
                outgoList.every((val) => {
                    if (val.skuId == item.skuId) {
                        curOutgoList.push(val)
                        return false
                    }
                    return true
                })
            })
            this.setState({
                outgoList: outgoList
            })
        }
    }

    _getStockColumns(){
        const context = this;
        let columns = [{
            key: '0',
            title: 'SKU',
            dataIndex: 'title'
        }, {
            key: '1',
            title: '处理结果',
            dataIndex: 'message'
        }];
        return columns;
    }

    /**
     * 提示信息确认
     */
    handleOkMessage() {
        const context = this;
        context.setState({
            resultVisible: false,
            messageDataSource: []
        });
        //提示完跳转到列表界面
        this.context.router.push('/shophouse')
    }

    //提交数据
    handleSubmit(e) {
        const context = this;
        const { outManual, form } = context.props;
        const { outgoList } = context.state;
        e.preventDefault();
        form.validateFieldsAndScroll((errors, values) => {

            if (!!errors) {
                if (__DEV__) {
                    console.log('Errors in form!!!', errors, form.getFieldsValue());
                }
                return;
            }
            if (outgoList.length) {
                console.log(outgoList,'outgoList')
                if (outgoList.incoming) {
                      outManual({
                            ...values,
                            dtoList: outgoList
                        }).then(function(res){
                            if(res && res.data) {
                                context.setState({
                                    messageDataSource: res.data,
                                    resultVisible: true
                                })
                            } else {
                                message.error(res.message);
                            }
                        })  

                } else {
                    message.error('请输入出库数量！')
                }
                
            } else {
                // 商品数量为0时提示选择商品并做库存及价格设置
                message.error('手动出库的商品列表为空，请选择出库商品并做库存及价格设置', 1)
            }

         });

        
    }

    //返回
    goBack(e) {
        e.preventDefault();
        this.context.router.push('/shophouse')
    }
    
    render() {
        let {formOptions, tableOptions, form} = this.props;
        let { getFieldProps, getFieldError, isFieldValidating } = form;
        let {resultVisible, messageDataSource} = this.state;
        tableOptions = {
            columns: this._getColumns(),
            ...tableOptions
        }

        let distTableOptions = {
            delFlag: true,
            columns: this._getColumnsDist()
        }

        formOptions = {
            items: this._getFormItems(),
            ...formOptions
        }

        const formItemLayout = {
            labelCol: { span: 2 },
            wrapperCol: { span: 14 }
        };

        let collapseOptions = {
            source : {
                titles:[{
                    name: '选择商品'
                }]
            },
            dist: {
                titles:[{
                    name: '出库数量设置'
                }]
            }
        }
        const selectProps = getFieldProps('stockType', {
            rules: [
                { required: true, message: '请选择出库类型' },
            ],
        });

        const textareaProps = getFieldProps('remark', {
            rules: [
                { required: true, message: '真的不打算写点什么吗？' }
            ],
        });
        
        return (
            <div>

                <Form horizontal form={this.props.form}>
                    <FormItem
                        label="出库类型："
                        {...formItemLayout}
                    >
                        <Select {...selectProps} defaultValue="调拨出库" placeholder="请选择出库类型" style={{ width: 200 }}>
                            <Option value="回退出库">回退出库</Option>
                            <Option value="损毁出库">损毁出库</Option>
                        </Select>
                    </FormItem>
                    <FormItem
                        id="control-textarea"
                        label="出库说明："
                        {...formItemLayout}
                    >
                        <Input type="textarea" {...textareaProps} rows="3" />
                    </FormItem>
                </Form>

                <TableCascader uKey='skuId' formOptions={formOptions} tableOptions={tableOptions} distTableOptions={distTableOptions} getSelectItems={this.getData} collapseOptions={collapseOptions}></TableCascader>
                <div className="tc">
                    <Button type="ghost" onClick={this.goBack.bind()}>取消</Button>
                    &nbsp;&nbsp;&nbsp;
                    <Button type="primary" onClick={this.handleSubmit.bind()}>确认</Button>
                </div>
                <Modal title="处理结果" visible={resultVisible} onOk={this.handleOkMessage} onCancel={this.handleOkMessage}>
                    <div className="modalResult">
                        <DataTable columns={this._getStockColumns()} size='small' dataSource={messageDataSource} />
                    </div>
                </Modal>
            </div>
        )
    }
}

OutgoManual.propTypes = {
    outManual:React.PropTypes.func,
    loading : React.PropTypes.bool,
    params : React.PropTypes.object
}

OutgoManual.contextTypes = {
    router: React.PropTypes.object.isRequired,
};

export default Form.create()(OutgoManual);
