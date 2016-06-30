import React, {Component, PropTypes} from 'react';

import {UploadImage} from 'components/FileLoader'
import Form from 'components/Form';

//性别
const SEX = [
    {title : '女', value : false},
    {title : '男', value : true}
];
//帐号是否可用
const STATUS = [
    {title : '不可用', value : false},
    {title : '可用', value : true}
];

class Edit extends Component {

    constructor(){
        super();
        this.state = {
            photoList : []
        }
    }

    /**
     * (form表单生成配置)
     *
     * @returns (description)
     */
    _getFormItems() {
        let config = {}, context = this;
        const {item, formOptions, roleList, photoImg, photoList} = context.props;
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
                    disabled: (item != null && item.adminId) ? true : false,
                    placeholder: "请输入帐号",
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
                    upConfig.fileList = photoList || [];
                    return <UploadImage title="选择头像" className='upload-list-inline upload-fixed'
                                upConfig={{...upConfig, onChangeFileList:photoImg}}
                        {...getCustomFieldProps('photo')} />
                }
            }, {
                label: "性别：",
                name: "sex",
                rules: [{ required: true, message: '请选择性别' }],
                select: {
                    placeholder: '请选择性别',
                    optionValue: SEX
                }
            }, {
                label: "是否可用：",
                name: "enabled",
                rules: [{ required: true, message: '请选择是否可用' }],
                select: {
                    placeholder: '请选择是否可用',
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
        },{
            label: "角色",
            name: "roleIdList",
            labelCol: { span: 3 },
            wrapperCol: { span: 8 },
            rules: [{required: false, type: 'array'}],
            checkboxGroup: {
                options: roleList
            }
        }];

        config.initValue = {
            account: null,
            password: null,
            name: null,
            photo: null,
            sex: false,
            enabled: true,
            email: null,
            mobile: null,
            roleIdList: []
        };

        // if(roleList.length){
        //     console.log(roleList,'roleList');
        //     config.formItems.push({
        //         label: "角色",
        //         name: "roleIdList",
        //         labelCol: { span: 3 },
        //         wrapperCol: { span: 8 },
        //         rules: [{required: false, type: 'array'}],
        //         checkboxGroup: {
        //             options: roleList
        //         }
        //     })
        // }
        
        if (item) {    
            config.initValue = item;            
        }
        
        if(item != null && item.adminId){
            config.formItems.splice(1, 1);
        }
        
        

        return config;
    }

    render() {
        const {formOptions, item, ...other} = this.props;
        return (
            <div>
                <Form horizontal items={this._getFormItems()} onSubmit={formOptions.handleSubmit}
                    onRest={formOptions.handleReset} />
            </div>
        );
    }

}

Edit.proptype = {

loading: React.PropTypes.bool,
params: React.PropTypes.object

}

export default Edit;
