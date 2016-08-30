import React, {Component, PropTypes} from 'react';
import {Table} from 'hen';
const columns = [{
  title: '业务类型',
  dataIndex: 'busiType',
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
  dataIndex: 'isSuccess'
}, {
  title: '处理备注',
  dataIndex: 'remark'
}, {
  title: '处理结果',
  dataIndex: 'result'
}];
class Receiving extends Component {


  render() {
    //const {productOrder} = this.props;
    //if(!productOrder)return null;
    const orderLogList = [];
    return <Table dataSource={orderLogList} columns={columns} bordered  />
  }
}

export default Receiving;
