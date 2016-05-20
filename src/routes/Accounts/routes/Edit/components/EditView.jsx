import React, {Component, PropTypes} from 'react';
import { Button, Row, Col, Input, InputNumber, DatePicker, message, Checkbox} from 'hen';
import {Link} from 'react-router';
import {UploadImage} from 'components/FileLoader'
import Form from 'components/Form';

const SEX = [
    { value: false, title: "女" },
    { value: true, title: "男" }
];
const STATUS = [
    { value: false, title: "不可用" },
    { value: true, title: "可用" }
];

class Edit extends Component {

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
        let config = {}, context = this;
        const {item} = context.props;
        const {upList} = this.state;
        let upConfig = {
            listType: 'picture',
            showUploadList: true,
            onlyFile: true
        };

        const review = {
            title: '备注',
            className: '',
            formItems: [{
                label: "审核描述：",
                name: "reviewDesctiption",
                wrapperCol: {span: 10},
                required: true,
                hasFeedback: true,
                rules: [{required: true, message: '审核描述为必填'}],
                input: {
                disabled: false,
                rows: '5',
                type: "textarea",
                placeholder: "请输入审核描述",
                }
            }]
        }

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
                    label: "企业编码：",
                    name: "enterpriseCode",
                    required: true,
                    hasFeedback: true,
                    rules: [{ required: true, max: 64, message: '最多为64个字符' }],
                    input: {
                        type: 'text',
                        placeholder: "请输入企业编码",
                    }
                }, {
                    label: "密码：",
                    name: "password",
                    required: true,
                    hasFeedback: true,
                    rules: [
                        { required: true, min: 3, message: '至少为3个字符' }
                    ],
                    input: {
                        type: "password",
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
                    label: "头像：",
                    name: "photo",
                    required : false,
                    custom(getCustomFieldProps) {
                        upConfig.fileList = upList;
                        return <UploadImage title="选择头像" className='upload-list-inline upload-fixed' upConfig={{...upConfig, onChangeFileList(files) {
                            context.setState({
                                upList : files
                            })
                        }}} {...getCustomFieldProps('photo')} />
                    }
                }, {
                    label: "性别：",
                    name: "sex",
                    select: {
                        placeholder: "请选择性别",
                        optionValue: SEX
                    }
                }, {
                    label: "是否可用：",
                    name: "enabled",
                    //rules: [{ required: false, message: '不能为空' }],
                    select: {
                        placeholder: "请选择是否可用",
                        optionValue: STATUS
                }
                }, {
                    label: "邮箱：",
                    name: "email",
                    required: false,
                    hasFeedback: true,
                    rules: [{ required: false, type: "email", message: '请输入正确的邮箱地址' }],
                    input: {
                        placeholder: "请输入邮箱",
                    }
                }, {
                    label: "手机号码：",
                    name: "mobile",
                    required: false,
                    hasFeedback: true,
                    rules: [{ required: false, message: '请输入正确的手机号码' }],
                    input: {
                        type: "text",
                        placeholder: "请输入手机号码",
                    }
                }]
            }];
        //item && item.enterpriseCode && item.reviewStatue=='no'? config.panels.push(review) : '';
        config.initValue = {
            account: null,
            password: null,
            name: null,
            photo: null,
            sex: false,
            enabled: true,
            email: null,
            mobile: null
        };
    if (item) {
      config.initValue = item;      
    }
        return config;
    }

    render() {
        const {formOptions, item, btnOption, ...other} = this.props;
        return (
            <div>
                <Form horizontal items={this._getFormItems()} onSubmit={formOptions.handleSubmit}
                    onRest={formOptions.handleReset} allDisable={item && item.adminId ? true : false}/>
            </div>
        );
    }

}

Edit.proptype = {

loading: React.PropTypes.bool,
params: React.PropTypes.object

}

export default Edit;

