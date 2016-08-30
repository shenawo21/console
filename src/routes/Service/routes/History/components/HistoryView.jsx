import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import DataTable from 'components/DataTable';
import Search from 'components/Search';
import {Row, Col, Button, Icon, Popconfirm, DatePicker,Table} from 'hen';
const TYPE = [
    {value:'0',title:'退款'},
    {value:'1',title:'退货'},
    {value:'2',title:'换货'},
]
class History extends Component {

    _getFormItems(){
    	let context = this;
        const {shopListItem} = context.props;
        let config = {
            formItems: [{
                label: "订单编号：",
                name: "tid",
                input: {}
            },{
                label: "买家账号：",
                name: "buyerNick",
                input: {}
            },{
                label: "店铺名称：",
                name: "shopId",
                select: {
                    optionValue: shopListItem
                }
            },{
                label: "商品编码：",
                name: "skuId",
                input: {}
            },{
                label: "产品名称：",
                name: "title",
                input: {}
            },{
                label: "售后类型：",
                name: "offSaleType",
                select: {
                    optionValue: TYPE
                }
            }],
            initValue: {
                tid: null,
                buyerNick: null,
                shopName: null,
                skuId: null,
                title: null,
                offSaleType:null
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

    _getSubColumns() {
        const {isAdmin} = this.props;
        const context = this;
        let columns = [{
            key: '1',
            title: '申请发起时间',
            dataIndex: 'created'
        },{
            key: '2',
            title: '商品编码',
            dataIndex: 'skuId'
        }, {
            key: '3',
            title: '产品名称',
            dataIndex: 'title'
        }, {
            key: '4',
            title: '原价格',
            dataIndex: 'price'
        }, {
            key: '5',
            title: '数量',
            dataIndex: 'goodsNum'
        }, {
            key: '6',
            title: '商品总价值',
            dataIndex: 'totalFee'
        }, {
            key: '7',
            title: '退货数量',
            dataIndex: 'refundNums'
        }, {
            key: '8',
            title: '退货金额',
            dataIndex: 'refundFee'
        },{
            key: '9',
            title: '处理状态',
            dataIndex: 'processStatus'
        },{
            key: '10',
            title: '仓库反馈',
            dataIndex: 'feedbackStatus'
        },{
            key: '11',
            title: '仓库反馈时间',
            dataIndex: 'refundFee'
        }, {
            key: '12',
            title: '操作',
            render(id,row) {
                console.log(row,'row11')
                console.log(row.processStatus,'row2')
                return <div>
                            <Link to={`/service/history/info/${row.key}`}>售后详情</Link><br />
                        </div>
            }
        }];
        
        return columns;
    }    
      

    render() {
        const {formOptions,dataSource,...other} = this.props;

        dataSource && dataSource.forEach((val, index)=>{
            val.key = index
        })
        return (
            <div>
 
                <Search  items={this._getFormItems()} onSubmit={formOptions.handleSubmit} onReset={formOptions.handleReset} />

               <DataTable _uKey='skuId' bordered={true} columns={this._getColumns()} 
                           expandedRowRender={record => <Table size="small" bordered={true}  columns={this._getSubColumns()} dataSource={dataSource} pagination={false} />} 
                           dataSource={dataSource} {...other}  />

            </div>
        )
    }
}


History.propTypes = {
    // dataSource : React.PropTypes.array.isRequired,
    // action : React.PropTypes.func.isRequired,
    // loading : React.PropTypes.bool,
    // params : React.PropTypes.object
}


export default History;
