import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import DataTable from 'components/DataTable';
import Search from 'components/Search';
import {Row, Col, Button, Icon, Popconfirm, DatePicker,Table} from 'hen';

class ReturnGoods extends Component {

    _getFormItems(){
    	let context = this;
        const {shopListItem} = context.props;
        let config = {
            formItems: [{
                label: "订单编号：",
                name: "tid",
                labelCol: {span: 8},
                span:7,
                input: {}
            },{
                label: "买家账号：",
                name: "buyerNick",
                labelCol: {span: 8},
                span:7,
                input: {}
            },{
                label: "店铺名称：",
                name: "shopId",
                labelCol: {span: 8},
                span:7,
                select: {
                    optionValue: shopListItem
                }
            },{
                label: "商品编码：",
                name: "outerSkuId",
                labelCol: {span: 8},
                span:7,
                input: {}
            },{
                label: "产品名称：",
                name: "title",
                labelCol: {span: 6},
                span:9,
                input: {}
            }],
            initValue: {
                tid: null,
                buyerNick: null,
                shopName: null,
                outerSkuId: null,
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
                return <span><Link to="/order/audit/detail/1">订单详情</Link></span>
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
            render(type){
                switch(type) {
                    case 'INIT':
                        return '待处理'
                    case 'PROCESS':
                        return '处理中'    
                }
            }
        },{
            key: '10',
            title: '仓库反馈',
            dataIndex: 'feedbackStatus',
            render(type) {
                switch(type) {
                    case 'ACCEPT':
                        return '允许入库'
                    case 'DENY':
                        return '拒绝入库'    
                }
            }
        },{
            key: '11',
            title: '仓库反馈时间',
            dataIndex: 'feedbackTime'
        }, {
            key: '12',
            title: '操作',
            render(id,row) {
                console.log(row,'------ ')
                if (row.afterSaleType == 'REFUND_GOODS') {
                        if (row.processStatus == 'INIT') {
                            return <div><Link to={`/service/aftersale/applyGoods/${row.refundId}`}>处理申请</Link></div>
                        } else {
                            return 
                            <div><span><Link to={`/service/aftersale/applyGoods/${row.refundId}`}>退货详情</Link><br /></span>
                                <Link to={`/service/aftersale/applyGoods/${row.refundId}`}>结束退货</Link>                                    
                            </div>
                        }
                        
                    } else if (row.afterSaleType == 'CHANGE_GOODS') {
                        if (row.processStatus == 'SUCCESS') {
                            return <div><Link to={`/service/aftersale/change/${row.refundId}`}>换货登记</Link></div>
                        } else {
                            return 
                            <div><span><Link to={`/service/aftersale/change/${row.refundId}`}>换货详情</Link><br /></span>
                                <Link to={`/service/aftersale/change/${row.refundId}`}>结束换货</Link>                                    
                            </div>
                        }
                        
                    }
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
                           expandedRowRender={record => <Table size="small" bordered={true}  columns={this._getSubColumns()} dataSource={record.refundApplyList} pagination={false} />} 
                           dataSource={dataSource} {...other}  />

            </div>
        )
    }
}


ReturnGoods.propTypes = {
    // dataSource : React.PropTypes.array.isRequired,
    // action : React.PropTypes.func.isRequired,
    // loading : React.PropTypes.bool,
    // params : React.PropTypes.object
}


export default ReturnGoods;
