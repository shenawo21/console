import React, {Component, PropTypes} from 'react';
import classes from './style.less'
import {Row, Col} from 'hen';
//收货信息title配置
const config = [
  {label: "商品原价总额：", name: "totalFee"},
  {label: "快递费用：", name: "postFee"},
  {label: "优惠折扣：", name: "discountFee"},
  {label: "应付金额：", name: "totalFee"},
  {label: "实付金额：", name: "payment"}
]
class Receiving extends Component {
  /**
   * name
   * @param name
   * @param payInfo
   * @returns {XML}
   * @private
   */
  _showTitle(name, payInfo) {
    switch (name) {
      case "totalFee":
        return <span>{payInfo.totalFee}</span>
        break;
      case "postFee":
        return <span>{payInfo.postFee}</span>
        break;
      case "discountFee":
        return <span>{payInfo.discountFee}</span>
        break;
      case "totalFee":
        return <span>{payInfo.totalFee}</span>
        break;
      case "payment":
        return <span>{payInfo.payment}</span>
        break;
    }
  }

  render() {
    const {payInfo} = this.props;
    if (!payInfo)return null;
    return <Row>
      {
        config.map((item, i) => {
          return <Col key={i} span="12">
            <div className={classes.orderInfo}>
              <label>{item.label}</label>{this._showTitle(item.name, payInfo)}
            </div>
          </Col>
        })
      }
    </Row>
  }
}

export default Receiving;
