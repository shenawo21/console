import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import DataTable from 'components/DataTable';
import Search from 'components/Search';
import {Table} from 'hen';

//店铺名称
const STORENAME = [
   { value: 'all', title: "全部" },
   { value: 'taobao', title: "淘宝" },
   { value: 'tianmao', title: "天猫" },
   { value: 'jingdong', title: "京东" }
];

class Checked extends Component {

    _getFormItems(){
    	let context = this;
        const {cateList} = context.props;
        let config = {
            formItems: [{
                label: "订单编号：",
                name: "tid",
                labelCol: {span: 8},
                span:7,
                input: {
                    placeholder: "请输入出库单号"
                }
            },{
                label: "买家账号：",
                name: "buyerNick",
                labelCol: {span: 8},
                span:7,
                input: {
                    placeholder: "请输入出库单号"
                }
            },{
                label: "店铺名称：",
                name: "shopName",
                labelCol: {span: 8},
                span:7,
                select: {
                    optionValue: STORENAME
                }
            },{
                label: "商品编码：",
                name: "skuId",
                labelCol: {span: 8},
                span:7,
                input: {
                    placeholder: "请输入商品编码"
                }
            },{
                label: "产品名称：",
                name: "title",
                labelCol: {span: 6},
                span:9,
                input: {
                    placeholder: "请输入产品名称"
                }
            }],
            initValue: {
                tid: null,
                buyerNick: null,
                shopName: 'all',
                skuId: null,
                title: null,
            }
        }
        return config;
    }

    _getColumns(){
        const context = this;
        let columns = [{
            key: '0',
            title: '订单编号',
            dataIndex: 'tid'
        }, {
            key: '1',
            title: '成交时间',
            dataIndex: 'payTime'
        }, {
            key: '2',
            title: '买家账号',
            dataIndex: 'buyerNick'
        }, {
            key: '3',
            title: '店铺名称',
            dataIndex: 'shopName'
        }, {
            key: '4',
            title: '售后类型',
            dataIndex: 'offSaleType'
        }, {
            key: '5',
            title: '操作',
            dataIndex: 'tid',
            render(id, row) {
                return <span><Link to="/">订单详情</Link></span>
            }
        }];
        
        return columns;
    }    
    _getSubColumns(){
        const context = this;
        let columns = [{
            key: '0',
            title: '申请发起时间',
            dataIndex: 'created'
        }, {
            key: '1',
            title: '商品编码',
            dataIndex: 'skuStr'
        }, {
            key: '2',
            title: '产品名称',
            dataIndex: 'title'
        }, {
            key: '3',
            title: '数量',
            dataIndex: 'goodsNum'
        }, {
            key: '4',
            title: '退货数量',
            dataIndex: 'goodsNum'
        }, {
            key: '5',
            title: '操作',
            dataIndex: 'skuId',
            render(text, record) {
                return (
                <span>
                    <a href="###">已验收详情</a>
                </span>
                );
            }
        }];
        
        return columns;
    }

    render() {
        const {formOptions, dataSource, ...other} = this.props;
        dataSource.forEach((val, index)=>{
            val.key = index
        })
        
        return (
            <div>
 
                <Search  items={this._getFormItems()} onSubmit={formOptions.handleSubmit} onReset={formOptions.handleReset} />

                <DataTable _uKey='skuId' bordered={true} columns={this._getColumns()} 
                           expandedRowRender={record => <Table columns={this._getSubColumns()} dataSource={dataSource} pagination={false} />} 
                           dataSource={dataSource} {...other}  />
            </div>
        )
    }
}


Checked.propTypes = {
    // dataSource : React.PropTypes.array.isRequired,
    // action : React.PropTypes.func.isRequired,
    // loading : React.PropTypes.bool,
    // params : React.PropTypes.object
}


export default Checked;
