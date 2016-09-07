import React, {Component, PropTypes} from 'react';
import classes from './style.less'
import {Row, Col} from 'hen';
//发票类型
const KIND = {
  '1': "电子发票",
  '2': "纸质发票"
};
//收货信息title配置
const config = [
  {label: "发票类型：", name: "invoiceKind"},
  {label: "发票抬头：", name: "invoiceName"},
  {label: "开票类型：", name: "invoiceType"}
]
class Invoice extends Component {
  /**
   * name
   * @param name
   * @param invoiceInfo
   * @returns {XML}
   * @private
   */
  _showTitle(name, invoiceInfo) {
    switch (name) {
      case "invoiceName":
        return <span>{invoiceInfo.invoiceName ? invoiceInfo.invoiceName : '无'}</span>
        break;
      case "invoiceType":
        return <span>{invoiceInfo.invoiceType ? invoiceInfo.invoiceType : '无'}</span>
        break;
      case "invoiceKind":
        return <span>{invoiceInfo.invoiceKind ? KIND[invoiceInfo.invoiceKind] : '不需要发票'}</span>
        break;
    }
  }

  render() {
    const {invoiceInfo} = this.props;
    if (!invoiceInfo)return null;
    return <Row>
      {
        config.map((item, i) => {
          return <Col key={i} span="8">
            <div className={classes.orderInfo}>
              <label>{item.label}</label>{this._showTitle(item.name, invoiceInfo)}
            </div>
          </Col>
        })
      }
    </Row>
  }
}

export default Invoice;
