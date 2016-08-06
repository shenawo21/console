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
                label: "账号：",
                name: "account",
                input: {
                    placeholder: "请输入昵称"
                }
            }, {
                label: "用户姓名：",
                name: "name",
                input: {
                    placeholder: "请输入用户姓名"
                }
            },{
                label: "是否可用：",
                name: "enabled",
                select: {
                    placeholder: "请选择是否可用",
                    optionValue: STATUS
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
            title: '企业编码',
            dataIndex: 'enterpriseCode'
        }, {
            key: '1',
            title: '帐号',
            dataIndex: 'account'
        }, {
            key: '2',
            title: '用户姓名',
            dataIndex: 'name'
        }, {
            key: '3',
            title: '是否可用',
            dataIndex: 'enabled',
            render(status){
                return status ? <span>可用</span> : <span>不可用</span>
            }
        }, {
            key: '4',
            title: '邮箱',
            dataIndex: 'email'
        }, {
            key: '5',
            title: '手机号码',
            dataIndex: 'mobile'
        }, {
            key: '6',
            title: '注册时间',
            dataIndex: 'registerTime'
        }, {
            key: '7',
            title: '创建人',
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

    dataSource : React.PropTypes.array.isRequired,
    action : React.PropTypes.func.isRequired,

    loading : React.PropTypes.bool,
    params : React.PropTypes.object
}


export default OutgoView;
