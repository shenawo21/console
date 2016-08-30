import React, {Component, PropTypes} from 'react';
import {Table } from 'hen';

const columns = [{
  title: '商品编码',
  dataIndex: 'channelSku',
}, {
  title: '商品名称',
  dataIndex: 'spuName'
}, {
  title: '淘宝销售价',
  dataIndex: 'salePrice'
}, {
  title: '数量',
  dataIndex: 'num'
}, {
  title: '促销ID',
  dataIndex: 'promotionId'
}, {
  title: '促销名称',
  dataIndex: 'promotionName'
}, {
  title: '行金额',
  dataIndex: 'payment'
}];

class Receiving extends Component {

  render() {
    //const {productOrder} = this.props;
    //if(!skuList)return null;
    const context = this,skuList = [];
    return <Table dataSource={skuList} columns={columns} bordered  />
  }
}

export default Receiving;
