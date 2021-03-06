import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import DataTable from 'components/DataTable';
import Search from 'components/Search';
import {Table} from 'hen';
//售后类型
const TYPE = [
  {value: 'REFUND_MONEY', title: '退款'},
  {value: 'REFUND_GOODS', title: '退货'},
  {value: 'CHANGE_GOODS', title: '换货'},
]
class ForDeal extends Component {

  _getFormItems() {
    let context = this;
    const {shopListItem} = context.props;
    let config = {
      formItems: [{
        label: "订单编号：",
        name: "tid",


        input: {
          placeholder: "请输入订单编号"
        }
      }, {
        label: "买家账号：",
        name: "buyerNick",
        input: {
          placeholder: "请输入买家账号"
        }
      }, {
        label: "店铺名称：",
        name: "shopId",
        select: {
          placeholder: "请选择店铺名称",
          optionValue: shopListItem
        }
      }, {
        label: "商品编码：",
        name: "skuId",
        span: '5',
        input: {
          placeholder: "请输入商品编码"
        }
      }, {
        label: "产品名称：",
        name: "title",
        input: {
          placeholder: "请输入产品名称"
        }
      }, {
        label: "售后类型：",
        name: "afterSaleType",
        select: {
          placeholder: "请选择售后类型",
          optionValue: TYPE
        }
      }],
      initValue: {
        tid: null,
        buyerNick: null,
        shopName: null,
        skuId: null,
        title: null,
        afterSaleType: null
      }
    }
    return config;
  }

  _getColumns() {
    const context = this;
    let columns = [{
      key: '0',
      title: '订单编号',
      dataIndex: 'tid'
    }, {
      key: '1',
      title: '成交时间',
      dataIndex: 'tradesCreated'
    }, {
      key: '2',
      title: '买家账号',
      dataIndex: 'buyerNick'
    }, {
      key: '3',
      title: '店铺名称',
      dataIndex: 'shopName'
    }, {
      key: '4',
      title: '售后类型',
      dataIndex: 'afterSaleType',
      render(type) {
        switch (type) {
          case 'REFUND_MONEY':
            return '退款'
          case 'REFUND_GOODS':
            return '退货'
          case 'CHANGE_GOODS':
            return '换货'
        }
      }
    }, {
      key: '5',
      title: '操作',
      dataIndex: 'tid',
      render(id, row) {
        return <span><Link to={`/accountant/finance/goodsdetail/${id}`}>订单详情</Link></span>
      }
    }];

    return columns;
  }

  _getSubColumns() {
    const {isAdmin} = this.props;
    const context = this;
    let columns = [{
      key: '1',
      title: '申请发起时间',
      dataIndex: 'created'
    }, {
      key: '2',
      title: '商品编码',
      dataIndex: 'outerSkuId'
    }, {
      key: '3',
      title: '产品名称',
      dataIndex: 'title'
    }, {
      key: '4',
      title: '原价格',
      dataIndex: 'price'
    }, {
      key: '5',
      title: '购买数量',
      dataIndex: 'num'
    }, {
      key: '6',
      title: '商品总价值',
      dataIndex: 'price'
    }, {
      key: '7',
      title: '退货验收数量',
      dataIndex: 'tGoodsNum'
    }, {
      key: '8',
      title: '退货金额',
      render(id, row) {
        return row.price * row.tGoodsNum
      }
    }, {
      key: '9',
      title: '操作',
      dataIndex: 'refundId',
      render(id, row) {
        return <span><Link to={`/accountant/finance/info/${id}/1`}>退款处理</Link></span>
      }
    }];

    return columns;
  }
   shouldComponentUpdate (nextProps, nextState) {
        if(nextProps.tableOptions.key == 1) {
          return false;
        }
        return true;
    }
  
  render() {
    const {formOptions, tableOptions, ...other} = this.props;
    let {dataSource} = tableOptions;

    dataSource && dataSource.forEach((val, index)=> {
      val.key = index;
      val.refundApplyList && val.refundApplyList.forEach((val, index) => {
        val.key = index
      })
    })

    return (
      <div>

        <Search items={this._getFormItems()} onSubmit={formOptions.handleSubmit} onReset={formOptions.handleReset} />

        <DataTable _uKey='skuId' bordered={true} columns={this._getColumns()}
                   expandedRowRender={record => <Table columns={this._getSubColumns()} size="middle" dataSource={record.refundApplyList} pagination={false} />}
         {...tableOptions}  />

      </div>
    )
  }
}


ForDeal.propTypes = {
  // dataSource : React.PropTypes.array.isRequired,
  // action : React.PropTypes.func.isRequired,
  // loading : React.PropTypes.bool,
  // params : React.PropTypes.object
}


export default ForDeal;
