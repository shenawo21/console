import React, {Component, PropTypes} from 'react';
import {Table} from 'hen';
const columns = [{
  title: '订单ID',
  dataIndex: 'orderId',
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
    //const {productOrder} = this.props;
    //if(!productOrder)return null;
    const promotionList = [];
    return <Table dataSource={promotionList} columns={columns} bordered  />
  }
}

export default Receiving;
