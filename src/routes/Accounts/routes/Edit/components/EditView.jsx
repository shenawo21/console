import React, {Component, PropTypes} from 'react';

import {Link} from 'react-router';
import { Button, Row, Col, Input, InputNumber, DatePicker, message, Checkbox} from 'hen';

import {UploadImage} from 'components/FileLoader'
import Form from 'components/Form';

const SEX = [
    { value: "1", title: "女" },
    { value: "2", title: "男" }
];
const STATUS = [
    { value: "0", title: "不可用" },
    { value: "1", title: "可用" }
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
                    label: "密码：",
                    name: "password",
                    required: true,
                    hasFeedback: true,
                    rules: [
                        { required: true, min: 4, message: '至少为4个字符' }
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
                    rules: [{ required: true, message: '不能为空' }],
                    select: {
                        placeholder: "请选择性别",
                        optionValue: SEX
                    }
                }, {
                    label: "是否可用：",
                    name: "enabled",
                    rules: [{ required: true, message: '不能为空' }],
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

        config.initValue = {
            account: null,
            password: null,
            name: null,
            photo: null,
            sex: undefined,
            enabled: true,
            email: null,
            mobile: null
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

