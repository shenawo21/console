import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import DataTable from 'components/DataTable';
import Search from 'components/Search';
import {Table} from 'hen';

class Checked extends Component {

  _getFormItems() {
    let context = this;
    const {platListItem} = context.props;
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
        label: "所属平台：",
        name: "channelCode",
        select: {
          optionValue: platListItem
        }
      }, {
        label: "商品编码：",
        span: '5',
        name: "skuId",
        input: {
          placeholder: "请输入商品编码"
        }
      }, {
        label: "产品名称：",
        name: "title",
        span: "8",
        labelCol: {span: 6},
        input: {
          placeholder: "请输入产品名称"
        }
      }],
      initValue: {
        tid: null,
        buyerNick: null,
        channelCode: null,
        skuId: null,
        title: null
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
        return <Link to={`/service/aftersale/goodsdetail/${id}`}>订单详情</Link>
      }
    }];

    return columns;
  }

  _getSubColumns() {
    const context = this;
    let columns = [{
      key: '0',
      title: '申请发起时间',
      dataIndex: 'created'
    }, {
      key: '1',
      title: '商品编码',
      dataIndex: 'outerSkuId'
    }, {
      key: '2',
      title: '产品名称',
      dataIndex: 'title'
    }, {
      key: '3',
      title: '数量',
      dataIndex: 'num'
    }, {
      key: '4',
      title: '退 / 换货数量',
      dataIndex: 'tGoodsNum'
    }, {
      key: '5',
      title: '操作',
      dataIndex: 'refundId',
      render(id, record) {
        return (
          <span>
                    <Link to={`/service/warehouse/info/${id}/1`}>已验收详情</Link> 
                </span>
        );
      }
    }];

    return columns;
  }
  shouldComponentUpdate (nextProps, nextState) {
        if(nextProps.tableOptions.key == 2) {
          return false;
        }
        return true;
    }
  render() {
    const {formOptions, tableOptions, ...other} = this.props;
    const {dataSource} = tableOptions;
    dataSource && dataSource.forEach((val, index)=> {
      val.key = index;
      val.refundApplyList && val.refundApplyList.forEach((val, index) => {
        val.key = index
      })
    })

    return (
      <div>

        <Search items={this._getFormItems()} onSubmit={formOptions.handleSubmit} onReset={formOptions.handleReset}/>

        <DataTable _uKey='skuId' bordered={true} columns={this._getColumns()}
                   expandedRowRender={record => <Table size="small" bordered={true} columns={this._getSubColumns()} dataSource={record.refundApplyList} pagination={false} />}
          {...tableOptions} />
      </div>
    )
  }
}


Checked.propTypes = {
  dataSource: React.PropTypes.array,
  action: React.PropTypes.func,
  loading: React.PropTypes.bool,
  params: React.PropTypes.object
}


export default Checked;
