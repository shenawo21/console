import React, {Component, PropTypes} from 'react';
import {Form, Input, Button, Checkbox, Radio, Row, Col, Tooltip, Icon} from 'hen';
import './Login.less';
const FormItem = Form.Item;
const createForm = Form.create

const logo = require('../assets/logo-small.png');

function noop() {
  return false;
}

class Login extends Component {

  doReset(e) {
    const {form, handleReset} = this.props;
    handleReset(e, form);
  }

  doSubmit(e) {
    const {form, handleSubmit} = this.props;
    handleSubmit(e, form)
  }

  render() {
    const {form, vcodeUrl, vCode, isLoading} = this.props;
    const {getFieldProps, getFieldError, isFieldValidating} = form;
    let enNamePropsOptions = {
      rules: [
        {required: true, message: '请填写企业名称'}
      ]
    }
    let namePropsOptions = {
      rules: [
        {required: true, min: 5, message: '用户名至少为 5 个字符'}
      ]
    }
    let passwdPropsOptions = {
      rules: [
        {required: true, min: 3, whitespace: true, message: '请填写密码'}
      ]
    };
    let vCodeOptions = {
      rules: [
        {required: true, min: 4, whitespace: true, message: '请填写验证码'}
      ]
    };
    // 正式的时候此代码会被干掉
    if (__DEV__) {
      enNamePropsOptions.initialValue = '111'
      namePropsOptions.initialValue = 'shangwen'
      passwdPropsOptions.initialValue = '123'
    }
    
    const enNameProps = getFieldProps('enterpriseName', enNamePropsOptions);

    const nameProps = getFieldProps('account', namePropsOptions);

    const passwdProps = getFieldProps('password', passwdPropsOptions);
    
    const vCodeProps = getFieldProps('validateCode', vCodeOptions);

    const formItemLayout = {
      labelCol: {span: 5},
      wrapperCol: {span: 19},
    };
    const context = this;
    document.onkeydown = function(e){
        let eventCode = e.which || e.keyCode;
        switch(eventCode){
            case 13:
                context.doSubmit(e)
                break;
        }
    }

    return <div className="page-login-v2 layout-full page-dark">
      <div className="page animsition" data-animsition-in="fade-in" data-animsition-out="fade-out">
        <div className="page-content">
          <div className="page-brand-info">
            <div className="brand">
              <img className="brand-img" src={logo} alt="..."/>
              <h2 className="brand-text font-size-40">翌商云</h2>
            </div>
            <p className="font-size-20">翌商云是对为满足满足翌商前端及未来规则的后台需求，翌商云平台项目是针对企业电商化的为主要导向，帮助企业实现企业互联化的目的。</p>
          </div>
          <div className="page-login-main">
            <div className="brand visible-xs">
              <img className="brand-img" src={logo} alt="..."/>
              <h3 className="brand-text font-size-40">Hen</h3>
            </div>
            <h3 className="font-size-24">登录</h3>
            <p>欢迎登录翌商云平台</p>


            <div className="form-group">
              <Form horizontal form={form} ref='login'>
	      	      <FormItem
                  {...formItemLayout}
                  label="企业名："
                  hasFeedback>
                  <Input {...enNameProps} />
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="用户名："
                  hasFeedback>
                  <Input {...nameProps} />
                </FormItem>

                <FormItem
                  {...formItemLayout}
                  label="密码："
                  hasFeedback>
                  <Input {...passwdProps} type="password" autoComplete="off"
                                          onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}/>
                </FormItem>
                
                <FormItem 
                {...formItemLayout}
                  label="验证码："
                  hasFeedback style={{ marginBottom: '8px' }}>
                  <Input {...vCodeProps} style={{width: '100px'}} />
                  <a href="javascript:void(0)" onClick={vCode} > <img src={vcodeUrl} height="30"/></a>
                </FormItem>                
                
                <FormItem wrapperCol={{ span: 23, offset: 1 }}>
                  <div className="form-group">
                    <Button type="primary" className="btn btn-primary btn-block" loading={isLoading}
                            onClick={this.doSubmit.bind(this) }>确定</Button>
                  </div>
                </FormItem>

              </Form>
            </div>
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
Login.propsTypes = {
  form: React.PropTypes.object.isRequired,
  isLoading: React.PropTypes.bool.isRequired,
  handleSubmit: React.PropTypes.func.isRequired,
  handleReset: React.PropTypes.func.isRequired
}


export default createForm()(Login);
