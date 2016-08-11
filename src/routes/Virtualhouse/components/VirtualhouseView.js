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

class Accounts extends Component {

    _getFormItems(){
        let config = {
            formItems: [{
                label: "商品名称：",
                name: "account",
                input: {
                    placeholder: "请输入商品名称"
                }
            }, {
                label: "SPU：",
                name: "name",
                input: {
                    placeholder: "请输入SPU"
                }
            }, {
                label: "SKU：",
                name: "name",
                input: {
                    placeholder: "请输入SKU"
                }
            },{
                label: "商品类目：",
                name: "enabled",
                select: {
                    placeholder: "请选择商品类目",
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
        const context = this;
        let columns = [{
            key: '0',
            title: '帐号',
            dataIndex: 'account'
        }, {
            key: '1',
            title: '用户姓名',
            dataIndex: 'name'
        }, {
            key: '2',
            title: '是否可用',
            dataIndex: 'enabled',
            render(status){
                return status ? <span>可用</span> : <span>不可用</span>
            }
        }, {
            key: '3',
            title: '邮箱',
            dataIndex: 'email'
        }, {
            key: '4',
            title: '手机号码',
            dataIndex: 'mobile'
        }, {
            key: '5',
            title: '注册时间',
            dataIndex: 'registerTime'
        }, {
            key: '6',
            title: '创建人',
            dataIndex: 'createPerson'
        }];
        return columns;
    }
    
    
    // 按钮
    quickButton(quickOptions){
        return <Row>
                <Col span='2'>
                    <a href="##" className="ant-btn ant-btn-normal">批量导入</a>
                </Col>
                <Col span='2'>
                    <Link className="ant-btn ant-btn-primary" to={`/virtualhouse/storageMgt`}>入库</Link>
                </Col>
                <Col span='2'>
                    <Link className="ant-btn ant-btn-primary" to={`/virtualhouse/outgoMgt`}>出库</Link>
                </Col>
        </Row>
    }
    

    render() {
        const {formOptions,quickOptions, ...other} = this.props;
        
        return (
            <div>
                <Search  items={this._getFormItems()} onSubmit={formOptions.handleSubmit} onReset={formOptions.handleReset} />

                <DataTable bordered={true} columns={this._getColumns()} quickButton={this.quickButton(quickOptions)} {...other} ref='dt' />

            </div>
        )
    }
}


Accounts.propTypes = {

    dataSource : React.PropTypes.array.isRequired,
    action : React.PropTypes.func.isRequired,

    loading : React.PropTypes.bool,
    params : React.PropTypes.object
}


export default Accounts;
