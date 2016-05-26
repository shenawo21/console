import React, {Component, PropTypes} from 'react';

import {Link} from 'react-router';

import { Button, Row, Col, Input, InputNumber, DatePicker, message, Checkbox} from 'hen';
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
        const {item, enterList, formOptions, selState} = context.props;
        const {upList} = this.state;
        let upConfig = {
            listType: 'picture',
            showUploadList: true,
            onlyFile: true
        };
                
        config.formItems = [{
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
                hasFeedback: true,
                rules: [{ required: true, message: '不能为空' },{
                    validator(rule, value, callback) {
                        if(selState){
                            callback([new Error('该企业已有管理员账号不能重复创建')]);
                        }else{
                            callback();
                        }
                    }
                }],
                select: {
                    placeholder: "请选择企业",
                    onSelect: formOptions.handleChange,
                    optionValue: enterList
                }
            }, {
                label: "密码：",
                name: "password",
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
                //hasFeedback: true,
                rules: [{ required: true, message: '不能为空' }],
                select: {
                    placeholder: "请选择性别",
                    optionValue: SEX
                }
            }, {
                label: "是否可用：",
                name: "enabled",
                hasFeedback: true,
                rules: [{ required: true, message: '不能为空' }],
                select: {
                    placeholder: "请选择是否可用",
                    optionValue: STATUS
                }
            }, {
                label: "邮箱：",
                name: "email",
                hasFeedback: true,
                rules: [{ required: false, type: "email", message: '请输入正确的邮箱地址' }],
                input: {
                    placeholder: "请输入邮箱",
                }
            }, {
                label: "手机号码：",
                name: "mobile",
                hasFeedback: true,
                rules: [{ required: false, message: '请输入正确的手机号码' }],
                input: {
                    type: "text",
                    placeholder: "请输入手机号码",
                }
        }];
        
        config.initValue = {
            account: null,
            enterpriseCode: null,
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
            config.formItems.splice(2, 1);       
        }
        
        return config;
    }

    render() {
        const {formOptions, item, ...other} = this.props;
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

