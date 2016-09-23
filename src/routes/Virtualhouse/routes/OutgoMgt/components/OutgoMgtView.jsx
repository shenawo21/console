import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

import TableCascader from 'components/TableCascader';
import {getSpecValue} from 'common/utils'

import { Input, Select, Button, Form, message, InputNumber } from 'hen';
const FormItem = Form.Item;
const Option = Select.Option;

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
    this.goBack = this.goBack.bind(this);
    this.state = {
        stockList: []
    }
  }

    _getFormItems() {
        let context = this;
        const {cateList} = context.props;
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
                    placeholder: "请输入SPU",
                    type: 'number'
                }
            },{
                label: "SKU：",
                name: "skuId",
                input: {
                    placeholder: "请输入SKU",
                    type: 'number'
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
                title: null,
                spuId : null,
                skuId: null,
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
                return getSpecValue(row)
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
            dataIndex: 'advicePrice',
            render(value, row){
                return <InputNumber type="text" step={0.01} min={0.01} max={99999999} placeholder="请输入建议销售价" style={{ width: 120 }} onChange={(e) => {
                    let {stockList} = context.state, stock = { skuId: row.skuId }, selectItems = [], incoming = ''
                        if(!e) return;
                        stockList.forEach((val) => {
                            if(val.skuId !== row.skuId){
                                selectItems.push(val)
                            }else{
                                incoming = val.incoming
                            }
                        })
                        stock.price = e
                        stock.incoming = incoming
                        selectItems.push(stock)
                        context.setState({
                            stockList: selectItems
                        })
                }} defaultValue={row.price} />
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
                return <InputNumber type="text" min={1} max={row.stock} placeholder="请输入出库库存数" style={{width:100}} onChange={(e) => {
                    let {stockList} = context.state, stock = { skuId: row.skuId }, selectItems = [], price = '';
                        if(!e) return;
                        stockList.forEach((val) => {
                            if(val.skuId !== row.skuId){
                                selectItems.push(val)
                            }else{
                                price = val.price
                            }
                        })
                        stock.incoming = e
                        stock.price = price
                        selectItems.push(stock)
                        context.setState({
                            stockList: selectItems
                        })
                }} />
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
        const {stockList} = this.state, curStockList = [];
        if (items) {
            items.forEach((item) => {
                stockList.every((val) => {
                    if (val.skuId == item.skuId) {
                        curStockList.push(val)
                        return false
                    }
                    return true
                })
            })
            this.setState({
                stockList: curStockList
            })
        }
    }

    //修改店铺时删除目标表格数据

    handleChange(value) {
        console.log(`selected ${value}`);
    }


    //提交数据
    handleSubmit(e) {
        const context = this;
        const { storeManage, form } = context.props;
        const { stockList } = context.state;
        e.preventDefault();

        form.validateFieldsAndScroll((errors, values) => {

            if (!!errors) {
                if (__DEV__) {
                    console.log('Errors in form!!!', errors, form.getFieldsValue());
                }
                return;
            }

            // 商品数量为0时提示选择商品并做库存及价格设置
            if(!stockList.length){
                message.warning('请选择出库商品并做库存及价格设置', 5);
                return;
            }

            storeManage({
                ...values,
                recordType: '出库',
                stockDetailList: stockList
            });
         });


    }

    //返回
    goBack(e) {
        e.preventDefault();
        this.context.router.push('/virtualhouse')
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

        const selectProps = getFieldProps('stockType', {
            rules: [
                { required: true, message: '请选择出库类型' },
            ],
        });

        const multiSelectProps = getFieldProps('relevantStore', {
            rules: [
                { required: true, type: 'string', message: '请选择待出库店铺' },
            ],
        });

        const textareaProps = getFieldProps('remark', {
            rules: [
                { required: true, message: '真的不打算写点什么吗？' },
            ],
        });

        return (
            <div>
                <Form horizontal form={this.props.form} >
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
                                return <Option key={i} value={val.title} disabled={val.disabled}>{val.title}</Option>
                            })
                        }
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

            </div>
        );
  }

}

//数据限制类型
outgoMgt.proptype = {
  storeManage: React.PropTypes.func,
  loading: React.PropTypes.bool,
  params: React.PropTypes.object

}

outgoMgt.contextTypes = {
    router: React.PropTypes.object.isRequired,
};


export default Form.create()(outgoMgt);

