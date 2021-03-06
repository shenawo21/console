import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

import DataTable from 'components/DataTable';

import Search from 'components/Search';
import {getSpecValue} from 'common/utils'
import {Row, Col, Button, Icon, Popconfirm, DatePicker,cascader} from 'hen';

//入库类型
const STOCKTYPE = [
   { value: '手动添加', title: "手动添加" },
   { value: '店铺回退', title: "店铺回退" },
   { value: '调整入库', title: "调整入库" }
];
// 商品来源
const STATUS = [
  {value: 0, title: "中台创建"},
  {value: 1, title: "商城采购"},
  {value: 2, title: "erp对接"}
];
class StorageQuery extends Component {

    // shouldComponentUpdate(nextProps, nextState){
    //     return nextProps.params === this.props.params
    // } 

    _getFormItems(){
    	let context = this;
        const {cateList} = context.props;
        let config = {
            formItems: [{
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
                name: "categoryCode",
                wrapperCol: {span: 15},
                style:{marginBottom:6},
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
                label: "商品来源：",
                name: "fromType",
                style:{marginBottom:6},
                select: {
                placeholder: "请选择商品来源",
                    optionValue: STATUS
                }
            },{
                label: "操作人：",
                name: "account",
                style:{marginBottom:6},
                input: {
                   placeholder: "请输入操作人"
                }
            },{
                label: "入库日期：",
                span: '11',
                style:{marginBottom:6},
                labelCol: { span: 4 },
                wrapperCol: { span: 19 },
                custom(getCustomFieldProps, FormContext) {
                    return <div>
                                    <DatePicker format="yyyy-MM-dd HH:mm:ss" {...getCustomFieldProps('createTimeStart') } showTime={true} />
                                    <span className="ant-form-split">-</span>
                                    <DatePicker format="yyyy-MM-dd HH:mm:ss"  {...getCustomFieldProps('createTimeEnd') } showTime={true}/>
                            </div>
                }
            }],
            initValue: {
                recordId: null,
                spuId: null,
                skuId : null,
                categoryCode: null,
                title: null,
                stockType: null,
                fromType:null,
                createUser : null,
                createTimeStart : null,
                createTimeEnd : null
            }
        }
        return config;
    }

    // shouldComponentUpdate(nextProps) {
    //     if (nextProps.tableOptions.params.recordType == '总仓出库') {
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
            title: '入库类型',
            dataIndex: 'stockType'
        }, {
            key: '2',
            title: 'SPU',
            dataIndex: 'spuId'
        }, {
            key: '3',
            title: 'SKU',
            dataIndex: 'skuId'
        }, {
            key: '4',
            title: '商品名称',
            dataIndex: 'title'
        },{
            key: '5',
            title:'商品来源',
            dataIndex:'fromType',
            render(status){
                let name = status == null ? status : STATUS[status].title
                return <span>{name}</span>
            } 
         }, {
            key: '6',
            title: '商品类目',
            dataIndex: 'category'
        }, {
            key: '7',
            title: '规格',
            dataIndex: 'specOneValue',
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
        },
        // {
        //     key: '10',
        //     title: '采购价',
        //     dataIndex: 'purchasePrice'
        // },
         {
            key: '11',
            title: '入库数量',
            dataIndex: 'incoming'
        },  {
            key: '12',
            title: '入库时间',
            dataIndex: 'createTime'
        }, {
            key: '13',
            title: '操作人',
            dataIndex: 'account'
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
