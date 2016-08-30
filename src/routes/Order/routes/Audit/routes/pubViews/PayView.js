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
   * @param productOrder
   * @returns {XML}
   * @private
   */
  _showTitle(name, productOrder) {
    switch (name) {
      case "totalFee":
        return <span>{productOrder.totalFee}</span>
        break;
      case "postFee":
        return <span>{productOrder.postFee}</span>
        break;
      case "discountFee":
        return <span>{productOrder.discountFee}</span>
        break;
      case "totalFee":
        return <span>{productOrder.totalFee}</span>
        break;
      case "payment":
        return <span>{productOrder.payment}</span>
        break;
    }
  }

  render() {
    //const {productOrder} = this.props;
    //if(!productOrder)return null;
    const productOrder = {
      totalFee: '80000003',
      postFee: '尚龙天猫旗舰店',
      discountFee: '80000003',
      totalFee: '8000fdsfds0003',
      payment: '5E526',
    }
    return <Row>
      {
        config.map((item, i) => {
          return <Col key={i} span="12">
            <div className={classes.orderInfo}>
              <label>{item.label}</label>{this._showTitle(item.name, productOrder)}
            </div>
          </Col>
        })
      }
    </Row>
  }
}

export default Receiving;
