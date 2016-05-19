import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

import DataTable from 'components/DataTable';


import Search from 'components/Search';

import {Row, Col, Button, Icon, Popconfirm} from 'hen';

//是否可用
const ENABLED = {
  'false': "否",
  'true': "是"
};
//审核状态
const REVIEW = {
  'no': "未审核",
  'success': "成功",
  'failure': "未通过"
};
//企业类型
const TYPE = {
  'client': "客户",
  'system': "系统"
};
const ButtonGroup = Button.Group;
class Enterprise extends Component {

  _getFormItems() {
    let config = {
      formItems: [{
        label: "企业编码：",
        name: "enterpriseCode",
        input: {
          placeholder: "请输入企业编码"
        }
      }, {
        label: "企业名称：",
        name: "name",
        input: {
          placeholder: "请输入企业名称"
        }
      }, {
        label: "企业类型：",
        name: "type",
        select: {
          placeholder: "请选择是否可用",
          optionValue: Object.keys(TYPE).map((key) => {
            return {'value': key, 'title': TYPE[key]}
          })
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

  //删除
  del(id) {
    const {delEnterp} = this.props
    delEnterp(id)
    this.refs && this.refs.dt.refresh();
  }

  //激活 禁用
  handleAction(row, id) {
    const {isAble} = this.props
    isAble(row, id)
    this.refs && this.refs.dt.refresh();
  }

  _getColumns() {
    const context = this;
    let columns = [{
      key: '0',
      title: '企业编码',
      dataIndex: 'enterpriseCode',
    }, {
      key: '1',
      title: '企业名称',
      dataIndex: 'name'
    }, {
      key: '2',
      title: '联系电话',
      dataIndex: 'telephone'
    }, {
      key: '3',
      title: '是否可用',
      dataIndex: 'enabled',
      render(key){
        return <span>{ENABLED[key]}</span>;
      }
    }, {
      key: '4',
      title: '企业类型',
      dataIndex: 'type',
      render(key){
        return <span>{TYPE[key]}</span>;
      }
    }, {
      key: '5',
      title: '审核状态',
      dataIndex: 'reviewStatue',
      render(key){
        return <span>{REVIEW[key]}</span>;
      }
    }, {
      key: '6',
      title: '入驻时间',
      dataIndex: 'createTime'
    }, {
      key: '7',
      title: '操作',
      dataIndex: 'enterpriseCode',
      render(id, row){
        return <ButtonGroup>
          <Button type="link"><Link to={`/enterprise/edit/${id}`} title="查看">查看</Link></Button>

          <Popconfirm title="确定要删除这个企业吗？" onConfirm={context.del.bind(context,id)}>
            <Button type="link">删除</Button>
          </Popconfirm>
          {

            <Button type="link" onClick={context.handleAction.bind(context,row,id)}>
              { row.enabled ? '禁用' : '激活' }
            </Button>
          }
        </ButtonGroup>
      }
    }];
    return columns;
  }


  quickButton(quickOptions) {
    return <Row>
      <Col span='2'>
        <Link to={`/enterprise/edit`}>
          <Button onClick={quickOptions.doUp} type="primary"><Icon type="menu-unfold"/>企业入驻</Button>
        </Link>
      </Col>
    </Row>
  }

  render() {
    const {formOptions, quickOptions, ...other} = this.props;
    return (
      <div>
        <Search items={this._getFormItems()} onSubmit={formOptions.handleSubmit} onReset={formOptions.handleReset}/>

        <DataTable bordered={true} columns={this._getColumns()} ref='dt'
                   quickButton={this.quickButton(quickOptions)} {...other} />

      </div>
    )
  }
}


Enterprise.propTypes = {

  dataSource: React.PropTypes.array.isRequired,
  action: React.PropTypes.func.isRequired,

  loading: React.PropTypes.bool,
  params: React.PropTypes.object
}


export default Enterprise;
