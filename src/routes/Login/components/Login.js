
import React, { Component, PropTypes } from 'react';
import { Form, Input, Button, Checkbox, Radio, Row, Col, Tooltip, Icon } from 'hen';
import './Login.less';
const FormItem = Form.Item;
const logo = require('../assets/logo-small.png');

export default ({login})=> {
  return <div className="page-login-v2 layout-full page-dark">
      <div className="page animsition" data-animsition-in="fade-in" data-animsition-out="fade-out">
        <div className="page-content">
          <div className="page-brand-info">
            <div className="brand">
              <img className="brand-img" src={logo} alt="..." />
              <h2 className="brand-text font-size-40">翌商云</h2>
            </div>
            <p className="font-size-20">翌商云是对为满足满足翌商前端及未来规则的后台需求，翌商云平台项目是针对企业电商化的为主要导向，帮助企业实现企业互联化的目的。</p>
          </div>
          <div className="page-login-main">
            <div className="brand visible-xs">
              <img className="brand-img" src={logo} alt="..." />
              <h3 className="brand-text font-size-40">Hen</h3>
            </div>
            <h3 className="font-size-24">登陆</h3>
            <p>欢迎登陆翌商云平台</p>
            <form method="post" action="">
              <div className="form-group">
                <label className="sr-only" htmlFor="inputEmail">Email</label>
                <input type="email" className="form-control" id="inputEmail" name="email" placeholder="Email" />
              </div>
              <div className="form-group">
                <label className="sr-only" htmlFor="inputPassword">Password</label>
                <input type="password" className="form-control" id="inputPassword" name="password" placeholder="Password" />
              </div>
              <div className="form-group clearfix">
                <div className="checkbox-custom checkbox-inline checkbox-primary pull-left">
                  <input type="checkbox" id="remember" name="checkbox" />
                  <label htmlFor="inputCheckbox">记住密码</label>
                </div>
                <a className="pull-right" href="forgot-password.html">忘记密码？</a>
              </div>
              <button type="button" onClick={login} className="btn btn-primary btn-block">登陆</button>
            </form>

            <p>还没注册?<a href="">立即注册</a></p>
            <footer className="page-copyright">
              <p>WEBSITE BY SUNEEE</p>
              <p>© 2016. All RIGHT RESERVED.</p>

            </footer>

          </div>
        </div>
      </div>

    </div>
}
