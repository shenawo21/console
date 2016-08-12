import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

import DataTable from 'components/DataTable';

import Search from 'components/Search';

import {Row, Col, Button, Icon, Popconfirm} from 'hen';

//是否可用
const STATUS = [
   { value: false, title: "不可用" },
   { value: true, title: "可用" }
];

class StorageQuery extends Component {

    _getFormItems(){
        let config = {
            formItems: [{
                label: "入库日期：",
                name: "account",
                input: {
                }
            },{
                label: "入库单号：",
                name: "enabled",
                input: {
                   
                }
            },{
                label: "SPU：",
                name: "enabled",
                input: {
                   
                }
            },{
                label: "SKU：",
                name: "enabled",
                input: {
                   
                }
            },{
                label: "商品类目：",
                name: "enabled",
                select: {
                   
                }
            },{
                label: "商品名称：",
                name: "enabled",
                input: {
                   
                }
            },{
                label: "入库类型：",
                name: "enabled",
                select: {
                   
                }
            },{
                label: "操作人：",
                name: "enabled",
                input: {
                   
                }
            }],
            initValue: {
                name: null,
                nick : null
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
        console.log('storage');
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
