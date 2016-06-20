import React, {Component, PropTypes} from 'react';

import {Link} from 'react-router';
import { Button, Input, message} from 'hen';

import Form from 'components/Form';

class Setting extends Component {
    
    constructor(){
        super();
    }

    /**
     * (form表单生成配置)
     * 
     * @returns (description)
     */
    _getFormItems() {
        const config = {}, context = this;
        const {item, user} = context.props;
        
        config.panels = [
            {
                className: 'noborder',
                formItems: [{
                    label: "帐号：",
                    name: "account",
                    required: true,
                    disabled: true,
                    hasFeedback: true,
                    rules: [{ required: true, max: 64, message: '最多为64个字符' }],
                    input: {
                        type: 'text',
                        placeholder: "请输入帐号",
                    }
                }, {
                    label: "旧密码：",
                    name: "password",
                    required: true,
                    hasFeedback: true,
                    rules: [
                        { required: true, min: 3, message: '至少为3个字符' }
                    ],
                    input: {
                        type: "password",
                        placeholder: "请输入旧密码",
                    }
                }, {
                    label: "新密码：",
                    name: "newPassword",
                    required: true,
                    hasFeedback: true,
                    rules: [
                        { required: true, min: 3, message: '至少为3个字符' }
                    ],
                    input: {
                        type: "password",
                        placeholder: "请输入新密码",
                    }
		}, {
          label: "确认密码：",
          name: "commitNewPwd",
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
            account: null,
            password: null,
            newPassword: null,
      commitNewPwd: null
        };
        config.initValue = item;
        config.initValue.account = user;

        return config;
    }

    render() {
        const {formOptions, item, ...other} = this.props;
        return (
            <div>
                <Form horizontal items={this._getFormItems()} onSubmit={formOptions.handleSubmit} 
                    onRest={formOptions.handleReset}/>
            </div>
        );
    }

}

Setting.proptype = {

loading: React.PropTypes.bool,
params: React.PropTypes.object

}

export default Setting;

