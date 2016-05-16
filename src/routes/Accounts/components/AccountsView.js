import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

import DataTable from 'components/DataTable';


import Search from 'components/Search';


import {Row, Col, Button, Icon, Popconfirm} from 'hen';

class Accounts extends Component {
    
    _getFormItems(){
        let config = {
            formItems: [{
                label: "用户姓名:",
                name: "name",
                input: {}
            },{
                label: "昵称:",
                name: "nick",
                input: {}
            },{
                label: "是否可用:",
                name: "enabled",
                select: {}
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
            title: '昵称',
            dataIndex: 'nick'
        }, {
            key: '4',
            title: '是否可用',
            dataIndex: 'enabled',
            render(status){
                return status ? <span>是</span> : <span>否</span>
            }
        }, {
            key: '5',
            title: '邮箱',
            dataIndex: 'email'
        }, {
            key: '6',
            title: '手机号码',
            dataIndex: 'mobile'
        }, {
            key: '7',
            title: '注册时间',
            dataIndex: 'rgisterTime'
        }, {
            key: '8',
            title: '修改时间',
            dataIndex: 'updateTime'
        }, {
            key: '9',
            title: '地址',
            dataIndex: 'address'
        }, {
            key: '10',
            title: '个人签名',
            dataIndex: 'signature'
        }, {
            key: '11',
            title: '创建人',
            dataIndex: 'create_person'
        },{
            title: '操作',
            dataIndex: 'adminId',
            render(id,row){
                return <span><Link to={`/accounts/edit/${id}`}>编辑</Link> <Link to={`/account/detail/${id}`}>查看</Link> <Popconfirm title="确定要删除此渠道？" onConfirm={context._delChannel.bind(context,id)}>
							<Button type="link"><Icon type="delete"/>删除</Button>
					</Popconfirm></span>

            }
        }];
        return columns;
    }
    
    
        quickButton(quickOptions){
            return <Row>
                    <Col span='2'>
                        <Link className="ant-btn ant-btn-primary" to={`/accounts/edit`}>增加帐号</Link>
                    </Col>
            </Row>
        }
    
    render() {
        const {formOptions,quickOptions,_delAccount, ...other} = this.props;

        return (
            <div>
            
                <Search  items={this._getFormItems()} onSubmit={formOptions.handleSubmit} onReset={formOptions.handleReset} />

                <DataTable bordered={true} columns={this._getColumns()} quickButton={this.quickButton(quickOptions)} {...other} />
            
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
