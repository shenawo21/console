import React, {Component, PropTypes} from 'react';
import classes from './style.less'
import {Row, Col} from 'hen';
//订单状态
const STATUS = {
  'ARRANGE_ORDER': "埋单中",
  'REVIEW_ORDER': "审单中",
  'WAIT_SEND_GOODS': "可发货",
  'DELAYED_DELIVERY': "延迟发货",
  'RE_ORDER': "重新理单"
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
  {label: "订单编号：", name: "tid"},
  {label: "店铺名称：", name: "title"},
  {label: "订单状态：", name: "offlineStatus"},
  {label: "交易类型：", name: "type"},
  {label: "交易来源：", name: "tradeFrom"},
  {label: "交易创建时间：", name: "created"},
  {label: "付款时间：", name: "payTime"}
]
class Basic extends Component {
  /**
   * name
   * @param name
   * @param basicInfo
   * @returns {XML}
   * @private
   */
  _showTitle(name, basicInfo) {
    switch (name) {
      case "tid":
        return <span>{basicInfo.tid}</span>
        break;
      case "title":
        return <span>{basicInfo.title}</span>
        break;
      case "offlineStatus":
        return <span>{STATUS[basicInfo.offlineStatus]}</span>
        break;
      case "type":
        return <span>{TYPE[basicInfo.type]}</span>
        break;
      case "tradeFrom":
        return <span>{FROM[basicInfo.tradeFrom]}</span>
        break;
      case "created":
        return <span>{basicInfo.created}</span>
        break;
      case "payTime":
        return <span>{basicInfo.payTime}</span>
        break;
    }
  }

  render() {
    const {basicInfo} = this.props;
    if (!basicInfo)return null;
    return <Row>
      {
        config.map((item, i) => {
          return <Col key={i} span="8">
            <div className={classes.orderInfo}>
              <label>{item.label}</label>{this._showTitle(item.name, basicInfo)}
            </div>
          </Col>
        })
      }
    </Row>
  }
}

export default Basic;
