import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import DataTable from 'components/DataTable';
import Search from 'components/Search';
import {Row, Col, Button, Icon, Popconfirm, DatePicker,Table} from 'hen';

class ReturnMoney extends Component {
    endReturn(id,refresh){
      const {confirm} = this.props;
      confirm(id, this.refs.theTable.refresh);
    }

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

    shouldComponentUpdate(nextProps) {
        if (nextProps.params.type == '退换货') {
            return false
        }
        return true
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
                return <span><Link to={`/service/aftersale/goodsdetail/${id}`}>订单详情</Link></span>
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
            title: '购买数量',
            dataIndex: 'num'
        }, {
            key: '6',
            title: '商品总价值',
            render(id,row) {
                return row.price * row.num
            }
        }, {
            key: '7',
            title: '退货验收数量',
            dataIndex: 'tGoodsNum'
        }, {
            key: '8',
            title: '退货金额',
            render(id,row) {
                return row.price * row.tGoodsNum
            }
        }, {
            key: '9',
            title: '订单状态',
            dataIndex: 'processStatus',
            render(type) {
                switch(type) {
                    case 'INIT':
                        return '待处理'
                    case 'PROCESS':
                        return '处理中'
                    case 'SUCCESS':
                        return '处理成功'
                    case 'FAIL':
                        return '处理失败'    
                }
            }
        },{
            key: '10',
            title: '财务处理状态',
            dataIndex: 'refundResult',
            render(type) {
                switch(type) {
                    case 'INIT':
                        return '待处理'
                    case 'ACCEPT':
                        return '财务同意退款'
                    case 'DENY':
                        return '财务拒绝退款'    
                }
            }
        }, {
            key: '11',
            title: '操作  /  备注',
            render(id,row) {
                        if (row.processStatus == 'INIT') {
                            return <div><Link to={`/service/aftersale/info/${row.refundId}/${row.tid}`}>订单退款</Link></div>
                        } else if(row.processStatus == 'PROCESS' && row.refundResult == 'ACCEPT') {
                             return <div>
                                        <Popconfirm title="确定要结束退款？" onConfirm={context.endReturn.bind(context,row.refundId)} >
                                            <a href="javascript:;">结束退款</a>
                                        </Popconfirm><em style = {{padding:'0 10px'}}></em>
                                        <Link to={`/service/aftersale/info/${row.refundId}`}>查看详情</Link>
                                    </div>
                        } else if(row.processStatus == 'PROCESS' && row.refundResult == 'DENY') {
                            return <div>
                                         <Popconfirm title="确定要拒绝退款？" onConfirm={context.endReturn.bind(context,row.refundId)} >
                                            <a href="javascript:;">拒绝退款</a>
                                        </Popconfirm><em style = {{padding:'0 10px'}}></em>
                                        <Link to={`/service/aftersale/info/${row.refundId}`}>查看详情</Link>
                                   </div>     
                        } else {
                            return <Link to={`/service/aftersale/info/${row.refundId}`}>查看详情</Link>
                        }
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

               <DataTable _uKey='outerSkuId' bordered={true} columns={this._getColumns()} 
                           expandedRowRender={record => <Table size="small" bordered={true}  columns={this._getSubColumns()} dataSource={record.refundApplyList} pagination={false} />} 
                           dataSource={dataSource} {...other} ref = 'theTable'  />

            </div>
        )
    }
}


ReturnMoney.propTypes = {
    // dataSource : React.PropTypes.array.isRequired,
    // action : React.PropTypes.func.isRequired,
    // loading : React.PropTypes.bool,
    // params : React.PropTypes.object
}


export default ReturnMoney;
