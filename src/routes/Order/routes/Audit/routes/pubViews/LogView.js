import React, {Component, PropTypes} from 'react';
import {Table} from 'hen';
//订单处理日志业务类型
const LOGTYPE = {
  'ORDER_DISPOSE': "订单处理",
  'ORDER_SEND_GOODS': "订单发货",
  'ORDER_REFUND': "订单退款",
  'ORDER_REFUND_GOODS': "订单退货",
  'ORDER_CHANGE_GOODS': "订单换货"
};
//是否成功
const ISSUCC = {
  true: "成功",
  false: "失败"
};
const columns = [{
  title: '业务类型',
  dataIndex: 'busiType',
  render(value){
    return <span>{LOGTYPE[value]}</span>
  }
}, {
  title: '操作内容',
  dataIndex: 'opContent'
}, {
  title: '处理人员',
  dataIndex: 'createUser'
}, {
  title: '处理时间',
  dataIndex: 'createTime'
}, {
  title: '是否成功',
  dataIndex: 'success',
  render(value){
    return <span>{ISSUCC[value]}</span>
  }
}, {
  title: '处理备注',
  dataIndex: 'remark'
}, {
  title: '处理结果',
  dataIndex: 'result'
}];
class Receiving extends Component {


  render() {
    const {LogInfo} = this.props;
    if (!LogInfo)return null;
    let logList = LogInfo.orderLogList
    return <Table dataSource={logList} rowKey={record => record.logId} columns={columns} bordered pagination={false}/>
  }
}

export default Receiving;
