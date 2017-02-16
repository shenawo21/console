import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

import DataTable from 'components/DataTable';

import Search from 'components/Search';

import {Row, Col, Button, Icon, Popconfirm, DatePicker} from 'hen';

//出库类型
const STOCKTYPE = [
   { value: '回退出库', title: "回退出库" },
   { value: '销售出库', title: "销售出库" },
   { value: '换货出库', title: "换货出库" },
   { value: '新建订单', title: "新建订单" }
];

class OutgoView extends Component {

    _getFormItems(){
    	let context = this;
        const {shopList,chList} = context.props;
        let config = {
            formItems: [ {
                label: "出库店铺：",
                name: "operateStore",
                select: {
                    placeholder: "请选择所属店铺",
                    optionValue: shopList
                }
            },{
                label: "出库单号：",
                name: "recordId",
                input: {
                   placeholder: "请输入出库单号"
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
                label: "出库类型：",
                name: "stockType",
                select: {
		            placeholder: "请选择出库类型",
                    optionValue : STOCKTYPE
                }
            },{
                label: "操作人：",
                name: "createUser",
                input: {
                   placeholder: "请输入操作人"
                }
            },{
                label: "出库日期：",
                span: '11',
                labelCol: { span: 4 },
                wrapperCol: { span: 19 },
                custom(getCustomFieldProps, FormContext) {
                    return <div>
                                <DatePicker format="yyyy-MM-dd HH:mm:ss" {...getCustomFieldProps('createTimeStart') } showTime={true} />
                                <span className="ant-form-split">-</span>
                                <DatePicker format="yyyy-MM-dd HH:mm:ss"  {...getCustomFieldProps('createTimeEnd') } showTime={true}/>
                            </div>
                }
            },{
                label: "所属渠道：",
                name: "channelCode",
                select: {
                optionValue: chList,
                }
            }],
            initValue: {
                operateStore: null,
                recordId : null,
                spuId: null,
                skuId : null,
                stockType: null,
                createUser : null,
                createTimeStart : null,
                createTimeEnd : null,
                channelCode:null
            }
        }
        return config;
    }

    // shouldComponentUpdate(nextProps) {
    //     console.log(nextProps.params,'nextProps.params.recordType');
    //     if (nextProps.tableOptions.params.recordType == '总仓入库') {
    //         return false
    //     }
    //     return true
    // }

    _getColumns(){
        const context = this;
        let columns = [{
            key: '0',
            title: '出库单号',
            dataIndex: 'recordId'
        }, {
            key: '1',
            title: '出库店铺',
            dataIndex: 'operateStore'
        }, {
            key: '2',
            title: '出库类型',
            dataIndex: 'stockType'
        }, {
            key: '3',
            title: 'SPU',
            dataIndex: 'spuId'
        }, {
            key: '4',
            title: 'SKU',
            dataIndex: 'skuId'
        }, {
            key: '5',
            title: '商品名称',
            dataIndex: 'title'
        }, {
            key: '6',
            title: '市场价',
            dataIndex: 'marketPrice'
        }, {
            key: '7',
            title: '销售价',
            dataIndex: 'price'
        }, {
            key: '8',
            title: '建议销售价',
            dataIndex: 'advicePrice'
        }, {
            key: '9',
            title: '出库数量',
            dataIndex: 'stock'
        }, {
            key: '10',
            title: '出库时间',
            dataIndex: 'createTime'
        },{
            key: '11',
            title: '所属渠道',
            dataIndex: 'channelName'
       },{
            key: '12',
            title: '操作人',
            dataIndex: 'createUserName'
        }, {
            key: '13',
            title: '备注',
            dataIndex: 'remark'
        }];
        
        return columns;
    }    

    render() {
        const {formOptions, tableOptions, ...other} = this.props;
        return (
            <div>
 
                <Search  items={this._getFormItems()} onSubmit={formOptions.handleSubmit} onReset={formOptions.handleReset} />

                <DataTable bordered={true} columns={this._getColumns()} {...tableOptions} ref='dt' />

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
