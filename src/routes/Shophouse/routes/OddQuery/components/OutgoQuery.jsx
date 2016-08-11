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

class OutgoView extends Component {

    _getFormItems(){
        let config = {
            formItems: [{
                label: "出库日期：",
                name: "account",
                input: {
                }
            }, {
                label: "出库店铺：",
                name: "name",
                select: {
                }
            },{
                label: "出库单号：",
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
                label: "出库类型：",
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
            title: '出库单号',
            dataIndex: 'enterpriseCode'
        }, {
            key: '1',
            title: '出库店铺',
            dataIndex: 'account'
        }, {
            key: '2',
            title: '出库类型',
            dataIndex: 'name'
        }, {
            key: '3',
            title: 'SPU',
            dataIndex: 'enabled',
            render(status){
                return status ? <span>可用</span> : <span>不可用</span>
            }
        }, {
            key: '4',
            title: 'SKU',
            dataIndex: 'email'
        }, {
            key: '5',
            title: '商品名称',
            dataIndex: 'mobile'
        }, {
            key: '6',
            title: '市场价',
            dataIndex: 'registerTime'
        }, {
            key: '7',
            title: '销售价',
            dataIndex: 'createPerson'
        }, {
            key: '8',
            title: '建议销售价',
            dataIndex: 'registerTime'
        }, {
            key: '9',
            title: '出库数量',
            dataIndex: 'createPerson'
        }, {
            key: '10',
            title: '出库时间',
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


OutgoView.propTypes = {

    // dataSource : React.PropTypes.array.isRequired,
    // action : React.PropTypes.func.isRequired,

    // loading : React.PropTypes.bool,
    // params : React.PropTypes.object
}


export default OutgoView;
