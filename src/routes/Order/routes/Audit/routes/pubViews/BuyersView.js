import React, {Component, PropTypes} from 'react';
import classes from './style.less'
import {Row,Col} from 'hen';

//买家信息title配置
const config = [
  {label:"买家昵称：", name:"buyerNick"},
  {label:"联系电话：", name:"receiverPhone"},
  {label:"买家留言信息：", name:"buyerMessage"},
  {label:"买家备注：", name:"buyerMemo"}
]
class Buyers extends Component {
  /**
   * name
   * @param name
   * @param buyersInfo
   * @returns {XML}
   * @private
   */
  _showTitle(name,buyersInfo){
    switch(name){
      case "buyerNick":
        return <span>{buyersInfo.buyerNick}</span>
        break;
      case "receiverPhone":
        return <span>{buyersInfo.receiverPhone}</span>
        break;
      case "buyerMessage":
        return <span>{buyersInfo.buyerMessage}</span>
        break;
      case "buyerMemo":
        return <span>{buyersInfo.buyerMemo}</span>
        break;
    }
  }
  render() {
    const {buyersInfo} = this.props;
    if(!buyersInfo)return null;
    return <Row>
      {
        config.map((item, i) => {
          return <Col key={i} span="12">
            <div className={classes.orderInfo}>
              <label>{item.label}</label>{this._showTitle(item.name,buyersInfo)}
            </div>
          </Col>
        })
      }
    </Row>
  }
}

export default Buyers;


