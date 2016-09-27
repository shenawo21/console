import React, {Component, PropTypes} from 'react';
import DataTable from 'components/DataTable';
import Search from 'components/Search';

import {getSpecValue} from 'common/utils';

import {Row, Col, Button, Icon} from 'hen';
class Choose extends Component {
  _getFormItems() {
    const context = this;
    const {shopList, cateList}=context.props;
    let config = {
      formItems: [{
        label: "商品名称：",
        name: "title",
        input: {
          placeholder: "请输入商品名称"
        }
      }, {
        label: "所属店铺：",
        name: "shopId",
        select: {
          placeholder: "请选择所属店铺",
          optionValue: shopList
        }
      }, {
        label: "商品类目：",
        name: "categoryCode",
        wrapperCol: {span: 15},
        cascader: {
          options: cateList,
          placeholder: "请选择所属类目",
          changeOnSelect: true
        }
      }],
      initValue: {
        title: null,
        shopId: null,
        categoryCode: null
      }
    }
    return config;
  }

  _getColumns() {
    const context = this;
    let columns = [{
      key: '0',
      title: 'SPU编码',
      dataIndex: 'spuId'
    }, {
      key: '1',
      title: 'SKU编码',
      dataIndex: 'skuId'
    }, {
      key: '2',
      title: '商品名称',
      dataIndex: 'title'
    }, {
      key: '3',
      title: '商品类目',
      dataIndex: 'categoryName'
    }, {
      key: '4',
      title: '商品编码',
      dataIndex: 'categoryCode'
    }, {
      key: '5',
      title: '销售价',
      dataIndex: 'price'
    }, {
      key: '6',
      title: '市场价',
      dataIndex: 'marketPrice'
    }, {
      key: '7',
      title: '规格',
      dataIndex: 'specOneValue',
      render(val, row){
        return getSpecValue(row)
      }
    }, {
      key: '8',
      title: '在售库存',
      dataIndex: 'stock'
    }];
    return columns;
  }

  render() {
    const {shopList, cateList, chooseTableOptions, chooseFormOption, proResult} = this.props;
    const {handleSubmit, handleReset} = chooseFormOption();
    return (
      <div>
        <Search items={this._getFormItems()} onSubmit={handleSubmit} onReset={handleReset}/>
        <DataTable bordered={true} columns={this._getColumns()} {...chooseTableOptions} />
      </div>
    )
  }
}

Choose.propTypes = {

  //dataSource: React.PropTypes.array.isRequired,
  //action: React.PropTypes.func.isRequired,
  //loading: React.PropTypes.bool,
  //params: React.PropTypes.object
}


export default Choose;
