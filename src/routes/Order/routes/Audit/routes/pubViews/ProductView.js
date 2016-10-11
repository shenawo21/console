import React, {Component, PropTypes} from 'react';
import {Table} from 'hen';

const columns = [{
  key: '1',
  title: '商品编码',
  dataIndex: 'outerSkuId',
}, {
  key: '2',
  title: '商品名称',
  dataIndex: 'title'
}, {
  key: '3',
  title: '原价',
  dataIndex: 'price'
}, {
  key: '4',
  title: '淘宝销售价',
  dataIndex: 'salePrice'
}, {
  key: '5',
  title: '数量',
  dataIndex: 'num'
}, {
  key: '6',
  title: '已拆单数量',
  dataIndex: 'splitNum'
}, {
  key: '7',
  title: '促销ID',
  dataIndex: 'promotionId'
}, {
  key: '8',
  title: '促销名称',
  dataIndex: 'promotionName'
}, {
  key: '9',
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
