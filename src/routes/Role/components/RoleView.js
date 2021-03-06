import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

import DataTable from 'components/DataTable';
import {getPermissions} from 'common/utils'

import Search from 'components/Search';


import {Row, Col, Button, Icon, Popconfirm} from 'hen';

//是否可用
const STATUS = [
  {value: false, title: "不可用"},
  {value: true, title: "可用"}
];

class Role extends Component {

  constructor(props) {
      super(props)

      const url = location.hash.split('?')[0].split('#')[1]
      this.check = getPermissions(url)
  }

  _getFormItems() {
    let config = {
      formItems: [{
        label: "名称：",
        name: "name",
        span: '5',
        labelCol: {span: 4},
        input: {
          placeholder: "请输入名称"
        }
      }, {
        label: "是否可用：",
        name: "enabled",
        span: '7',
        select: {
          placeholder: "请选择是否可用",
          optionValue: STATUS
        }
      }],
      initValue: {
        enterpriseCode: null,
        name: null,
        enabled: null
      }
    }
    return config;
  }

  _getColumns() {
    const context = this;
    let columns = [{
      key: '1',
      title: '名称',
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
      title: '创建时间',
      dataIndex: 'createTime'
    }, {
      key: '4',
      title: '修改时间',
      dataIndex: 'lastUpdateTime'
    }, {
      key: '5',
      title: '操作',
      dataIndex: 'roleId',
      render:(id, row) => {
        return <span>
                  {this.check('编辑') ? <Link to={`/role/edit/${id}`}>编辑</Link> : ''}
                  {this.check('删除') ? <Popconfirm title="确定要删除这个角色吗？" onConfirm={context.deletedRole.bind(context,id)}>
                      <Button type="link">删除</Button>
                  </Popconfirm> : ''}
                  {this.check('权限管理') ? <Link to={`/role/permis/${id}`}>权限管理</Link> : ''}
                </span>

      }
    }];
    return columns;
  }

  //删除
  deletedRole(id) {
    const {del} = this.props
    del(id,this.refs.dt.refresh)
  }

  // 按钮
  quickButton(quickOptions) {
    return <Row>
              {this.check('增加角色') ? <Col span='2'><Link className="ant-btn ant-btn-primary" to={`/role/edit`}>增加角色</Link></Col> : <span></span>}
            </Row>
  }

  render() {
    const {formOptions, quickOptions, ...other} = this.props;

    return (
      <div>
        <Search items={this._getFormItems()} onSubmit={formOptions.handleSubmit} onReset={formOptions.handleReset}/>
        <DataTable bordered={true} columns={this._getColumns()} quickButton={this.quickButton(quickOptions)} {...other}
                   ref='dt'/>
      </div>
    )
  }
}


Role.propTypes = {

  dataSource: React.PropTypes.array.isRequired,
  action: React.PropTypes.func.isRequired,

  loading: React.PropTypes.bool,
  params: React.PropTypes.object
}


export default Role;
