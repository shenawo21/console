import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

import TableCascader from 'components/TableCascader';

import {Row, Col, Form, Button, Input, message} from 'hen';

class AdjustStock extends Component {
    
    constructor() {
        super();
        this.getData = this.getData.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.state = {
            stock: null,
            stockList: [{skuId:10606002,stock:12}, {skuId:10611002,stock:11}]
        }
    }

    _getFormItems(){
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
            title: '规格',
            dataIndex: 'specOneValue'
        }, {
            key: '4',
            title: '库存',
            dataIndex: 'stock'
        }, {
            key: '5',
            title: '增加库存',
            dataIndex: 'stock',
            render(value, row) {
                return <Input type="text" placeholder="请输入出库库存数" style={{width:120}} onChange={(e) => {
                    context.setState({
                        stock: e.target.value
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
    
    //提交数据
    handleSubmit(e) {
        const context = this;
        const { adjustStock } = context.props;
        const { stockList } = context.state;
        e.preventDefault();
        
        adjustStock({
            stockList: stockList
        });
        
    }

    //重置
    handleReset(e) {
        e.preventDefault();
        this.context.router.push('/virtualhouse')
    }
    
    render() {
        
        let {formOptions, tableOptions, shopList} = this.props;

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
                <div className="tc">
                    <Button type="ghost" onClick={this.handleReset.bind()}>取消</Button>
                    &nbsp;&nbsp;&nbsp;
                    <Button type="primary" onClick={this.handleSubmit.bind()}>确认</Button>
                </div>
            </div>
        )
    }
}


AdjustStock.propTypes = {
    adjustStock: React.PropTypes.func,    
    loading : React.PropTypes.bool,
    params : React.PropTypes.object
}

AdjustStock.contextTypes = {
    router: React.PropTypes.object.isRequired,
};

export default AdjustStock;
