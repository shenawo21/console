import React from 'react'
import DuckImage from '../assets/Duck.jpg'
import classes from './HomeView.less'
import { Icon, Table } from 'hen'

export const HomeView = () => (
  <div>
    <div className={classes.prief + ' ' + classes.pannel}>
      <dl>
        <dd><img src="" width="245" height="130"/></dd>
        <dt>
          <h2>企业名称：象翌微链有限公司</h2>
          <ul>
            <li><span>套餐：</span>第三方电商渠道运营版</li>
            <li><span>有效期：</span>2016年7月27日</li>
            <li><span>登录帐号：</span>admin</li>
            <li><span>帐号角色：</span>企业管理员</li>
            <li><span>最后登录时间：</span>2016.4.31 14:29</li>
          </ul>
        </dt>
      </dl>
      <span className={classes.edit}><Icon type="edit" /></span>
    </div>
    <div className={classes.wrap}>
      <div className={classes.left}>
        <ul className={classes.tips + ' ' + classes.pannel}>
          <li>店铺2</li>
          <li>商品2</li>
          <li>订单2</li>
          <li>成交金额2</li>
        </ul>
        <div className={classes.todo + ' ' + classes.pannel}>
          <h3>店铺及商品管理提示</h3>
          <p>店铺信息及代办事项</p>
        </div>
      </div>
      <div className={classes.right + ' ' + classes.pannel}>
        <div className={classes.ranking}>
          <h3>单品销售排名</h3>
        </div>
      </div>
    </div>
  </div>
)

export default HomeView
