import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

import DataTable from 'components/DataTable';

import Search from 'components/Search';
import {getSpecValue} from 'common/utils'
import {Row, Col, Button, Icon, Popconfirm, DatePicker} from 'hen';

//入库类型
const STOCKTYPE = [
   { value: '手动添加', title: "手动添加" },
   { value: '店铺回退', title: "店铺回退" },
   { value: '调整入库', title: "调整入库" }
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
                input: {
                   placeholder: "请输入入库单号"
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
                label: "商品类目：",
                name: "categoryCode",
                wrapperCol: {span: 15},
                cascader: {
                    options: cateList,
                    placeholder: "请选择所属类目",
                    changeOnSelect: true
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
                    placeholder: "请选择入库类型",
                    optionValue: STOCKTYPE
                }
            },{
                label: "操作人：",
                name: "account",
                input: {
                   placeholder: "请输入操作人"
                }
            },{
                label: "入库日期：",
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
            }],
            initValue: {
                recordId: null,
                spuId: null,
                skuId : null,
                categoryCode: null,
                title: null,
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
        }, {
            key: '5',
            title: '商品类目',
            dataIndex: 'category'
        }, {
            key: '6',
            title: '规格',
            dataIndex: 'specOneValue',
            render(val, row){
                return getSpecValue(row)
            }
        }, {
            key: '7',
            title: '市场价',
            dataIndex: 'marketPrice'
        }, {
            key: '8',
            title: '销售价',
            dataIndex: 'price'
        }, {
            key: '9',
            title: '入库数量',
            dataIndex: 'incoming'
        },  {
            key: '10',
            title: '入库时间',
            dataIndex: 'createTime'
        }, {
            key: '11',
            title: '操作人',
            dataIndex: 'account'
        }, {
            key: '12',
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
