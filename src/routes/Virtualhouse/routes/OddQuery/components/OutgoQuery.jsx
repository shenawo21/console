import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

import DataTable from 'components/DataTable';

import Search from 'components/Search';

import {Row, Col, Button, Icon, Popconfirm, DatePicker} from 'hen';

//出库类型
const STOCKTYPE = [
  {value: '调拨出库', title: "调拨出库"},
  {value: '调整出库', title: "调整出库"}
//    { value: '损耗出库', title: "损耗出库" },
//    { value: '盘点出库', title: "盘点出库" }
];
// 商品来源
const STATUS = [
  {value: 0, title: "中台创建"},
  {value: 1, title: "商城采购"},
  {value: 2, title: "erp对接"}
];

class OutgoView extends Component {

  _getFormItems() {
    let context = this;
    const {shopList} = context.props;
    let config = {
      formItems: [{
        label: "出库店铺：",
        name: "relevantStoreId",
        style:{marginBottom:6},
        select: {
          placeholder: "请选择所属店铺",
          optionValue: shopList
        }

      }, {
        label: "出库单号：",
        name: "recordId",
        style:{marginBottom:6},
        input: {
          placeholder: "请输入出库单号"
        }
      }, {
        label: "SPU：",
        name: "spuId",
        wrapperCol: {span:12},
        style:{marginBottom:6},
        rules: [{ min: 0, max: 9, message: '请输入9位以内数字！' }],
        input: {
          placeholder: "请输入SPU",
          type: 'number'
        }
      }, {
        label: "SKU：",
        name: "skuId",
        span: '5',
        wrapperCol: {span:12},
        style:{marginBottom:6},
        rules: [{ min: 0, max: 9, message: '请输入9位以内数字！' }],
        input: {
          placeholder: "请输入SKU",
          type: 'number'
        }
      }, {
        label: "出库类型：",
        name: "stockType",
        style:{marginBottom:6},
        select: {
          placeholder: "请选择出库类型",
          optionValue: STOCKTYPE
        }
      }, {
        label: "商品来源：",
        name: "fromType",
        style:{marginBottom:6},
        select: {
          placeholder: "请选择商品来源",
          optionValue: STATUS
        }
      }, {
        label: "操作人：",
        name: "account",
        style:{marginBottom:6},
        input: {
          placeholder: "请输入操作人"
        }
      }, {
        label: "出库日期：",
        span: '11',
        labelCol: {span: 4},
        wrapperCol: {span: 19},
        style:{marginBottom:6},
        custom(getCustomFieldProps, FormContext) {
          return <div>
            <DatePicker format="yyyy-MM-dd HH:mm:ss" {...getCustomFieldProps('createTimeStart') } showTime={true}/>
            <span className="ant-form-split">-</span>
            <DatePicker format="yyyy-MM-dd HH:mm:ss"  {...getCustomFieldProps('createTimeEnd') } showTime={true}/>
          </div>
        }
      }],
      initValue: {
        relevantStoreId: null,
        recordId: null,
        spuId: null,
        skuId: null,
        stockType: null,
        fromType:null,
        createUser: null,
        createTimeStart: null,
        createTimeEnd: null
      }
    }
    return config;
  }

    // shouldComponentUpdate(nextProps) {
    //     console.log(nextProps.params,'nextProps.params.recordType');
    //     if (nextProps.tableOptions.params.recordType == '总仓入库') {
    //         return false
    //     }
    //     return true
    // }
  _getColumns() {
    const context = this;
    let columns = [{
      key: '0',
      title: '出库单号',
      dataIndex: 'recordId'
    }, {
      key: '1',
      title: '出库店铺',
      dataIndex: 'relevantStoreName'
    }, {
      key: '2',
      title: '出库类型',
      dataIndex: 'stockType'
    }, {
      key: '3',
      title: 'SPU',
      dataIndex: 'spuId'
    }, {
      key: '4',
      title: 'SKU',
      dataIndex: 'skuId'
    }, {
      key: '5',
      title: '商品名称',
      dataIndex: 'title'
    }, {
      key: '6',
      title:'商品来源',
      dataIndex:'fromType',
      render(status){
          let name = status == null ? status : STATUS[status].title
          return <span>{name}</span>
      }
    }, {
      key: '7',
      title: '市场价',
      dataIndex: 'marketPrice'
    }, {
      key: '8',
      title: '销售价',
      dataIndex: 'price'
    },
    // {
    //   key: '9',
    //   title: '采购价',
    //   dataIndex: 'purchasePrice'
    // },
     {
      key: '10',
      title: '建议销售价',
      dataIndex: 'advicePrice'
    }, {
      key: '11',
      title: '出库数量',
      dataIndex: 'incoming'
    }, {
      key: '12',
      title: '出库时间',
      dataIndex: 'createTime'
    }, {
      key: '13',
      title: '操作人',
      dataIndex: 'account'
    }, {
      key: '14',
      title: '备注',
      dataIndex: 'remark'
    }];

    return columns;
  }

  render() {
    const {formOptions, tableOptions, ...other} = this.props;
    return (
      <div>

        <Search items={this._getFormItems()} onSubmit={formOptions.handleSubmit} onReset={formOptions.handleReset}/>

        <DataTable bordered={true} columns={this._getColumns()} {...tableOptions} ref='dt'/>

      </div>
    )
  }
}


OutgoView.propTypes = {

  // dataSource : React.PropTypes.array.isRequired,
  // action : React.PropTypes.func.isRequired,

  // loading : React.PropTypes.bool,
  // params : React.PropTypes.object
}


export default OutgoView;
