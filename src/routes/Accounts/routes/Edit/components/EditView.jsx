import React, {Component, PropTypes} from 'react';

import {Link} from 'react-router';
import { Button, Row, Col, Input, InputNumber, DatePicker, message, Checkbox} from 'hen';

import Form from 'components/Form';

const PAYMENTTYPE = [
    { value: "ALIPAY", title: "支付宝" },
    { value: "TENPAY", title: "财付通" },
    { value: "KUANQIAN", title: "快钱支付" },
    { value: "WEIXIN", title: "微信支付" }
];
const ENABLE = [
    { value: "0", title: "不可用" },
    { value: "1", title: "可用" }
];

class Edit extends Component {

    /**
     * (form表单生成配置)
     * 
     * @returns (description)
     */
    _getFormItems() {
        let config = {};
        config.panels = [
            {
                className: 'noborder',
                formItems: [{
                    label: "帐号：",
                    name: "account",
                    required: true,
                    hasFeedback: true,
                    rules: [
                        { required: true, max: 64, message: '至少为64个字符' },
                        {
                            validator(rule, value, callback) {
                                if (!value) {
                                    callback();
                                } else {
                                    setTimeout(function () {
                                        if (value === 'suneee') {
                                            callback([new Error('抱歉，该用户名已被占用。')]);
                                        } else {
                                            callback();
                                        }
                                    }, 800);
                                }
                            }
                        }
                    ],
                    input: {
                        placeholder: "请输入帐号",
                    }
                }, {
                    label: "密码：",
                    name: "password",
                    required: true,
                    hasFeedback: true,
                    rules: [
                        { required: true, min: 4, message: '至少为4个字符' }
                    ],
                    input: {
                        placeholder: "请输入密码",
                    }
                }, {
                    label: "用户姓名：",
                    name: "name",
                    required: true,
                    hasFeedback: true,
                    rules: [
                        { required: true, max: 32, message: '最多为32个字符' }
                    ],
                    input: {
                        placeholder: "请输入用户姓名",
                    }
                }, {
                    label: "昵称：",
                    name: "nick",
                    required: true,
                    hasFeedback: true,
                    rules: [
                        { required: true, min: 12, message: '至少为12个字符' }
                    ],
                    input: {
                        placeholder: "请输入昵称",
                    }
                }, {
                    label: "头像：",
                    name: "photo",
                    required: true,
                    hasFeedback: true,
                    rules: [{ required: true, type: 'email', message: '请输入背景图像' }],
                    input: {
                        type: "email",
                        placeholder: "请输入背景图像",
                    }
                }, {
                    label: "是否可用：",
                    name: "nick",
                    rules: [{ required: false, type: 'array', message: '不能为空' }],
                    select: {
                        optionValue: ENABLE,
                        searchPlaceholder: "是否可用",
                        tags: true
                    }
                }, {
                    label: "邮箱：",
                    name: "email",
                    required: true,
                    hasFeedback: true,
                    rules: [{ required: true, type: 'email', message: '请输入正确的邮箱地址' }],
                    input: {
                        type: "email",
                        placeholder: "请输入邮箱",
                    }
                }, {
                    label: "手机号码：",
                    name: "mobile",
                    required: true,
                    hasFeedback: true,
                    rules: [{ required: true, type: 'email', message: '请输入正确的邮箱地址' }],
                    input: {
                        type: "email",
                        placeholder: "请输入手机号码",
                    }
                }, {
                    label: "地址：",
                    name: "address",
                    required: true,
                    hasFeedback: true,
                    rules: [{ required: true, type: 'email', message: '请输入正确的邮箱地址' }],
                    input: {
                        type: "email",
                        placeholder: "请输入地址",
                    }
                }, {
                    label: "个人签名：",
                    name: "signature",
                    required: true,
                    hasFeedback: true,
                    rules: [{ required: true, type: 'email', message: '请输入个人签名' }],
                    input: {
                        type: "email",
                        placeholder: "请输入个人签名",
                    }
                }, {
                    label: "背景图像：",
                    name: "backgroundImg",
                    required: true,
                    hasFeedback: true,
                    rules: [{ required: true, type: 'email', message: '请输入背景图像' }],
                    input: {
                        type: "email",
                        placeholder: "请输入背景图像",
                    }
                }, {
                    label: "注册时间：",
                    name: "rgisterTime",
                    required: true,
                    hasFeedback: true,
                    rules: [{ required: true, type: 'email', message: '请输入正确的邮箱地址' }],
                    input: {
                        type: "email",
                        placeholder: "请输入注册时间",
                    }
                }, {
                    label: "最后修改时间：",
                    name: "lastUpdateTime",
                    required: true,
                    hasFeedback: true,
                    rules: [{ required: true, type: 'email', message: '请输入正确的邮箱地址' }],
                    input: {
                        type: "email",
                        placeholder: "请输入最后修改时间",
                    }
                }, {
                    label: "支付方式：",
                    name: "paymentType",
                    rules: [{ required: false, type: 'array', message: '不能为空' }],
                    select: {
                        optionValue: PAYMENTTYPE,
                        searchPlaceholder: "标签模式",
                        tags: true
                    }
                }]
            }];

        config.initValue = {
            text: null,
            email: null,
            textarea: null,
            paymentType: undefined,
            curRadio: null,
            checkbox: false,
            time: null,
            inputName: 0,
            textbeginDate: null,
            textendDate: null,
            userName: 'test'
        };

        return config;
    }

    render() {
        const {handleSubmit} = this.props;
        return (
            <div>
                <Form horizontal items={this._getFormItems()} onSubmit={handleSubmit} />
            </div>
        );
    }

}

Edit.proptype = {

}

export default Edit;

