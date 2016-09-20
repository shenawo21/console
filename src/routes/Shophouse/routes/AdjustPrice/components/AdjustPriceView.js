import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

import TableCascader from 'components/TableCascader';
import {getSpecValue} from 'common/utils'
import {Form, Button, Input, message, InputNumber} from 'hen';
const FormItem = Form.Item;

class AdjustPrice extends Component {
    
    constructor() {
        super();
        this.getData = this.getData.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.goBack = this.goBack.bind(this);
        this.state = {
            priceList: []
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
            title: '库存',
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
            title: '销售价',
            dataIndex: 'price'
        }, {
            key: '5',
            title: '调整销售价',
            dataIndex: 'price',
            render(value, row){
                return <InputNumber type="text" min={0.01} max={9999999} step={0.01} placeholder="请输入调整销售价" style={{width:120}} onChange={(e) => {
			        let {priceList} = context.state, price = { skuId: row.skuId, stockId: row.stockId, shopId: row.shopId, price: e }, selectItems = []
                        selectItems = priceList.filter((val) => {
                            return val.skuId !== row.skuId
                        })
                        selectItems.push(price)
                        context.setState({
                            priceList: selectItems
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
        const {priceList} = this.state, curPriceList = [];
        if (items) {
            items.forEach((item) => {
                priceList.every((val) => {
                    if (val.skuId == item.skuId) {
                        curPriceList.push(val)
                        return false
                    }
                    return true
                })
            })
            this.setState({
                priceList: curPriceList
            })
        }
    }

    //提交数据
    handleSubmit(e) {
        const context = this;
        const { uptPrice, form } = context.props;
        const { priceList } = context.state;
        e.preventDefault();
        form.validateFieldsAndScroll((errors, values) => {

            if (!!errors) {
                if (__DEV__) {
                    console.log('Errors in form!!!', errors, form.getFieldsValue());
                }
                return;
            }

            // 商品数量为0时提示选择商品并做库存及价格设置
            // if(!priceList.length){    
            //     message.warning('请选择出库商品并做库存及价格设置', 10);
            //     return;
            // }
           
            uptPrice({
                ...values,
                dtoList: priceList
            });
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
                    name: '设置销售价格'
                }]
            }
        }

        const textareaProps = getFieldProps('remark', {
            rules: [
                { required: true, message: '真的不打算写点什么吗？' }
            ],
        });

        return (
            <div>
                <Form horizontal form={this.props.form}>
                    <FormItem
                        id="control-textarea"
                        label="调整说明："
                        labelCol={{ span: 2 }}
                        wrapperCol={{ span: 14 }}
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
        )
    }
}

AdjustPrice.propTypes = {    
    uptPrice:React.PropTypes.func,    
    loading : React.PropTypes.bool,
    params : React.PropTypes.object
}

AdjustPrice.contextTypes = {
    router: React.PropTypes.object.isRequired,
};

export default Form.create()(AdjustPrice);
