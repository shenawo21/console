import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

import TableCascader from 'components/TableCascader';

import {Row, Col, Form, Button} from 'hen';
const FormItem = Form.Item;

//商品类目
const STOCKTYPE = [
   { value: '调拨出库', title: "调拨出库" },
   { value: '损耗出库', title: "损耗出库" },
   { value: '盘点出库', title: "盘点出库" }
];

class AdjustStock extends Component {
    
    constructor() {
        super();
        this.getData = this.getData.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleReset = this.handleReset.bind(this);
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
            title: 'spu编码',
            dataIndex: 'spuId'
        }, {
            key: '1',
            title: 'sku编码',
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
            title: '库存',
            dataIndex: 'stock'
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
                    name: '选择待调整的库存商品'
                }]
            },
            dist: {
                titles:[{
                    name: '增加库存列表'
                }]
            }
        }

        return (
            <div>
                    <TableCascader uKey='skuId' formOptions={formOptions} tableOptions={tableOptions} distTableOptions={distTableOptions} getSelectItems={this.getData} collapseOptions={collapseOptions}></TableCascader>
    
                     <div
                        wrapperCol={{ span: 12, offset: 11 }}
                    >
                        <Button type="ghost" onClick={this.handleReset.bind()}>取消</Button>
                        &nbsp;&nbsp;&nbsp;
                        <Button type="primary" onClick={this.handleSubmit.bind()}>确认</Button>
                    </div>
            </div>
        )
    }
}


AdjustStock.propTypes = {
    
    dataSource : React.PropTypes.array.isRequired,
    action : React.PropTypes.func.isRequired,
    
    loading : React.PropTypes.bool,
    params : React.PropTypes.object
}


export default AdjustStock;
