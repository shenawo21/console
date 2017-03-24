import React, {Component, PropTypes} from 'react';
import DataTable from 'components/DataTable';

import Search from 'components/Search';
import {DownLoader} from 'components/FileLoader';
import {Row, Col, Button, Icon, DatePicker, Modal, message} from 'hen';
import {getPermissions} from 'common/utils'

//订单状态
const TYPE =
{
  'TRADE_BUYER_SIGNED': '已签收',
  'REFUND_GOODS': '退货',
  'CHANGE_GOODS': '换货',
  'REFUND': '退款',
}


//排序方式
const SORT = [
  {value: '0', title: '按成交时间倒序'},
  {value: '1', title: '按成交时间升序'},
]
class History extends Component {

  constructor(props) {
      super(props)

      const url = location.hash.split('?')[0].split('#')[1]
      this.check = getPermissions(url)
  }

  _getFormItems() {
    let context = this, config = {};
    const {shopList,chList} = context.props;
    config = {
      formItems: [{
        label: "选择店铺：",
        name: "shopId",
        select: {
          placeholder: "请选择所属店铺",
          optionValue: shopList
        }
      }, {
        label: "订单编号：",
        name: "tid",
        input: {}
      }, {
        label: "成交时间：",
        span: '10',
        labelCol: {span: 3},
        wrapperCol: {span: 18},
        custom(getCustomFieldProps, FormContext){
          return <div>
            <DatePicker format="yyyy-MM-dd HH:mm:ss" {...getCustomFieldProps('payStartTime') } showTime={true}/>
            <p className="ant-form-split">~</p>
            <DatePicker format="yyyy-MM-dd HH:mm:ss"  {...getCustomFieldProps('payEndTime') } showTime={true}/>
          </div>
        }
      }, {
        label: "买家账号：",
        name: "buyerNick",
        input: {}
      }, {
        label: "排序方式：",
        name: "payTimeSort",
        select: {
          placeholder: "请选择排序方式",
          optionValue: Object.keys(SORT).map((key) => {
            return {'value': key, 'title': SORT[key].title}
          })
        }
      }, {
        label: "发货时间：",
        span: '10',
        labelCol: {span: 3},
        wrapperCol: {span: 18},
        custom(getCustomFieldProps, FormContext){
          return <div>
              <DatePicker format="yyyy-MM-dd HH:mm:ss" {...getCustomFieldProps('shoppStartTime') } showTime={true}/>
              <p className="ant-form-split">~</p>
              <DatePicker format="yyyy-MM-dd HH:mm:ss"  {...getCustomFieldProps('shoppEndTime') } showTime={true}/>
          </div>
        }
      },{
        label: "所属渠道：",
        name: "channelCode",
        select: {
          placeholder: "请选择渠道编码",
          optionValue: chList
        }
      },{
        label: "订单状态：",
        name: "tradeType",
        select: {
          placeholder: "请选择订单状态",
          optionValue: Object.keys(TYPE).map((key) => {
            return {'value': key, 'title': TYPE[key]}
          })
        }
      }],
      initValue: {
        shopId: null,
        tradeType: null,
        tId: null,
        buyerNick: null,
        payStartTime: null,
        payEndTime: null,
        shoppStartTime: null,
        shoppEndTime: null,
        payTimeSort: '0',
        channelCode:null
      }
    }
    return config;
  }

  _getColumns() {
    const context = this;
    let columns = [{
      key: '0',
      title: '序号',
      dataIndex: '_index',
      render(key){
        return <span>{key+1}</span>;
      }
    },{
      key: '1',
      title: '订单号',
      dataIndex: 'tid'
    }, {
      key: '2',
      title: '成交时间',
      dataIndex: 'payTime'
    }, {
      key: '3',
      title: '买家昵称',
      dataIndex: 'buyerNick'
    }, {
      key: '4',
      title: '买家留言',
      dataIndex: 'buyerMessage'
    }, {
      key: '5',
      title: '客服备注',
      dataIndex: 'remark'
    }, {
      key: '6',
      title: '发货时间',
      dataIndex: 'shoppTime'
    }, {
      key: '7',
      title: '所属渠道',
      dataIndex: 'channelName'
    },{
      key: '8',
      title: '订单状态',
      dataIndex: 'tradesStatus',
      render(key){
        return <span>{TYPE[key]}</span>;
      }
    }];
    return columns;
  }

  quickButton(quickOptions) {
    const {downParams} = this.props;
    if(downParams.pageNumber) {delete downParams.pageNumber}
    return <Row>
      {this.check('导出历史订单') ? <Col span='2'>
        <DownLoader url='/api-tradesInfo.exportOrders' params={downParams} title='导出订单'/>
      </Col> : <span></span>}
    </Row>
  }

  render() {
    const {formOptions, quickOptions, ...other} = this.props;
    return (
      <div>
        <Search items={this._getFormItems()} onSubmit={formOptions.handleSubmit} onReset={formOptions.handleReset}/>
        <DataTable bordered={true} columns={this._getColumns()}
                   quickButton={this.quickButton(quickOptions)} {...other} />
      </div>
    )
  }
}

History.propTypes = {
  dataSource: React.PropTypes.array.isRequired,
  action: React.PropTypes.func.isRequired,
  loading: React.PropTypes.bool,
  params: React.PropTypes.object
}

export default History;


