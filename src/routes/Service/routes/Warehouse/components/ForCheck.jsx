import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import DataTable from 'components/DataTable';
import Search from 'components/Search';
import {Table} from 'hen';

//所属平台
const STOCKTYPE = [
   { value: '淘宝', title: "淘宝" },
   { value: '天猫', title: "天猫" },
   { value: '京东', title: "京东" }
];

class ForCheck extends Component {

    _getFormItems(){
    	let context = this;
        const {platListItem} = context.props;
        let config = {
            formItems: [ {
                label: "订单编号：",
                name: "tid",
                input: {
                   placeholder: "请输入订单编号"
                }
            },{
                label: "买家账号：",
                name: "buyerNick",
                input: {
                   placeholder: "请输入出库单号"
                }
            },{
                label: "所属平台：",
                name: "channelCode",
                select: {
                    placeholder: "请选择所属平台",
                    optionValue: platListItem
                }
            },{
                label: "商品编码：",
                name: "skuId",
                input: {
                   placeholder: "请输入商品编码"
                }
            },{
                label: "产品名称：",
                name: "title",
                input: {
                   placeholder: "请输入产品名称"
                }
            }],
            initValue: {
                tid: null,
                buyerNick : null,
                channelCode: null,
                skuId : null,
                title: null
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
                return <Link to={`/order/audit/detail/1`}>订单详情</Link>
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
            dataIndex: 'outerSkuId'
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
            dataIndex: 'refundId',
            render(id, row) {
                console.log(row,'row');
                return (
                    <span>
                        <Link to={`/service/warehouse/info/${id}/${row.outerSkuId}`}>验收商品</Link>
                    </span>
                );
            }
        }];
        
        return columns;
    }

    render() {
        const {formOptions, tableOptions, ...other} = this.props;
        const {dataSource} = tableOptions;
        let dataSourceSub = [];
        dataSource && dataSource.forEach((val, index)=>{
            val.key = index
            // val.refundApplyList && val.refundApplyList.forEach((val, i) => {
            //     val.key = index
            // })
            dataSourceSub = val.refundApplyList
        })
        console.log(dataSourceSub,'dataSourceSub');

        return (
            <div>
                <Search items={this._getFormItems()} onSubmit={formOptions.handleSubmit} onReset={formOptions.handleReset} />
 
                <DataTable _uKey='skuId' bordered={true} columns={this._getColumns()} 
                           expandedRowRender={record => <Table columns={this._getSubColumns()} size="middle" dataSource={dataSourceSub} pagination={false} />} 
                           {...tableOptions} />

            </div>
        )
    }
}


ForCheck.propTypes = {

    // dataSource : React.PropTypes.array.isRequired,
    // action : React.PropTypes.func.isRequired,

    // loading : React.PropTypes.bool,
    // params : React.PropTypes.object
}


export default ForCheck;
