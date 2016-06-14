import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';


import Form from 'components/Form';
import classes from '../assets/pubPassword.less';


class PubPassword extends Component {

  _getFormItems() {
    const config = {}, context = this;
    const {item, user} = context.props;
    config.panels = [
      {
        className: 'noborder',
        formItems: [{
          label: "旧密码：",
          name: "password",
          labelCol: {span: 4},
          wrapperCol: {span: 12},
          required: true,
          hasFeedback: true,
          rules: [
            {required: true, min: 3, message: '至少为3个字符'}
          ],
          input: {
            type: "password",
            placeholder: "请输入旧密码",
          }
        }, {
          label: "新密码：",
          name: "newPassword",
          labelCol: {span: 4},
          wrapperCol: {span: 12},
          required: true,
          hasFeedback: true,
          rules: [
            {required: true, min: 3, message: '至少为3个字符'}
          ],
          input: {
            type: "password",
            placeholder: "请输入新密码",
          }
        }, {
          label: "确认密码：",
          name: "commitNewPwd",
          labelCol: {span: 4},
          wrapperCol: {span: 12},
          hasFeedback: true,
          required: true,
          rules(fieldForm){
            return [
              {required: true, min: 3, message: '至少为3个字符'},
              {
                validator(rule, value, callback) {
                  if (!value) {
                    callback();
                  } else {
                    if (value !== fieldForm.getFieldValue('newPassword')) {
                      callback(new Error('两次输入密码不一致！'));
                    } else {
                      callback();
                    }
                  }
                }
              }
            ]
          },
          input: {
            type: "password",
            placeholder: "请再次确认密码",
          }
        }]
      }];

    config.initValue = {
      password: null,
      newPassword: null,
      commitNewPwd: null
    };

    return config;
  }


  render() {
    const {formOptions, ...other} = this.props;

    return (
      <div className={classes.content}>
        <Form horizontal items={this._getFormItems()} onSubmit={formOptions.handleSubmit}
              onReset={formOptions.handleReset}/>
      </div>
    )
  }
}


PubPassword.propTypes = {

  loading: React.PropTypes.bool,
  params: React.PropTypes.object
}


export default PubPassword;
