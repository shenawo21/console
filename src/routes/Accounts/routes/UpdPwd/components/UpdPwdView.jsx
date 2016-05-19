import React, {Component, PropTypes} from 'react';

import {Link} from 'react-router';
import { Button, Row, Col, Input, InputNumber, message, Checkbox} from 'hen';

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
        const {upList} = this.state;
        let config = {}, context = this;
        let upConfig = {
            listType: 'picture',
            showUploadList: true,
            onlyFile: true
        };
        config.panels = [
            {
                className: 'noborder',
                formItems: [{
                    label: "帐号：",
                    name: "account",
                    required: true,
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
                        { required: true, min: 4, message: '至少为4个字符' }
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
                        { required: true, min: 4, message: '至少为4个字符' }
                    ],
                    input: {
                        type: "password",
                        placeholder: "请输入新密码",
                    }
                }]
            }];

        config.initValue = {
            account: null,
            password: null,
            newPassword: null
        };

        return config;
    }

    render() {
        const {formOptions, ...other} = this.props;
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

