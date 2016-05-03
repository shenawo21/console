
import React, { Component, PropTypes } from 'react';
import { Form, Input, Button, Checkbox, Radio, Row, Col, Tooltip, Icon } from 'hen';
import './Login.less';
const FormItem = Form.Item;
const createForm = Form.create

const logo = require('../assets/logo-small.png');

function noop() {
    return false;
}

class Login extends Component{
  
    doReset(e){
      const {form, handleReset} = this.props;
      handleReset(e,form);
    }
    
    doSubmit(e){
      const {form, handleSubmit} = this.props;
      handleSubmit(e,form)
    }
    
    render(){
      const {form, isLoading, doSubmit, doReset} = this.props;
      const { getFieldProps, getFieldError, isFieldValidating } = form;
      let namePropsOptions = {
        rules: [
          { required: true, min: 5, message: '用户名至少为 5 个字符' }
        ]
      }
      let passwdPropsOptions = {
        rules: [
          { required: true, min: 5, whitespace: true, message: '请填写密码' }
        ]
      };
      // 正式的时候此代码会被干掉
      if (__DEV__) {
        namePropsOptions.initialValue = '1394800667@qq.com'
        passwdPropsOptions.initialValue = '123456'
      }

      const nameProps = getFieldProps('account', namePropsOptions);

      const passwdProps = getFieldProps('password', passwdPropsOptions);

      const formItemLayout = {
        //labelCol: { span: 7 },
        //wrapperCol: { span: 12 },
      };

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
            
            
            <div className="form-group">
            <Form horizontal form={form} ref='login'>
              <FormItem
                {...formItemLayout}
                label="邮箱："
                prefixCls='form-control'
                hasFeedback>
                <Input {...nameProps} />
              </FormItem>

              <FormItem
                {...formItemLayout}
                label="密码："
                prefixCls='form-control'
                hasFeedback>
                <Input {...passwdProps} type="password" autoComplete="off"
                  onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop} />
              </FormItem>
              <FormItem wrapperCol={{ span: 12, offset: 7 }}
                label="记住密码：">
                 <div className="checkbox-custom checkbox-inline checkbox-primary pull-left">
                     <Checkbox type="checkbox" id="remember" name="checkbox" />
                 </div>
              </FormItem>
                
              <FormItem wrapperCol={{ span: 12, offset: 7 }}>
                <Button type="primary" loading={isLoading} onClick={this.doSubmit.bind(this)}>确定</Button>
                &nbsp;&nbsp;&nbsp;
                <Button type="ghost" onClick={this.doReset.bind(this)}>重置</Button>
              </FormItem>
              <FormItem wrapperCol={{ span: 12, offset: 7 }}>
                <a className="pull-right" href="forgot-password">忘记密码？</a>
              </FormItem>
            </Form>
            </div>
            
            
            <p>还没注册?<a href="/register">立即注册</a></p>
            <footer className="page-copyright">
              <p>WEBSITE BY SUNEEE</p>
              <p>© 2016. All RIGHT RESERVED.</p>

            </footer>

          </div>
        </div>
      </div>
      </div>
    }
    
  }
  
export default createForm()(Login);
