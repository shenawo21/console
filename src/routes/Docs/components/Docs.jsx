import React, {Component, PropTypes} from 'react';

import {Link} from 'react-router';
import { Button, Row, Col, Input, InputNumber, DatePicker, message, Checkbox, Icon} from 'hen';
import {UploadImage} from 'components/FileLoader'

import Form from 'components/Form';


const PAYMENTTYPE = [
    { value: "ALIPAY", title: "支付宝" },
    { value: "TENPAY", title: "财付通" },
    { value: "KUANQIAN", title: "快钱支付" },
    { value: "WEIXIN", title: "微信支付" }
];
const address = [{
  value: 'zhejiang',
  label: '浙江',
  children: [{
    value: 'hangzhou',
    label: '杭州',
    children: [{
      value: 'xihu',
      label: '西湖',
    }],
  }],
}, {
  value: 'jiangsu',
  label: '江苏',
  children: [{
    value: 'nanjing',
    label: '南京',
    children: [{
      value: 'zhonghuamen',
      label: '中华门',
    }],
  }],
}];


class Docs extends Component {

    constructor(){
        super();
        this.state = {
            upList : ""
        }
    }
    /**
     * (form表单生成配置)
     * 
     * @returns (description)
     */
    _getFormItems() {
        const {upList} =  this.state;
        let config = {}, context = this;
        let upConfig = {
            listType: 'picture',
            showUploadList: true,
            onlyFile: true
        };
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
                        { required: false, min: 4, message: '至少为4个字符' },
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
                    rules: [{ required: false, type: 'email', message: '请输入正确的邮箱地址' }],
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
                    rules: [{required: true},
                        {
                        validator(rule, value, callback){
                            console.log(rule, value)
                            callback();
                        }
                    }],
                    infoLabel : <span><Icon type="info-circle-o" /> 暂不支持其它选项</span>,
                    radio: {
                        radioValue: [
                            { value: "0", title: 'A' },
                            { value: "1", title: 'B' },
                            { value: "2", title: 'C' },
                            { value: "3", title: 'D' }
                        ],
                    }
                }, {
                        label: "选择日期：",
                        name: "time",
                        rules: [
                            { required: false, type: 'date', message: '请选择日期' },
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
                            { required: false, type: 'number' },
                            {
                                validator(rule, value, callback) {
                                    if (value < 2 || value > 5) {
                                        callback()
                                        //callback(new Error('请输入2~5之间值!'));
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
                        rules: [{ type: 'boolean', required: true, message: '请选择方式' }],
                        checkbox: {
                            title : '打豆豆',
                            //disabled : true,
                        }
                    }, 
                    {
                        label: "CheckGroup：",
                        checkbox: {
                            //title : '打豆豆',
                            groups : [
                                {title : '打豆豆', name : 'doudou'},
                                {title : '不听话', name : 'tinghua', disabled : false}
                            ]
                        }
                    },
                    {
                        label: "cascader",
                        required : true,
                        name : 'cascader',
                        rules: [{ required: true, type: 'array', message : '请选择地址' }],
                        cascader: {
                            options : address,
                            placeholder : "请选择地区",
                            changeOnSelect : false
                        }
                    },
                    { // 目前不支持校验
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
                    },
                    {
                        label: "上传图片",
                        required : true,
                        custom(getCustomFieldProps) {
                            upConfig.fileList = upList;
                            return <UploadImage title="选择授权LOGO" className='upload-list-inline upload-fixed' upConfig={{...upConfig, onChangeFileList(files) {
                                context.setState({
                                    upList : files
                                })
                            }}} {...getCustomFieldProps('logo')} />
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
            checkbox: null,
            time: null,
            inputName: 0,
            textbeginDate: null,
            textendDate: null,
            userName: 'test',
            doudou : true,
            tinghua : null,
            cascader : null,
            logo : null
        };

        return config;
    }

    render() {
        const {handleSubmit} = this.props;
        /**
         * 多个按钮配置如下：
         * 1、需要重置按钮时，key值为reset
         * 2、需要多个提交按钮时，key为必须，且在handleSubmit函数里面，根据key值进行区分操作,
         * 3、如果不配buttons参数，按钮默认为提交与重置
         */
        const buttonOption = {
            buttons : [
                {
                    key : 'review',
                    name :'审核',
                    type : 'primary',
                    icon : 'search',
                    className : 'aaa'
                },
                {
                    key : 'back',
                    name : '返回',
                    handle(){
                        history.go(-1);
                    }
                },
                {
                    key : 'commit',
                    name : '提交',
                },
                {
                    key : 'reset',   //重置时，key为reset
                    name : '重置'
                }
            ]
        }
        return (
            <div>
                <Form horizontal items={this._getFormItems() } onSubmit={handleSubmit} buttonOption={buttonOption}/>
            </div>
        );
    }

}

Docs.proptype = {

}

export default Docs;

