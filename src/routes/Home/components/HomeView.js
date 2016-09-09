import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {Row, Col, Badge} from 'hen';
import Image from 'components/Image';
import classes from './HomeView.less'
class Home extends Component {
  /*
   //企业
   private String logo;//企业logo
   private String enterpriseName;//企业名称
   private String packageName; //套餐名称
   private Date validityDate;  //有效期
   private String name;        //账号名称
   private String roleName;    //角色名称
   private Date lastLoginDate; //最后登录时间
   private Integer shopNum;    //店铺数量
   private Integer spuNum;     //商品数量'
   private Integer tradesNum;  //订单数量
   private Integer transactionAmount;//成交金额
   private Integer toBeButtShop;//待对接店铺
   private Integer compairsNum;//待比对商品
   private Integer dealWithOrder;//待处理订单
   private Integer toSendOrderNum;//待发货订单

   //界面没有的
   private Integer toReimburse;//订单待退款
   private Integer toReturnSales;//待退货
   private Integer toExchange;//待换货出库
   private Integer toEndOfSales;//待结束退货
   private Integer toFinancialRefund;//待通知财务退款
   */

  render() {
    const {item} = this.props;
    return (
      <div>
        <header>
          <Row>
            <Col span="4"><Image src={item.logo} width="245" height="130" /></Col>
            <Col span="20">
              <dl>
                <dt>企业名称：{item.enterpriseName}</dt>
                <dd>
                  <Row>
                    <Col span="5">套餐：{item.packageName}</Col>
                    <Col span="5">有效期：{item.validityDate}</Col>
                  </Row>
                </dd>
                <dd>
                  <Row>
                    <Col span="5">登陆账号: {item.name}</Col>
                    <Col span="5">账号角色：{item.roleName}</Col>
                    <Col span="5">最后登录时间: {item.lastLoginDate}</Col>
                  </Row>
                </dd>
              </dl>
            </Col>
          </Row>
        </header>
        <Row>
          <Col span="12">
            <section style={{marginRight:'20px'}}>
              <Row>
                <Col span="6">
                  <div className={classes.subItem}>
                    <h3>店铺</h3>
                    <p>{item.shopNum}</p>
                  </div>
                </Col>
                <Col span="6">
                  <div className={classes.subItem}>
                    <h3>商品</h3>
                    <p>{item.spuNum}</p>
                  </div>
                </Col>
                <Col span="6">
                  <div className={classes.subItem}>
                    <h3>订单</h3>
                    <p>{item.tradesNum}</p>
                  </div>
                </Col>
                <Col span="6">
                  <div className={classes.subItem}>
                    <h3>成交金额</h3>
                    <p>{item.transactionAmount}</p>
                  </div>
                </Col>
              </Row>
            </section>
          </Col>
          <Col span="12">
            <section>
              <div className={classes.title}>
                <h3>店铺及商品管理提示</h3>
                <p>店铺信息及待办事项</p>
              </div>
              <Row>
                <Col span="12">
                  <Badge count={item.toBeButtShop} className={classes.exbadge} style={{top:'0px',right: '-10px'}}>
                    <Link to={'/applic'} className={classes.headExample}>
                      待店铺对接
                    </Link>
                  </Badge>
                </Col>
                <Col span="12">
                  <Badge count={item.compairsNum} className={classes.exbadge} style={{top:'0px',right: '-10px'}}>
                    <Link to={'/shophouse'} className={classes.headExample}>
                      待对比商品
                    </Link>
                  </Badge>
                </Col>
              </Row>
            </section>
          </Col>
          <Col span="12">
            <section style={{marginRight:'20px'}}>
              <div className={classes.title}>
                <h3>订单和交易提示</h3>
                <p>您需要立即处理的订单和交易事项</p>
              </div>
              <Row>
                <Col span="12">
                  <Badge count={item.dealWithOrder} className={classes.exbadge} style={{top:'0px',right: '-10px'}}>
                    <Link to={'/order/audit'} className={classes.headExample}>
                      待处理订单
                    </Link>
                  </Badge>
                </Col>
                <Col span="12">
                  <Badge count={item.toSendOrderNum} className={classes.exbadge} style={{top:'0px',right: '-10px'}}>
                    <Link to={'/order/invoice'} className={classes.headExample}>
                      待发货订单
                    </Link>
                  </Badge>
                </Col>
              </Row>
            </section>
          </Col>
          <Col span="12">
            <section>
              <div className={classes.title}>
                <h3>售后服务提示</h3>
                <p>您需要立即处理的订单售后事项</p>
              </div>
              <Row>
                <Col span="4">
                  <Badge count={item.toReimburse} className={classes.exbadge} style={{top:'0px',right: '-10px'}}>
                    <Link to={'/service/aftersale'} className={classes.headExample}>
                      订单待退款
                    </Link>
                  </Badge>
                </Col>
                <Col span="4">
                  <Badge count={item.toReturnSales} className={classes.exbadge} style={{top:'0px',right: '-10px'}}>
                    <Link to={'/service/aftersale'} className={classes.headExample}>
                      待退货
                    </Link>
                  </Badge>
                </Col>
                <Col span="4">
                  <Badge count={item.toExchange} className={classes.exbadge} style={{top:'0px',right: '-10px'}}>
                    <Link to={'/service/warehouse'} className={classes.headExample}>
                      待换货出库
                    </Link>
                  </Badge>
                </Col>
                <Col span="4">
                  <Badge count={item.toEndOfSales} className={classes.exbadge} style={{top:'0px',right: '-10px'}}>
                    <Link to={'/service/history'} className={classes.headExample}>
                      待结束退货
                    </Link>
                  </Badge>
                </Col>
                <Col span="5">
                  <Badge count={item.toFinancialRefund} className={classes.exbadge} style={{top:'0px',right: '-10px'}}>
                    <Link to={'/service/history'} className={classes.headExample}>
                      待通知财务退款
                    </Link>
                  </Badge>
                </Col>
              </Row>
            </section>
          </Col>
        </Row>
      </div>
    )
  }
}

Home.propTypes = {
  loading: React.PropTypes.bool,
  params: React.PropTypes.object
}

export default Home;
