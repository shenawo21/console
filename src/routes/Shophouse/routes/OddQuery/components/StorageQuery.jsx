import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

import DataTable from 'components/DataTable';

import Search from 'components/Search';

import {Row, Col, Button, Icon, Popconfirm} from 'hen';


//入库类型
const STOCKTYPE = [
   { value: '手动添加', title: "调拨出库" },
   { value: '店铺回退', title: "损耗出库" },
   { value: '调正入库', title: "盘点出库" }
];
class StorageQuery extends Component {

    _getFormItems(){
        let config = {
            formItems: [{
                label: "入库单号：",
                name: "recordId",
                input: {
                   placeholder: "请输入入库单号"
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
                label: "商品类目：",
                name: "categoryCode",
                select: {
                   placeholder: "请选择商品类目"
                }
            },{
                label: "商品名称：",
                name: "title",
                input: {
                   placeholder: "请输入商品名称"
                }
            },{
                label: "入库类型：",
                name: "stockType",
                select: {
                   optionValue: STOCKTYPE,
                   placeholder: "请选择入库类型"
                }
            },{
                label: "操作人：",
                name: "createUser",
                input: {
                   placeholder: "请输入操作人"
                }
            },{
                label: "入库日期：",
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
            title: '入库单号',
            dataIndex: 'enterpriseCode'
        },{
            key: '1',
            title: '入库类型',
            dataIndex: 'name'
        }, {
            key: '2',
            title: 'SPU',
            dataIndex: 'enabled',
            render(status){
                return status ? <span>可用</span> : <span>不可用</span>
            }
        }, {
            key: '3',
            title: 'SKU',
            dataIndex: 'email'
        }, {
            key: '4',
            title: '商品名称',
            dataIndex: 'mobile'
        }, {
            key: '5',
            title: '商品类目',
            dataIndex: 'registerTime'
        }, {
            key: '6',
            title: '规格',
            dataIndex: 'createPerson'
        }, {
            key: '7',
            title: '市场价',
            dataIndex: 'registerTime'
        }, {
            key: '8',
            title: '销售价',
            dataIndex: 'createPerson'
        }, {
            key: '9',
            title: '入库数量',
            dataIndex: 'registerTime'
        },  {
            key: '10',
            title: '入库时间',
            dataIndex: 'registerTime'
        }, {
            key: '11',
            title: '操作人',
            dataIndex: 'createPerson'
        }, {
            key: '12',
            title: '备注',
            dataIndex: 'createPerson'
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


StorageQuery.propTypes = {

    // dataSource : React.PropTypes.array.isRequired,
    // action : React.PropTypes.func.isRequired,

    // loading : React.PropTypes.bool,
    // params : React.PropTypes.object
}


export default StorageQuery;
