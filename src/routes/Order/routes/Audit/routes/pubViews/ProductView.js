import React, {Component, PropTypes} from 'react';
import {Table} from 'hen';

const columns = [{
  title: '商品编码',
  dataIndex: 'outerSkuId',
}, {
  title: '商品名称',
  dataIndex: 'title'
}, {
  title: '原价',
  dataIndex: 'price'
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
    const {productInfo} = this.props;
    let skuList = productInfo.list ? productInfo.list : productInfo.tradesOrderList;
    if (!skuList)return null;
    return <Table dataSource={skuList} rowKey={record => record.oid} columns={columns} bordered pagination={false}/>
  }
}

export default Receiving;
