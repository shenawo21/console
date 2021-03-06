import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import DataTable from 'components/DataTable';
import Search from 'components/Search';
import {getPermissions} from 'common/utils'
import {Row, Col, Button, Icon, DatePicker, Modal, message, Popconfirm} from 'hen';
//订单状态
const orderStatus = {
  'ARRANGE_ORDER': "埋单中",
  'REVIEW_ORDER': "审单中",
  'WAIT_SEND_GOODS': "可发货",
  'DELAYED_DELIVERY': "延迟发货",
  'RE_ORDER': "重新理单"
};
//合单状态
const mergeStatus = {
  'CAN_MERGE': "可合并",
  'ABANDON_MERGE': "已放弃",
  'ACHIEVE_MERGE': "合并完成"
};
class Audit extends Component {

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
        span: "5",
        labelCol: {span: 6},
        select: {
          placeholder: "请选择所属店铺",
          optionValue: shopList
        }
      }, {
        label: "订单编号：",
        name: "tid",
        span: "5",
        labelCol: {span: 9},
        input: {}
      }, {
        label: "下单时间：",
        span: '11',
        labelCol: {span: 5},
        wrapperCol: {span: 19},
        custom(getCustomFieldProps, FormContext){
          return <div><DatePicker format="yyyy-MM-dd HH:mm:ss" {...getCustomFieldProps('createStartTime') }
                                  showTime={true}/>
            <p className="ant-form-split">~</p>
            <DatePicker format="yyyy-MM-dd HH:mm:ss"  {...getCustomFieldProps('createEndTime') } showTime={true}/>
          </div>
        }
      },{
        label: "所属渠道：",
        name: "channelCode",
        span: "5",
        labelCol: {span: 6},
        select: {
          placeholder: "请选择渠道编码",
          optionValue: chList
        }
      }, {
        label: "买家账号：",
        name: "buyerNick",
        span: "5",
        labelCol: {span: 9},
        input: {}
      }, {
        label: "客服备注：",
        name: "remark",
        span: "9",
        labelCol: {span: 5},
        input: {}
      }],
      initValue: {
        shopId: null,
        tid: null,
        buyerNick: null,
        createStartTime: null,
        createEndTime: null,
        remark: null,
        channelCode:null
      }
    }
    return config;
  }

  //放弃合并
  noMerger(row,refresh) {
    const context = this;
    const {notMerge} = context.props;
    notMerge(row,context.refs.dt.refresh);
    // context.refs && context.refs.dt.refresh();
  }

  //直接发货
  send(row,refresh) {
    const context = this;
    const {isGive} = context.props;
    isGive(row,context.refs.dt.refresh);
    // context.refs && context.refs.dt.refresh();
  }

  _getColumns() {
    const context = this;
    let columns = [{
      key: '0',
      title: '店铺名称',
      dataIndex: 'shopName'
    }, {
      key: '1',
      title: '订单编号',
      dataIndex: 'tid',
    }, {
      key: '2',
      title: '下单时间',
      dataIndex: 'created'
    },{
      key: '3',
      title: '所属渠道',
      dataIndex: 'channelName'
    }, {
      key: '4',
      title: '买家账号',
      dataIndex: 'buyerNick'
    }, {
      key: '5',
      title: '买家留言',
      dataIndex: 'buyerMessage'
    }, 
    // {
    //   key: '6',
    //   title: '到期时间',
    //   dataIndex: 'timeoutActionTime'
    // },
     {
      key: '7',
      title: '订单金额',
      dataIndex: 'payment'
    }, {
      key: '8',
      title: '客服备注',
      dataIndex: 'remark'
    }, {
      title: '操作',
      dataIndex: 'shopId',
      render:(id, row) => {
        return <div>
          {
            row.mergeStatus == 'CAN_MERGE' ? '' :
              (this.check('审单') ? <Link to={`/order/audit/deal/${row.tid}`}>审单&nbsp;&nbsp; | &nbsp;&nbsp;</Link> : '')
          }
          {this.check('拆单') ? <Link to={`/order/audit/apart/${row.tid}`}>拆单</Link> : ''}
          {
            row.mergeStatus !== 'CAN_MERGE' ? '' :
              (<Link to={`/order/audit/merge/${row.mergeTids}`}>&nbsp;&nbsp; | &nbsp;&nbsp;合并订单</Link>)
          }
          {
            row.mergeStatus !== 'CAN_MERGE' ? '' :
              (<Popconfirm title="确定要放弃合并订单吗？" onConfirm={context.noMerger.bind(context,row)}>
                <a href="#">&nbsp;&nbsp; | &nbsp;&nbsp;放弃合并</a>
              </Popconfirm>)
          }
          {
            row.remark !== '无备注' ? '' : (this.check('直接发货') ? <Popconfirm title="确定要发货吗？" onConfirm={context.send.bind(context,row)}>
              <a href="#">&nbsp;&nbsp; | &nbsp;&nbsp;直接发货</a>
            </Popconfirm> : '')
          }
          {this.check('查看详情') ? <Link to={`/order/audit/detail/${row.tid}`}>&nbsp;&nbsp; | &nbsp;&nbsp;查看详情</Link> : ''}
        </div>;
      },
      width:'260'

    }];
    return columns;
  }

  quickButton(quickOptions) {
    return <Row>
      {this.check('新建订单') ? <Col span='2'>
        <Link to={`/order/add`}>
          <Button type="primary"><Icon type="plus-circle"/>新建订单</Button>
        </Link>
      </Col> : <span></span>}
      {this.check('同步订单') ? <Col span='2'>
        <Link to={`/order/synch`}>
          <Button type="primary"><Icon type="retweet"/>同步订单</Button>
        </Link>
      </Col> : <span></span>}
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

Audit.propTypes = {

  dataSource: React.PropTypes.array.isRequired,
  action: React.PropTypes.func.isRequired,
  loading: React.PropTypes.bool,
  params: React.PropTypes.object
}


export default Audit;
