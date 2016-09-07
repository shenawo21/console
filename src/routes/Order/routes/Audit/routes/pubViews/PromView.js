import React, {Component, PropTypes} from 'react';
import {Table} from 'hen';
const columns = [{
  title: '订单ID',
  dataIndex: 'tid',
}, {
  title: '促销名称',
  dataIndex: 'promotionName'
}, {
  title: '优惠金额',
  dataIndex: 'discountFee'
}, {
  title: '礼品',
  dataIndex: 'giftItemId'
}];
class Receiving extends Component {

  render() {
    const {promInfo} = this.props;
    let promotionList = promInfo.promotionList;
    if (!promotionList)return null;
    return <Table dataSource={promotionList} rowKey={record => record.recordId} columns={columns} bordered
                  pagination={false}/>
  }
}

export default Receiving;
