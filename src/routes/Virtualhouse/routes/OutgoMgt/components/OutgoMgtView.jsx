import React, {Component, PropTypes} from 'react';

import TableCascader from 'components/TableCascader';

import { Input, Select, Button, Form } from 'hen';
const FormItem = Form.Item;
const Option = Select.Option;

import {Link} from 'react-router';

//出库类型
const STOCKTYPE = [
   { value: '调拨出库', title: "调拨出库" },
   { value: '损耗出库', title: "损耗出库" },
   { value: '盘点出库', title: "盘点出库" }
];

class outgoMgt extends Component {

  constructor() {
    super();
    this.getData = this.getData.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.state = {
        stockList: [],
        incoming : '',
        price : ''
    }
  }

  _getFormItems(){
        let config = {
            formItems: [{
                label: "商品名称：",
                name: "title",
                input: {
                    placeholder: "请输入商品名称"
                }
            },{
                label: "SPU：",
                name: "spuId",
                input: {
                    placeholder: "请输入SPU"
                }
            },{
                label: "SKU：",
                name: "skuId",
                input: {
                    placeholder: "请输入SKU"
                }
            },{
                label: "商品类目：",
                name: "categoryName",
                select: {
                    placeholder: "请选择商品类目",
                    optionValue : STOCKTYPE                    
                }
            }],
            initValue: {
                title: null,
                spuId : null,
                skuId: null,
                categoryName : null
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
            dataIndex: 'specOneValue'
        }, {
            key: '5',
            title: '市场价',
            dataIndex: 'marketPrice'
        }, {
            key: '6',
            title: '销售价',
            dataIndex: 'price'
        }, {
            key: '7',
            title: '剩余可分配库存',
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
            render(value, row){
                return <span>{value}/{row.specOneValue}</span>
            }
        }, {
            key: '5',
            title: '市场价',
            dataIndex: 'marketPrice'
        }, {
            key: '6',
            title: '销售价',
            dataIndex: 'price'
        }, {
            key: '7',
            title: '建议销售价',
            dataIndex: 'price',
            render(value, row){
                return <Input type="text" placeholder="请输入建议销售价" onChange={(e) => {
                    context.setState({
                        price: e.target.value
                    })
                }} defaultValue={value}/> 
            } 
        }, {
            key: '8',
            title: '剩余可分配库存',
            dataIndex: 'stock'
        }, {
            key: '9',
            title: '出库库存数',
            dataIndex: 'incoming',
            render(value, row){
                return <Input type="text" placeholder="请输入出库库存数"  onChange={(e) => {
                    context.setState({
                        incoming: e.target.value
                    })
                }} defaultValue={value} /> 
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
        console.log('items=======', items)
    }
    
    //修改店铺时删除目标表格数据

    handleChange(value) {
        console.log(`selected ${value}`);
    }


    //提交数据
    handleSubmit(e) {
        const context = this;
        const { stockList } = context.state;
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((errors, values) => {

            const params = {
                ...values,
                stockDetailList: stockList
            }
         });
        
    }

    //重置
    handleReset(e) {
        const context = this;
        e.preventDefault();
        context.props.form.resetFields();
    }
    
  render() {
        
        let {formOptions, tableOptions, shopList, form} = this.props;
        let { getFieldProps, getFieldError, isFieldValidating } = form;

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

        let collapseOptions = {
            source : {
                titles:[{
                    name: '选择商品'
                }]
            },
            dist: {
                titles:[{
                    name: '库存及价格设置'
                }]
            }
        }

        const formItemLayout = {
            labelCol: { span: 3 },
            wrapperCol: { span: 14 }
        };

        const selectProps = getFieldProps('recordType', {
            rules: [
                { required: true, message: '请选择出库类型' },
            ],
        });

        const multiSelectProps = getFieldProps('operateStore', {
            rules: [
                { required: true, message: '请选择待出库店铺' },
            ],
        });

        const textareaProps = getFieldProps('mark', {
            rules: [
                { required: true, message: '真的不打算写点什么吗？' },
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
                            <Option value="调拨出库">调拨出库</Option>
                            <Option value="耗损出库">耗损出库</Option>
                            <Option value="盘点出库">盘点出库</Option>
                        </Select>
                    </FormItem>

                    <FormItem
                        label="待出库店铺："
                        {...formItemLayout}                
                    >
                    <Select {...multiSelectProps} placeholder="请选择待出库店铺" style={{ width: 200 }}>
                        {
                            shopList && shopList.map((val, i) => {
                               typeof val.value === 'boolean' && (val.value = '' + val.value);
                                return <Option key={i} {...val}>{val.name}</Option>
                            })
                        }                        
                        <Option value="2">乐购天猫旗舰店</Option>
                    </Select>
                    </FormItem>

                    <FormItem
                        id="control-textarea"
                        label="出库说明："
                        {...formItemLayout}
                    >
                        <Input type="textarea" {...textareaProps} rows="3" />
                    </FormItem>

                    
                    <FormItem
                        wrapperCol={{ span: 12, offset: 11 }}
                    >
                        <Button type="ghost" onClick={this.handleReset.bind()}>取消</Button>
                        &nbsp;&nbsp;&nbsp;
                        <Button type="primary" onClick={this.handleSubmit.bind()}>确认</Button>
                    </FormItem> 
                </Form>
                <TableCascader uKey='skuId' formOptions={formOptions} tableOptions={tableOptions} distTableOptions={distTableOptions} getSelectItems={this.getData} collapseOptions={collapseOptions}></TableCascader>

            </div>
        );
  }

}

outgoMgt.proptype = {

  loading: React.PropTypes.bool,
  params: React.PropTypes.object

}

export default Form.create()(outgoMgt);

