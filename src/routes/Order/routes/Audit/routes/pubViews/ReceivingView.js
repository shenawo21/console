import React, {Component, PropTypes} from 'react';
import classes from './style.less'
import {Row, Col} from 'hen';
//收货信息title配置
const config = [
  {label: "收货人姓名：", name: "receiverName"},
  {label: "联系电话：", name: "receiverMobile"},
  {label: "邮编：", name: "receiverZip"},
  {label: "物流公司：", name: "companyName"},
  {label: "收货地址：", name: "receiverAddress"}
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
      case "receiverName":
        return <span>{productOrder.receiverName}</span>
        break;
      case "receiverMobile":
        return <span>{productOrder.receiverMobile}</span>
        break;
      case "receiverZip":
        return <span>{productOrder.receiverZip}</span>
        break;
      case "companyName":
        return <span>{productOrder.companyName}</span>
        break;
      case "receiverAddress":
        return <span>{productOrder.receiverAddress}</span>
        break;
    }
  }

  render() {
    //const {productOrder} = this.props;
    //if(!productOrder)return null;
    const productOrder = {
      receiverName: '80000003',
      receiverMobile: '尚龙天猫旗舰店',
      receiverZip: '80000003',
      companyName: '8000fdsfds0003',
      receiverAddress: '广东省-深圳市-南山区-软件产业基地5E526',
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
