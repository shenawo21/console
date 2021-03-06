import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

import DataTable from 'components/DataTable';

import Search from 'components/Search';
import {getSpecValue} from 'common/utils'
import {Row, Col, Button, Icon, Popconfirm, DatePicker} from 'hen';

//入库类型
const STOCKTYPE = [
   { value: '换货入库', title: "换货入库" },
   { value: '总库调拨', title: "总库调拨" },
   { value: '退货入库', title:'退货入库' }
];

class StorageQuery extends Component {

    _getFormItems(){
    	let context = this;
        const {cateList,shopList,chList} = context.props;
        let config = {
            formItems: [{
                label: "所属店铺：",
                name: "relevantStoreId",
                style:{marginBottom:6},
                select: {
                    placeholder: "请选择所属店铺",
                    optionValue: shopList
                }
            },{
                label: "入库单号：",
                name: "recordId",
                style:{marginBottom:6},
                input: {
                   placeholder: "请输入入库单号"
                }
            },{
                label: "SPU：",
                name: "spuId",
                style:{marginBottom:6},
                rules: [{ min: 0, max: 9, message: '请输入9位以内数字！' }],
                input: {
                   placeholder: "请输入SPU",
                   type: 'number'
                }
            },{
                label: "SKU：",
                name: "skuId",
                style:{marginBottom:6},
                rules: [{ min: 0, max: 9, message: '请输入9位以内数字！' }],
                input: {
                   placeholder: "请输入SKU",
                   type: 'number'
                }
            },{
                label: "商品类目：",
                name: "categoryId",
                style:{marginBottom:6},
                wrapperCol: {span: 15},
                cascader: {
                    options: cateList,
                    placeholder: "请选择所属类目",
                    changeOnSelect: true,
                    expandTrigger:'click'
                }
            },{
                label: "商品名称：",
                name: "title",
                style:{marginBottom:6},
                input: {
                   placeholder: "请输入商品名称"
                }
            },{
                label: "入库类型：",
                name: "stockType",
                style:{marginBottom:6},
                select: {
                    placeholder: "请选择入库类型",
                    optionValue: STOCKTYPE
                }
            },{
                label: "操作人：",
                name: "createUser",
                style:{marginBottom:6},
                input: {
                   placeholder: "请输入操作人"
                }
            },{
                label: "入库日期：",
                style:{marginBottom:6},
                span: '11',
                labelCol: { span: 4 },
                wrapperCol: { span: 17 },
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
                relevantStoreId:null,
                recordId: null,
                spuId: null,
                skuId : null,
                categoryCode: null,
                title: null,
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
    //     console.log(nextProps,'nextProps');
    //     if (nextProps.tableOptions.params.recordType == '店铺出库') {
    //         return false
    //     }
    //     return true
    // }
    _getColumns(){
        const context = this;
        let columns = [{
            key: '0',
            title: '入库单号',
            dataIndex: 'recordId'
        },{
            key: '1',
            title: '所属店铺',
            dataIndex: 'relevantStoreName'
        },{
            key: '2',
            title: '入库类型',
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
            title: '商品类目',
            dataIndex: 'categoryName'
        }, {
            key: '7',
            title: '规格',
            dataIndex: 'categoryName',
            render(val, row){
                return getSpecValue(row)
            }
        }, {
            key: '8',
            title: '市场价',
            dataIndex: 'marketPrice'
        }, {
            key: '9',
            title: '销售价',
            dataIndex: 'price'
        }, {
            key: '10',
            title: '入库数量',
            dataIndex: 'stock'
        },  {
            key: '11',
            title: '入库时间',
            dataIndex: 'createTime'
        },{
            key: '12',
            title: '所属渠道',
            dataIndex: 'channelName'
        },{
            key: '13',
            title: '操作人',
            dataIndex: 'createUserName'
        }, {
            key: '14',
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


StorageQuery.propTypes = {

    // dataSource : React.PropTypes.array.isRequired,
    // action : React.PropTypes.func.isRequired,

    // loading : React.PropTypes.bool,
    // params : React.PropTypes.object
}


export default StorageQuery;
