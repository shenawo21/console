import React, {Component, PropTypes} from 'react';
import classes from './style.less'
import {Row, Col} from 'hen';
//订单状态
const STATUS = {
  'TRADE_NO_CREATE_PAY': "没有创建支付宝交易",
  'WAIT_BUYER_PAY': "等待买家付款",
  'WAIT_SELLER_SEND_GOODS': "等待卖家发货",
  'WAIT_BUYER_CONFIRM_GOODS': "等待买家确认收货",
  'TRADE_BUYER_SIGNED': "买家已签收",
  'TRADE_FINISHED': "交易成功",
  'TRADE_CLOSED': "付款以后用户退款成功，交易自动关闭",
  'TRADE_CLOSED_BY_TAOBAO': "付款以前，卖家或买家主动关闭交易",
  'PAY_PENDING': "国际信用卡支付付款确认中"
};
//交易类型
const TYPE = {
  'fixed': "一口价",
  'auction': "拍卖",
  'guarantee_trade': "一口价、拍卖",
  'auto_delivery': "自动发货",
  'independent_simple_trade': "旺店入门版交易",
  'independent_shop_trade': "旺店标准版交易",
  'ec': "直冲",
  'cod': "货到付款",
  'game_equipment': "游戏装备",
  'shopex_trade': "ShopEX交易",
  'netcn_trade': "万网交易",
  'external_trade': "统一外部交易",
  'o2o_offlinetrade': "O2O交易",
  'step': "万人团",
  'fenxiao': "分销",
  'nopaid': "无付款订单",
  'pre_auth_type': "预授权0元购机交易"
};
//交易来源
const FROM = {
  'WAP': "手机",
  'HITAO': "嗨淘",
  'TOP': "TOP平台",
  'TAOBAO': "普通淘宝",
  'JHS': "聚划算"
};
//订单title配置
const config = [
  {label: "订单编号：", name: "orderId"},
  {label: "店铺名称：", name: "shopName"},
  {label: "订单状态：", name: "offlineStatus"},
  {label: "交易类型：", name: "type"},
  {label: "交易来源：", name: "tradeFrom"},
  {label: "交易创建时间：", name: "created"},
  {label: "付款时间：", name: "payTime"},
  {label: "到期时间：", name: "timeoutActionTime"},
  {label: "预计发货时间：", name: "estConTime"}
]
class Basic extends Component {
  /**
   * name
   * @param name
   * @param productOrder
   * @returns {XML}
   * @private
   */
  _showTitle(name, productOrder) {
    switch (name) {
      case "orderId":
        return <span>{productOrder.orderId}</span>
        break;
      case "shopName":
        return <span>{productOrder.shopName}</span>
        break;
      case "offlineStatus":
        return <span>{STATUS[productOrder.offlineStatus]}</span>
        break;
      case "type":
        return <span>{TYPE[productOrder.type]}</span>
        break;
      case "tradeFrom":
        return <span>{FROM[productOrder.tradeFrom]}</span>
        break;
      case "created":
        return <span>{productOrder.created}</span>
        break;
      case "payTime":
        return <span>{productOrder.payTime}</span>
        break;
      case "timeoutActionTime":
        return <span>{productOrder.timeoutActionTime}</span>
        break;
      case "estConTime":
        return <span>{productOrder.estConTime}</span>
        break;
    }
  }

  render() {
    //const {productOrder} = this.props;
    //if(!productOrder)return null;
    const productOrder = {
      orderId: '80000003',
      shopName: '尚龙天猫旗舰店',
      offlineStatus: '80000003',
      type: '8000fdsfds0003',
    }
    return <Row>
      {
        config.map((item, i) => {
          return <Col key={i} span="8">
            <div className={classes.orderInfo}>
              <label>{item.label}</label>{this._showTitle(item.name, productOrder)}
            </div>
          </Col>
        })
      }
    </Row>
  }
}

export default Basic;
