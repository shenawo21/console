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

class Docs extends Component {

    /**
     * (form表单生成配置)
     * 
     * @returns (description)
     */
    _getFormItems() {
        let config = {};
        config.panels = [
            {
                title: 'panels1',
                className: 'aa',
                formItems: [{
                    label: "文本input：",
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
                    label: "邮箱email：",
                    name: "email",
                    required: true,
                    hasFeedback: true,
                    rules: [{ required: true, type: 'email', message: '请输入正确的邮箱地址' }],
                    input: {
                        type: "email",
                        placeholder: "请输入订单号",
                        disabled : false,
                    }
                }, {
                    label: "支付方式：",
                    name: "paymentType",
                    rules: [{ required: false, type: 'array', message: '不能为空' }],
                    select: {
                        optionValue: PAYMENTTYPE,
                        searchPlaceholder: "标签模式",
                        //disabled : false,
                        tags: true
                    }
                }]
            },
            {
                title: 'panels2',
                className: '',
                formItems: [{
                    label: "单选框：",
                    name: "curRadio",
                    required: true,
                    rules: [{ required: true }],
                    radio: {
                        radioValue: [
                            { value: "0", title: 'A' },
                            { value: "1", title: 'B' },
                            { value: "2", title: 'C' },
                            { value: "3", title: 'D' }
                        ]
                    }
                }, {
                        label: "选择日期：",
                        name: "time",
                        rules: [
                            { required: true, type: 'date', message: '请选择日期' },
                            {
                                validator(rule, value, callback) {
                                    console.log(rule, new Date(value).getTime(), callback);
                                    callback();
                                }
                            }
                        ],
                        datepicker: {
                            disabled : false,
                            format: "yyyy-MM-dd HH:mm:ss",
                            showTime: true
                        }
                    }, {
                        label: "数字：",
                        name: "inputName",
                        rules: [
                            { required: true, type: 'number' },
                            {
                                validator(rule, value, callback) {
                                    if (value < 2 || value > 5) {
                                        callback(new Error('请输入2~5之间值!'));
                                    } else {
                                        callback();
                                    }
                                }
                            }
                        ],
                        inputNumber: {

                        }
                    }, {
                        label: "文本域：",
                        name: "textarea",
                        required: true,
                        rules: [{ required: true, message: '不打算写点什么吗' }],
                        input: {
                            type: "textarea",
                            placeholder: "随便写"
                        }
                    }, {
                        label: "Checkbox：",
                        name: "checkbox",
                        required: true,
                        rules: [{ type: 'boolean', required: true, message: 'I do!' }],
                        checkbox: {
                            //disabled : false,
                        }
                    }, { // 目前不支持校验
                        label: "选择多个日期：",
                        labelCol: { span: 2 },
                        wrapperCol: { span: 8 },
                        custom(getCustomFieldProps, FormContext) {
                            return <div>
                                <Col span="8">
                                    <DatePicker format="yyyy-MM-dd HH:mm:ss" {...getCustomFieldProps('textbeginDate') } showTime={true} />
                                </Col>
                                <Col span="1">
                                    <p className="ant-form-split">-</p>
                                </Col>
                                <Col span="8">
                                    <DatePicker format="yyyy-MM-dd HH:mm:ss"  {...getCustomFieldProps('textendDate') } showTime={true}/>
                                </Col>
                            </div>
                        }
                    }, {
                        label: "姓名：",
                        custom(getCustomFieldProps) {
                            return <label className="ant-checkbox-inline">
                                <span name="userName">{getCustomFieldProps('userName').value}</span>
                            </label>
                        }
                    }
                ]
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
                <Form horizontal items={this._getFormItems() } onSubmit={handleSubmit} allDisabled />
            </div>
        );
    }

}

Docs.propsTypes = {
}

export default Docs;

