import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

import DataTable from 'components/DataTable';

import Search from 'components/Search';

import {Row, Col, Button, Icon, Popconfirm} from 'hen';

//是否可用
const STATUS = [
  {value: 0, title: "不可用"},
  {value: 1, title: "可用"}
];

// 所属账号组
const GROUP = [
  {value:0,title:'董事长'},
  {value:1,title:'产品部'},
  {value:2,title:'开发部'},
  {value:3,title:'行政部'},
]

class Accounts extends Component {

  _getFormItems() {
    let config = {
      formItems: [{
        label: "账号：",
        name: "account",
        span: '5',
        labelCol: {span: 6},
        input: {
          placeholder: "请输入昵称"
        }
      }, {
        label: "用户姓名：",
        name: "name",
        input: {
          placeholder: "请输入用户姓名"
        }
      }, {
        label: "是否可用：",
        name: "enabled",
        select: {
          placeholder: "请选择是否可用",
          optionValue: STATUS
        }
      }, {
        label: "所属账号组：",
        name: "group",
        select: {
          optionValue: GROUP
        }
      }],
      initValue: {
        name: null,
        nick: null,
        group:null
      }
    }
    return config;
  }


  _getColumns() {
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
      title: '所属账号组',
      dataIndex: 'account'
    }, {
      key: '3',
      title: '用户姓名',
      dataIndex: 'name'
    }, {
      key: '4',
      title: '是否可用',
      dataIndex: 'enabled',
      render(status){
        return <span>{STATUS[status].title}</span>
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
      dataIndex: 'registerTime'
    }, {
      key: '8',
      title: '创建人',
      dataIndex: 'createPersionName'
    }];

    let columOther = {
      key: '9',
      title: '操作',
      dataIndex: 'adminId',
      render(id, row){
        return <span><Link to={`/accounts/edit/${id}`}>编辑</Link>
                    <Popconfirm title="确定要删除这个帐号吗？" onConfirm={context.deletedAccount.bind(context,id)}>
                        <Button type="link">删除</Button>
                    </Popconfirm>
                </span>
      }
    }

    if (isAdmin) {
      columns.push(columOther);
    }

    return columns;
  }


  //删除
  deletedAccount(id) {
    const {del} = this.props
    del(id)
    this.refs && this.refs.dt.refresh();
  }


  // 按钮
  quickButton(quickOptions) {
    const {isAdmin} = this.props;
    if (isAdmin) {
      return <Row>
        <Col span='2'>
          <Link className="ant-btn ant-btn-primary" to={`/accounts/edit`}>新增帐号</Link>
        </Col>
      </Row>
    }
  }


  render() {
    const {formOptions, quickOptions, _delAccount, ...other} = this.props;

    return (
      <div>

        <Search items={this._getFormItems()} onSubmit={formOptions.handleSubmit} onReset={formOptions.handleReset}/>

        <DataTable bordered={true} columns={this._getColumns()} quickButton={this.quickButton(quickOptions)} {...other}
                   ref='dt'/>

      </div>
    )
  }
}


Accounts.propTypes = {

  dataSource: React.PropTypes.array.isRequired,
  action: React.PropTypes.func.isRequired,

  loading: React.PropTypes.bool,
  params: React.PropTypes.object
}


export default Accounts;
