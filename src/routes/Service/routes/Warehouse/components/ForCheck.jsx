import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import DataTable from 'components/DataTable';
import Search from 'components/Search';
import {Row, Col, Button, Icon, Popconfirm, DatePicker, Table} from 'hen';

//所属平台
const STOCKTYPE = [
   { value: '淘宝', title: "淘宝" },
   { value: '天猫', title: "天猫" },
   { value: '京东', title: "京东" }
];


class OutgoView extends Component {

    _getFormItems(){
    	let context = this;
        const {shopList} = context.props;
        let config = {
            formItems: [ {
                label: "订单编号：",
                name: "relevantStore",
                input: {
                   placeholder: "请输入订单编号"
                }
            },{
                label: "买家账号：",
                name: "recordId",
                input: {
                   placeholder: "请输入出库单号"
                }
            },{
                label: "所属平台：",
                name: "spuId",
                select: {
                    placeholder: "请选择所属平台",
                    optionValue: shopList
                }
            },{
                label: "商品编码：",
                name: "skuId",
                input: {
                   placeholder: "请输入商品编码"
                }
            },{
                label: "产品名称：",
                name: "recordType",
                input: {
                   placeholder: "请输入产品名称"
                }
            }],
            initValue: {
                operateStore: null,
                recordId : null,
                spuId: null,
                skuId : null,
                stockType: null
            }
        }
        return config;
    }

    _getColumns(){
        const context = this;
        let columns = [{
            key: '0',
            title: '订单编号',
            dataIndex: 'recordId'
        }, {
            key: '1',
            title: '成交时间',
            dataIndex: 'operateStore'
        }, {
            key: '2',
            title: '买家账号',
            dataIndex: 'stockType'
        }, {
            key: '3',
            title: '店铺名称',
            dataIndex: 'spuId'
        }, {
            key: '4',
            title: '售后类型',
            dataIndex: 'skuId'
        }];
        
        return columns;
    }    
    _getSubColumns(){
        const context = this;
        let columns = [{
            key: '0',
            title: '申请发起时间',
            dataIndex: 'recordId'
        }, {
            key: '1',
            title: '商品编码',
            dataIndex: 'operateStore'
        }, {
            key: '2',
            title: '产品名称',
            dataIndex: 'stockType'
        }, {
            key: '3',
            title: '数量',
            dataIndex: 'spuId'
        }, {
            key: '4',
            title: '退货数量',
            dataIndex: 'skuId'
        }, {
            key: '5',
            title: '操作',
            dataIndex: 'skuId',
            render(id){
                //return <span><Link to={`/accounts/edit/${id}`}>已验收详情</Link>
            }
        }];
        
        return columns;
    }


    render() {
        const {formOptions, dataSource, ...other} = this.props;
        dataSource.forEach((val, index)=>{
            val.key = index
        })
        console.log(dataSource)

        return (
            <div>
                <Search  items={this._getFormItems()} onSubmit={formOptions.handleSubmit} onReset={formOptions.handleReset} />

                <DataTable _uKey='skuId' bordered={true} columns={this._getColumns()} expandedRowRender={record => <p>{record.spuId}</p>} className="table" dataSource={dataSource}  {...other}  />

            </div>
        )
    }
}


OutgoView.propTypes = {

    // dataSource : React.PropTypes.array.isRequired,
    // action : React.PropTypes.func.isRequired,

    // loading : React.PropTypes.bool,
    // params : React.PropTypes.object
}


export default OutgoView;
