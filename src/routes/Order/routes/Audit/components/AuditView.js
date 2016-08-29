import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import DataTable from 'components/DataTable';
import Search from 'components/Search';
import {Row, Col, Button, Icon, DatePicker, Modal, message} from 'hen';
//订单状态
const orderStatus = {
  'order': "理单中",
  'audit': "审单中",
  'send': "可发货"
};
//合单状态
const mergeStatus = {
  'client': "可合单",
  'noNlient': "不可合单",
  'abandon': "放弃"
};
class Audit extends Component {

  _getFormItems() {
    let context = this, config = {};
    const {shopList} = context.props;
    config = {
      formItems: [{
        label: "选择店铺：",
        name: "shopId",
        span: "5",
        labelCol: {span: 6},
        select: {
          placeholder: "请选择所属店铺",
          optionValue: shopList
        }
      }, {
        label: "订单编号：",
        name: "tId",
        span: "5",
        labelCol: {span: 8},
        input: {}
      }, {
        label: "下单时间：",
        span: "13",
        labelCol: {span: 5},
        wrapperCol: {span: 19},
        custom(getCustomFieldProps, FormContext){
          return <div>
            <Col span="8">
              <DatePicker format="yyyy-MM-dd HH:mm:ss" {...getCustomFieldProps('createStartTime') } showTime={true}/>
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
        label: "买家账号：",
        name: "buyerNick",
        span: "5",
        labelCol: {span: 6},
        input: {}
      }, {
        label: "审单时间：",
        span: "13",
        labelCol: {span: 3},
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
      }],
      initValue: {
        shopId: null,
        tId: null,
        buyerNick: null,
        createStartTime: null,
        createEndTime: null,
        synStartTime: null,
        synEndTime: null
      }
    }
    return config;
  }


    _getColumns(){
        const context = this;
        let columns = [{
            key: '0',
            title: '店铺名称',
            dataIndex: 'shopName'
        }, {
            key: '1',
            title: '订单编号',
            dataIndex: 'tid'
        }, {
            key: '2',
            title: '下单时间',
            dataIndex: 'create'
        }, {
            key: '3',
            title: '买家账号',
            dataIndex: 'buyerNick'
        }, {
            key: '4',
            title: '买家备注',
            dataIndex: 'buyerMemo'
        }, {
            key: '5',
            title: '到期时间',
            dataIndex: 'timeoutActionTime'
        },{
          key: '6',
          title: '订单金额',
          dataIndex: 'payment'
        },{
          key: '7',
          title: '客服备注',
          dataIndex: 'remark'
        },{
            title: '操作',
            dataIndex: '字段6',
            render(id,row){
                return <Col span='2'>
                  <Link to={`/goods/specificate/edit`}>
                    <Button type="primary"><Icon type="plus-circle"/>审单</Button>
                  </Link>
                  <Link to={`/goods/specificate/edit`}>
                    <Button type="primary"><Icon type="plus-circle"/>新增</Button>
                  </Link>
                  <Link to={`/goods/specificate/edit`}>
                    <Button type="primary"><Icon type="plus-circle"/>新增</Button>
                  </Link>
                  <Link to={`/goods/specificate/edit`}>
                    <Button type="primary"><Icon type="plus-circle"/>新增</Button>
                  </Link>
                  <Link to={`/goods/specificate/edit`}>
                    <Button type="primary"><Icon type="plus-circle"/>新增</Button>
                  </Link>
                </Col>
            }
        }];
        return columns;
    }

        quickButton(quickOptions){
            return <Row>
              <Col span='2'>
                <Link to={`/`}>
                  <Button type="primary"><Icon type="plus-circle"/>新建订单</Button>
                </Link>
              </Col>
              <Col span='2'>
                <Link to={`/`}>
                  <Button type="primary"><Icon type="retweet" />同步订单</Button>
                </Link>
              </Col>
            </Row>
        }

    render() {
        const {formOptions,quickOptions, ...other} = this.props;

        return (
            <div>
                <Search  items={this._getFormItems()} onSubmit={formOptions.handleSubmit} onReset={formOptions.handleReset} />
                <DataTable bordered={true} columns={this._getColumns()} quickButton={this.quickButton(quickOptions)} {...other} />
            </div>
        )
    }
}

Audit.propTypes = {

    dataSource : React.PropTypes.array.isRequired,
    action : React.PropTypes.func.isRequired,
    loading : React.PropTypes.bool,
    params : React.PropTypes.object
}


export default Audit;
