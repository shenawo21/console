import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

import DataTable from 'components/DataTable';
import {getPermissions} from 'common/utils'

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

  constructor(props) {
      super(props)

      const url = location.hash.split('?')[0].split('#')[1]
      this.check = getPermissions(url)
  }

  _getFormItems() {
    const {chList} = this.props
    let config = {
      formItems: [{
        label: "店铺名称：",
        name: "name",
        span: "7",
        labelCol: {span: 5},
        input: {}
      },{
        label: "所属渠道：",
        name: "channelCode",
        select: {
          optionValue: chList,
        }
      }],
      initValue: {
        name: null,
        channelCode:null
      }
    }
    return config;
  }

  //删除
  del(id) {
    const {delApp} = this.props;
    delApp(id);
    this.refs && this.refs.dt.refresh();
  }
  //激活 禁用
  handleAction(row, id) {
    const {isAble} = this.props;
    isAble(row, id);
    this.refs && this.refs.dt.refresh();
  }

  _getColumns() {
    const context = this;
    let columns = [{
      key: '1',
      title: '店铺名称',
      dataIndex: 'name'
    }, {
      key: '2',
      title: '店铺状态',
      dataIndex: 'status',
      render(key){
        return <span>{STATUS[key]}</span>;
      }
    },{
      key: '3',
      title: '所属渠道',
      dataIndex: 'channelName'
    },{
      key: '4',
      title: '更新时间',
      dataIndex: 'createTime'
    }, {
      title: '操作',
      dataIndex: 'shopId',
      width: '25%',
      render:(id, row) => {
        return <ButtonGroup size="large">
          {this.check('编辑') ? 
            <Link to={`/applic/edit/${row.shopId}`}  className={classes.colors} disabled={row.status == 'audit' ? true : false}><Button type="ghost" disabled={row.status == 'audit' ? true : false}>编辑</Button></Link>
          : <span></span>}

          {this.check('对接设置') ? 
            <Link to={`/applic/joint/${row.shopId}`}  className={classes.colors} disabled={row.status == 'audit' ? true : false}><Button type="ghost" disabled={row.status == 'audit' ? true : false}>对接设置</Button></Link>
           : <span></span>}

          {this.check('激活/禁用') ? <Button type="ghost" disabled={ row.status == 'audit' || row.status == 'create'? true : false} onClick={context.handleAction.bind(context,row,id)}>
           { row.enabled ? '禁用' : '激活' }
          </Button> : <span></span>}

          {this.check('删除') ? <Popconfirm title="确定要删除这个店铺吗？" onConfirm={context.del.bind(context,id)}>
            <Button type="ghost" disabled={row.status == 'create' ? false : true}>删除</Button>
          </Popconfirm> : <span></span>}

          {this.check('授权管理') ?
            <Link to={`/applic/add/${row.shopId}`}  className={classes.colors}  disabled={row.status == 'use' ? false : true} ><Button type="ghost" disabled={row.status == 'use' ? false : true}>授权管理</Button></Link>
          : <span></span>}

        </ButtonGroup>
      }
    }];
    return columns;
  }


  quickButton(quickOptions) {
    return <Row>
      {this.check('创建店铺') ? <Col span='2'>
        <Link className="ant-btn ant-btn-primary" to={`/applic/edit`}>创建店铺</Link>
      </Col> : <span></span>}
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
