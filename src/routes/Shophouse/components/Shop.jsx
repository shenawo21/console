import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

import DataTable from 'components/DataTable';

import Search from 'components/Search';

import {Row, Col, Button, Icon, Popconfirm} from 'hen';
import {getSpecValue,getPermissions} from 'common/utils'


class shop extends Component {

  constructor(props) {
      super(props)

      const url = location.hash.split('?')[0].split('#')[1]
      this.check = getPermissions(url)
  }

  _getFormItems() {
    let context = this;
    const {cateList, shopList,chList} = context.props;
    let config = {
      formItems: [{
        label: "所属店铺：",
        name: "shopId",
        span: "5",
        labelCol: {span: 6},
        select: {
          placeholder: "请选择所属店铺",
          optionValue: shopList
        }
      }, {
        label: "商品名称：",
        name: "title",
        input: {
          placeholder: "请输入商品名称"
        }
      }, {
        label: "商品类目：",
        name: "categoryCode",
        span: '7',
        wrapperCol: {span: 15},
        cascader: {
          options: cateList,
          placeholder: "请选择所属类目",
          changeOnSelect: true
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
      }],
      initValue: {
        shopId: null,
        title: null,
        categoryCode: null,
        channelCode:null
      }
    }
    return config;
  }


  _getColumns() {
    const context = this;
    let columns = [{
      key: '0',
      title: 'SPU',
      dataIndex: 'spuId'
    }, {
      key: '1',
      title: 'SKU',
      dataIndex: 'skuId'
    }, {
      key: '2',
      title: '所属店铺',
      dataIndex: 'shopName'
    }, {
      key: '3',
      title: '商品名称',
      dataIndex: 'title'
    }, {
      key: '4',
      title: '商品类目',
      dataIndex: 'categoryName'
    },{
      key: '5',
      title: '所属渠道',
      dataIndex: 'channelName'
    },
    //  {
    //   key: '6',
    //   title: '品牌',
    //   dataIndex: 'brandName'
    // }, 
    {
      key: '7',
      title: '规格',
      dataIndex: 'specOneValue',
      render(val, row){
        return getSpecValue(row)
      }
    }, {
      key: '8',
      title: '市场价',
      dataIndex: 'marketPrice'
    }
    // ,{
    //   key: '9',
    //   title: '采购价',
    //   dataIndex: 'purchasePrice'
    // }
    ,{
      key: '10',
      title: '销售价',
      dataIndex: 'price'
    }, {
      key: '11',
      title: '在售库存',
      dataIndex: 'stock'
    }];

    return columns;
  }

  render() {
    const {formOptions, tableOptions, ...other} = this.props;

    return (
      <div>
        <div style={{marginBottom:20}}>
          <Row>
            {this.check('价格调整') ? <Col span='2'>
              <Link className="ant-btn ant-btn-normal" to={`/shophouse/adjustPrice`}>价格调整</Link>
            </Col> : <span></span>}
            {this.check('手动出库') ? <Col span='2'>
              <Link className="ant-btn ant-btn-normal" to={`/shophouse/outgoManual`}>手动出库</Link>
            </Col> : <span></span>}
          </Row>
        </div>
        <Search items={this._getFormItems()} onSubmit={formOptions.handleSubmit} onReset={formOptions.handleReset}/>


        <DataTable bordered={true} columns={this._getColumns()} {...tableOptions} ref='dt'/>

      </div>
    )
  }
}


shop.propTypes = {

  // dataSource : React.PropTypes.array.isRequired,
  // action : React.PropTypes.func.isRequired,

  // loading : React.PropTypes.bool,
  // params : React.PropTypes.object
}


export default shop;
