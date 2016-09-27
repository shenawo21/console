import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

import TableCascader from 'components/TableCascader';
import {Button, Input, message, InputNumber} from 'hen';
import {getSpecValue} from 'common/utils'
class AdjustStock extends Component {

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
            dataIndex: 'specOneValue',
            render(val, row){
                return getSpecValue(row)
            }
        }, {
            key: '4',
            title: '库存',
            dataIndex: 'stock'
        }, {
            key: '5',
            title: '增加库存',
            dataIndex: 'stock',
            render(value, row) {
                return <InputNumber type="text" min={1} max={99999999} placeholder="请输入出库库存数" style={{ width: 120 }} onChange={(e) => {
                    let {stockList} = context.state, stock = { skuId: row.skuId, stock: e }, selectItems = []
                    selectItems = stockList.filter((val) => {
                        return val.skuId !== row.skuId
                    })
                    selectItems.push(stock)
                    context.setState({
                        stockList: selectItems
                    })
                } } defaultValue = {1} />
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

    //提交数据
    handleSubmit(e) {
        const { adjustStock } = this.props;
        const { stockList } = this.state;
        e.preventDefault();

        // 增加库存列表为空，请选择商品并进行库存修改
        if(!stockList.length){
            message.warning('增加库存列表为空，请选择商品并进行库存修改！', 10);
            return;
        }
        
        adjustStock({
            stockList: stockList
        });
    }
	//返回
    goBack(e) {
        e.preventDefault();
        this.context.router.push('/virtualhouse/storageMgt')
    }

    render() {

        let {formOptions, tableOptions} = this.props;

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
            source: {
                titles: [{
                    name: '选择待调整的库存商品'
                }]
            },
            dist: {
                titles: [{
                    name: '增加库存列表'
                }]
            }
        }

        return (
            <div>
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


AdjustStock.propTypes = {
    adjustStock: React.PropTypes.func,
    loading: React.PropTypes.bool,
    params: React.PropTypes.object
}

AdjustStock.contextTypes = {
    router: React.PropTypes.object.isRequired,
};

export default AdjustStock;
