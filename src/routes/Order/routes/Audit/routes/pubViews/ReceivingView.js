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
   * @param receivingInfo
   * @returns {XML}
   * @private
   */
  _showTitle(name, receivingInfo) {
    switch (name) {
      case "receiverName":
        return <span>{receivingInfo.receiverName}</span>
        break;
      case "receiverMobile":
        return <span>{receivingInfo.receiverMobile}</span>
        break;
      case "receiverZip":
        return <span>{receivingInfo.receiverZip}</span>
        break;
      case "companyName":
        return <span>{receivingInfo.companyName}</span>
        break;
      case "receiverAddress":
        return <span>
          {receivingInfo.receiverState + receivingInfo.receiverCity + receivingInfo.receiverDistrict + receivingInfo.receiverAddress}
        </span>
        break;
    }
  }

  render() {
    const {receivingInfo} = this.props;
    if (!receivingInfo)return null;
    return <Row>
      {
        config.map((item, i) => {
          return <Col key={i} span="12">
            <div className={classes.orderInfo}>
              <label>{item.label}</label>{this._showTitle(item.name, receivingInfo)}
            </div>
          </Col>
        })
      }
    </Row>
  }
}

export default Receiving;
