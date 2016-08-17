import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

import DataTable from 'components/DataTable';

import Search from 'components/Search';

import {Row, Col, Button, Icon, Popconfirm, DatePicker} from 'hen';

//出库类型
const STOCKTYPE = [
   { value: '调拨出库', title: "调拨出库" },
   { value: '损耗出库', title: "损耗出库" },
   { value: '盘点出库', title: "盘点出库" }
];

class OutgoView extends Component {

    _getFormItems(){
        let config = {
            formItems: [{
                label: "出库店铺：",
                name: "operateStore",
                select: {
                    optionValue : STOCKTYPE,
                    placeholder: "请选择出库店铺"
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
                   placeholder: "请输入SPU"
                }
            },{
                label: "SKU：",
                name: "skuId",
                input: {
                   placeholder: "请输入SKU"
                }
            },{
                label: "出库类型：",
                name: "stockType",
                select: {
                   optionValue : STOCKTYPE,
                   placeholder: "请选择出库类型"
                }
            },{
                label: "操作人：",
                name: "createUser",
                input: {
                   placeholder: "请输入操作人"
                }
            },{
                label: "出库日期：",
                labelCol: { span: 2 },
                wrapperCol: { span: 8 },
                custom(getCustomFieldProps, FormContext) {
                    return <div>
                        <Col span="8">
                            <DatePicker format="yyyy-MM-dd HH:mm:ss" {...getCustomFieldProps('createTimeStart') } showTime={true} />
                        </Col>
                        <Col span="1">
                            <p className="ant-form-split">-</p>
                        </Col>
                        <Col span="8">
                            <DatePicker format="yyyy-MM-dd HH:mm:ss"  {...getCustomFieldProps('createTimeEnd') } showTime={true}/>
                        </Col>
                    </div>
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
                createTimeEnd : null
            }
        }
        return config;
    }

    _getColumns(){
        const {isAdmin} = this.props;
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
            dataIndex: 'price'
        }, {
            key: '9',
            title: '出库数量',
            dataIndex: 'incoming'
        }, {
            key: '10',
            title: '出库时间',
            dataIndex: 'createTime'
        }, {
            key: '11',
            title: '操作人',
            dataIndex: 'createUser'
        }, {
            key: '12',
            title: '备注',
            dataIndex: 'remark'
        }];
        
        return columns;
    }    

    render() {
        const {formOptions, ...other} = this.props;
        return (
            <div>
 
                <Search  items={this._getFormItems()} onSubmit={formOptions.handleSubmit} onReset={formOptions.handleReset} />

                <DataTable bordered={true} columns={this._getColumns()} {...other} ref='dt' />

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