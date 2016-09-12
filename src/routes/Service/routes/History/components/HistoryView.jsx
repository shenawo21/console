import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import DataTable from 'components/DataTable';
import Search from 'components/Search';
import {Row, Col, Button, Icon, Popconfirm, DatePicker,Table} from 'hen';
//售后类型
const TYPE = [
    {value:'REFUND_MONEY',title:'退款'},
    {value:'REFUND_GOODS',title:'退货'},
    {value:'CHANGE_GOODS',title:'换货'},
]
class History extends Component {

    _getFormItems(){
    	let context = this;
        const {shopListItem} = context.props;
        let config = {
            formItems: [{
                label: "订单编号：",
                name: "tid",
                input: {
                    placeholder: "请输入订单编号"
                }
            },{
                label: "买家账号：",
                name: "buyerNick",
                input: {
                    placeholder: "请输入买家账号"
                }
            },{
                label: "店铺名称：",
                name: "shopId",
                select: {
                    placeholder: "请输入店铺名称",
                    optionValue: shopListItem
                }
            },{
                label: "商品编码：",
                name: "outerSkuId",
                input: {
                    placeholder: "请输入商品编码"
                }
            },{
                label: "产品名称：",
                name: "title",
                input: {
                    placeholder: "请输入产品名称"
                }
            },{
                label: "售后类型：",
                name: "offSaleType",
                select: {
                    placeholder: "请选择售后类型",
                    optionValue: TYPE
                }
            }],
            initValue: {
                tid: null,
                buyerNick: null,
                shopName: null,
                outerSkuId: null,
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
            dataIndex: 'tradesCreated'
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
            dataIndex: 'afterSaleType',
            render(type) {
                switch(type) {
                    case 'REFUND_MONEY':
                        return '退款'
                    case 'REFUND_GOODS':
                        return '退货'
                    case 'CHANGE_GOODS':
                        return '换货'
                }
            }
        }, {
            key: '5',
            title: '操作',
            dataIndex: 'tid',
            render(id, row) {
                return <Link to={`/order/audit/detail/${id}`}>订单详情</Link>
            }
        }];
        
        return columns;
    }

    _getSubColumns() {
        const context = this;
        let columns = [{
            key: '1',
            title: '申请发起时间',
            dataIndex: 'created'
        },{
            key: '2',
            title: '商品编码',
            dataIndex: 'outerSkuId'
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
            dataIndex: 'num'
        }, {
            key: '6',
            title: '商品总价值',
            render(id,row) {
                return row.price * row.num
            }
        }, {
            key: '7',
            title: '退货数量',
            dataIndex: 'tGoodsNum'
        }, {
            key: '8',
            title: '退货金额',
            render(id,row) {
                return row.price * row.tGoodsNum
            }
        },{
            key: '9',
            title: '处理状态',
            dataIndex: 'processStatus',
            render(type) {
                // switch(type) {
                //     case 'REFUND_MONEY':
                //         return '退款'
                //     case 'REFUND_GOODS':
                //         return '退货'
                //     case 'CHANGE_GOODS':
                //         return '换货'
                // }
            }
        },{
            key: '10',
            title: '仓库反馈',
            dataIndex: 'feedbackStatus',
            render(type) {
                // switch(type) {
                //     case 'REFUND_MONEY':
                //         return '退款'
                //     case 'REFUND_GOODS':
                //         return '退货'
                //     case 'CHANGE_GOODS':
                //         return '换货'
                // }
            }
        },{
            key: '11',
            title: '仓库反馈时间',
            dataIndex: 'refundFee'
        }, {
            key: '12',
            title: '操作',
            render(id, row) {
                return <div>
                            {
                                row.afterSaleType == 'REFUND_MONEY' ? <Link to={`/service/aftersale/info/${row.refundId}`}>退款详情</Link> :
                                row.afterSaleType == 'REFUND_GOODS' ? <Link to={`/service/aftersale/applyGoods/${row.refundId}`}>退货详情</Link> :
                                <Link to={`/service/aftersale/changedetail/${row.refundId}`}>换货详情</Link> 
                            }
                        </div>
            }
        }];
        
        return columns;
    }    
      

    render() {
        const {formOptions,dataSource,...other} = this.props;

        dataSource && dataSource.forEach((val, index)=>{
            val.key = index
            val.refundApplyList && val.refundApplyList.forEach((val, index) => {
                val.key = index
            })
        })
        return (
            <div>
 
                <Search  items={this._getFormItems()} onSubmit={formOptions.handleSubmit} onReset={formOptions.handleReset} />

               <DataTable _uKey='skuId' bordered={true} columns={this._getColumns()} 
                           expandedRowRender={record => <Table size="small" bordered={true}  columns={this._getSubColumns()} dataSource={record.refundApplyList} pagination={false} />} 
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
