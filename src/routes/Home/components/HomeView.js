import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {Row, Col, Badge} from 'hen';
import Image from 'components/Image';
import classes from './HomeView.less';
import store from 'store2';
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
    /**
     * 控制台权限控制，临时解决方案，只是临时的。。。
     * @type {null}
     */
    let applicPermis = null,
      shopPermis = null,
      auditPermis = null,
      sendPermis = null,
      servicePermis = null;
    if (store('USER')) {
      store('USER').menuList && store('USER').menuList.map((m)=> {
        if (m.name == '应用管理') {
          applicPermis = m.name
        }
        if (m.name == '店铺仓库管理') {
          shopPermis = m.name
        }
        if (m.name == '售后服务') {
          servicePermis = m.name
        }
        if (m.name == '订单管理') {
          m.children && m.children.map((n)=> {
            if (n.name == '审单') {
              auditPermis = n.name
            }
            if (n.name == '打单发货') {
              sendPermis = n.name
            }
          })
        }
      })
    }
    return (
      <div>
        <header>
          <Row>
            <Col span="6"><Image src={item.logo} width="245" height="130"/></Col>
            <Col span="18">
              <dl>
                <dt>企业名称：{item.enterpriseName}</dt>
                <dd>
                  登陆账号：{item.name}
                </dd>
                <dd>
                  账号角色：{item.roleName}
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
                  <Badge count={item.toBeButtShop} overflowCount={99} className={classes.exbadge}
                         style={{top:'0px',right: '-10px'}}>
                    <Link to={'/applic'} className={classes.headExample}
                          disabled={applicPermis =='应用管理' ? false : true}>
                      待店铺对接
                    </Link>
                  </Badge>
                </Col>
                <Col span="12">
                  <Badge count={item.compairsNum} overflowCount={99} className={classes.exbadge}
                         style={{top:'0px',right: '-10px'}}>
                    <Link to={'/shophouse'} className={classes.headExample}
                          disabled={shopPermis =='店铺仓库管理' ? false : true}>
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
                  <Badge count={item.dealWithOrder} overflowCount={99} className={classes.exbadge}
                         style={{top:'0px',right: '-10px'}}>
                    <Link to={'/order/audit'} className={classes.headExample}
                          disabled={auditPermis =='审单' ? false : true}>
                      待处理订单
                    </Link>
                  </Badge>
                </Col>
                <Col span="12">
                  <Badge count={item.toSendOrderNum} overflowCount={99} className={classes.exbadge}
                         style={{top:'0px',right: '-10px'}}>
                    <Link to={'/order/invoice'} className={classes.headExample}
                          disabled={sendPermis =='打单发货' ? false : true}>
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
                  <Badge count={item.toReimburse} overflowCount={99} className={classes.exbadge}
                         style={{top:'0px',right: '-10px'}}>
                    <Link to={'/service/aftersale'} className={classes.headExample}
                          disabled={servicePermis =='售后服务' ? false : true}>
                      订单待退款
                    </Link>
                  </Badge>
                </Col>
                <Col span="4">
                  <Badge count={item.toReturnSales} overflowCount={99} className={classes.exbadge}
                         style={{top:'0px',right: '-10px'}}>
                    <Link to={'/service/aftersale'} className={classes.headExample}
                          disabled={servicePermis =='售后服务' ? false : true}>
                      待退货
                    </Link>
                  </Badge>
                </Col>
                <Col span="4">
                  <Badge count={item.toExchange} overflowCount={99} className={classes.exbadge}
                         style={{top:'0px',right: '-10px'}}>
                    <Link to={'/service/warehouse'} className={classes.headExample}
                          disabled={servicePermis =='售后服务' ? false : true}>
                      待换货出库
                    </Link>
                  </Badge>
                </Col>
                <Col span="4">
                  <Badge count={item.toEndOfSales} overflowCount={99} className={classes.exbadge}
                         style={{top:'0px',right: '-10px'}}>
                    <Link to={'/service/aftersale'} className={classes.headExample}
                          disabled={servicePermis =='售后服务' ? false : true}>
                      待结束退货
                    </Link>
                  </Badge>
                </Col>
                <Col span="5">
                  <Badge count={item.toFinancialRefund} overflowCount={99} className={classes.exbadge}
                         style={{top:'0px',right: '-10px'}}>
                    <Link to={'/service/aftersale'} className={classes.headExample}
                          disabled={servicePermis =='售后服务' ? false : true}>
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
