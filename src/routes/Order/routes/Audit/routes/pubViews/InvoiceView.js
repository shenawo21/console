import React, {Component, PropTypes} from 'react';
import classes from './style.less'
import {Row, Col} from 'hen';
//交易来源
const KIND = {
  '1': "电子发票",
  '2': "纸质发票"
};
//收货信息title配置
const config = [
  {label: "发票抬头：", name: "invoiceName"},
  {label: "开票类型：", name: "invoiceType"},
  {label: "发票类型：", name: "invoiceKind"}
]
class Invoice extends Component {
  /**
   * name
   * @param name
   * @param productOrder
   * @returns {XML}
   * @private
   */
  _showTitle(name, productOrder) {
    switch (name) {
      case "invoiceName":
        return <span>{productOrder.invoiceName}</span>
        break;
      case "invoiceType":
        return <span>{productOrder.invoiceType}</span>
        break;
      case "invoiceKind":
        return <span>{KIND[productOrder.invoiceKind]}</span>
        break;
    }
  }

  render() {
    //const {productOrder} = this.props;
    //if(!productOrder)return null;
    const productOrder = {
      invoiceName: '个人',
      invoiceType: '办公用品',
      invoiceKind: '2',
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

export default Invoice;
