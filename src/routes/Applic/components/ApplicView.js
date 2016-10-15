import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

import DataTable from 'components/DataTable';

import Search from 'components/Search';

import {Row, Col, Button, Icon, Popconfirm} from 'hen';

import classes from './applic.less';

const ButtonGroup = Button.Group;
//应用状态
const STATUS = {
  'audit': "审核中",
  'use': "已开通",
  'create': "创建中"
};
class Applic extends Component {

  _getFormItems() {
    let config = {
      formItems: [{
        label: "应用名称：",
        name: "name",
        span: "7",
        labelCol: {span: 5},
        input: {}
      }],
      initValue: {
        name: null
      }
    }
    return config;
  }

  //删除
  del(id) {
    const {delApp} = this.props
    delApp(id)
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
      key: '1',
      title: '应用名称',
      dataIndex: 'name'
    }, {
      key: '2',
      title: '应用状态',
      dataIndex: 'status',
      render(key){
        return <span>{STATUS[key]}</span>;
      }
    }, {
      key: '3',
      title: '更新时间',
      dataIndex: 'createTime'
    }, {
      title: '操作',
      dataIndex: 'shopId',
      width: '25%',
      render(id, row){
        return <ButtonGroup size="large">
          <Button type="ghost" disabled={row.status == 'audit' ? true : false}>
            <Link to={`/applic/edit/${row.shopId}`}  className={classes.colors} disabled={row.status == 'audit' ? true : false}>编辑</Link>
          </Button>

          <Button type="ghost" disabled={row.status == 'audit' ? true : false}>
            <Link to={`/applic/joint/${row.shopId}`}  className={classes.colors} disabled={row.status == 'audit' ? true : false}>对接设置</Link>
          </Button>

          <Button type="ghost" disabled={ row.status == 'audit' || row.status == 'create'? true : false} onClick={context.handleAction.bind(context,row,id)}>
           { row.enabled ? '禁用' : '激活' }
          </Button>

          <Popconfirm title="确定要删除这个应用吗？" onConfirm={context.del.bind(context,id)}>
            <Button type="ghost" disabled={row.status == 'create' ? false : true}>删除</Button>
          </Popconfirm>


        </ButtonGroup>
      }
    }];
    return columns;
  }


  quickButton(quickOptions) {
    return <Row>
      <Col span='2'>
        <Link className="ant-btn ant-btn-primary" to={`/applic/edit`}>创建店铺</Link>
      </Col>
    </Row>
  }

  render() {
    const {formOptions, quickOptions, ...other} = this.props;
    return (
      <div>
        <Search items={this._getFormItems()} onSubmit={formOptions.handleSubmit} onReset={formOptions.handleReset}/>
        <DataTable bordered={true} columns={this._getColumns()}
                   quickButton={this.quickButton(quickOptions)} {...other} ref='dt' />
      </div>
    )
  }
}


Applic.propTypes = {

  dataSource: React.PropTypes.array.isRequired,
  action: React.PropTypes.func.isRequired,

  loading: React.PropTypes.bool,
  params: React.PropTypes.object
}


export default Applic;
