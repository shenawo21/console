import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import DataTable from 'components/DataTable';

import Search from 'components/Search';
import {DownLoader} from 'components/FileLoader';
import {Row, Col, Button, Icon, DatePicker, Modal, message} from 'hen';
//订单状态
const TYPE = [
  {value: '0', title: '已发货'},
  {value: '1', title: '已签收'},
  {value: '2', title: '已退货'},
  {value: '3', title: '已换货'},
  {value: '4', title: '退款'},
]
//排序方式
const SORT = [
  {value: '0', title: '倒序'},
  {value: '1', title: '升序'},
]
class History extends Component {

  _getFormItems() {
    let context = this, config = {};
    const {shopList} = context.props;
    config = {
      formItems: [{
        label: "选择店铺：",
        name: "shopId",
        span: "5",
        labelCol: {span: 5},
        select: {
          placeholder: "请选择所属店铺",
          optionValue: shopList
        }
      }, {
        label: "订单状态：",
        name: "tradeType",
        span: "5",
        labelCol: {span: 5},
        select: {
          placeholder: "请选择订单状态",
          optionValue: Object.keys(TYPE).map((key) => {
            return {'value': key, 'title': TYPE[key].title}
          })
        }
      }, {
        label: "订单编号：",
        name: "tId",
        span: "5",
        labelCol: {span: 5},
        input: {}
      }, {
        label: "买家账号：",
        name: "buyerNick",
        span: "5",
        labelCol: {span: 5},
        input: {}
      }, {
        label: "成交时间：",
        span: "12",
        labelCol: {span: 2},
        wrapperCol: {span: 19},
        custom(getCustomFieldProps, FormContext){
          return <div>
            <Col span="8">
              <DatePicker format="yyyy-MM-dd HH:mm:ss" {...getCustomFieldProps('payStartTime') } showTime={true}/>
            </Col>
            <Col span="3">
              <p className="ant-form-split">~</p>
            </Col>
            <Col span="8">
              <DatePicker format="yyyy-MM-dd HH:mm:ss"  {...getCustomFieldProps('createEndTime') } showTime={true}/>
            </Col>
          </div>
        }
      }, {
        label: "发货时间：",
        span: "12",
        labelCol: {span: 2},
        wrapperCol: {span: 19},
        custom(getCustomFieldProps, FormContext){
          return <div>
            <Col span="8">
              <DatePicker format="yyyy-MM-dd HH:mm:ss" {...getCustomFieldProps('reviewStartTime') } showTime={true}/>
            </Col>
            <Col span="3">
              <p className="ant-form-split">~</p>
            </Col>
            <Col span="8">
              <DatePicker format="yyyy-MM-dd HH:mm:ss"  {...getCustomFieldProps('reviewEndTime') } showTime={true}/>
            </Col>
          </div>
        }
      }, {
        label: "排序方式：",
        name: "sort",
        span: "5",
        labelCol: {span: 5},
        select: {
          placeholder: "请选择订单状态",
          optionValue: Object.keys(SORT).map((key) => {
            return {'value': key, 'title': SORT[key].title}
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
        sort: '0'
      }
    }
    return config;
  }


  _getColumns() {
    const context = this;
    let columns = [{
      key: '0',
      title: '订单号',
      dataIndex: 'tid'
    }, {
      key: '1',
      title: '下单时间',
      dataIndex: 'created'
    }, {
      key: '2',
      title: '买家昵称',
      dataIndex: 'buyerNick'
    }, {
      key: '3',
      title: '买家备注',
      dataIndex: 'buyerMemo'
    }, {
      key: '4',
      title: '客服备注',
      dataIndex: 'sellerMemo'
    }, {
      key: '5',
      title: '发货时间',
      dataIndex: 'shoppTime'
    }, {
      key: '6',
      title: '订单状态',
      dataIndex: 'tradeType',
      render(key){
        return <span>{TYPE[key].title}</span>;
      }
    }];
    return columns;
  }


  quickButton(quickOptions) {
    return <Row>
      <Col span='2'>
        <DownLoader url='/api-tradesInfo.exportOrders' title='导出订单'/>
      </Col>
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
