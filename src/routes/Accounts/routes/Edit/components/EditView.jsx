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
                    label: "微链号：",
                    name: "text",
                    required: true,
                    hasFeedback: true,
                    rules: [
                        { required: true, min: 4, message: '至少为4个字符' },
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
                        placeholder: "请输入suneee",
                    }
                }, {
                    label: "帐号：",
                    name: "email",
                    required: true,
                    hasFeedback: true,
                    rules: [{ required: true, type: 'email', message: '请输入正确的邮箱地址' }],
                    input: {
                        type: "email",
                        placeholder: "请输入订单号",
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

