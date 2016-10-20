import React, {Component, PropTypes} from 'react';

import {UploadImage} from 'components/FileLoader'
import Form from 'components/Form';

//性别
const SEX = [
  {title: '女', value: false},
  {title: '男', value: true}
];
//帐号是否可用
const STATUS = [
  {title: '不可用', value: '0'},
  {title: '可用', value: '1'}
];

class Edit extends Component {

    constructor(props){
        super(props);
        this.state = {
            photoList : [],
            roleChecked: []
        }
    }

    componentDidMount() {
        this.setState({
            test: 1
        })
    }

    /**
     * (form表单生成配置)
     *
     * @returns (description)
     */
    _getFormItems() {
        let config = {}, context = this;
        const {item, formOptions, roleList, photoImg, photoList, result} = context.props;

        let upConfig = {
            listType: 'picture',
            showUploadList: true,
            onlyFile: true
        };

        const roleListNew = roleList.map((item) => {
            return item.label
        })

        const getChecked = () => {

            const checked = item && item.roleList && item.roleList.map((rItem) => {
                return rItem.name
            })

            return this.state.roleChecked.length ? this.state.roleChecked : (checked || [])
        }
        
        config.formItems = [{
                label: "帐号：",
                name: "account",
                required: true,
                hasFeedback: true,
                rules: [{ required: true, min: 4, max: 64, message: '帐号最少为4个字符，最多为64个字符' }],
                input: {
                    type: 'text',
                    disabled: (item != null && item.adminId) ? true : false,
                    placeholder: "请输入帐号",
                }
            }, {
                className: 'noItem'
            }, {
                label: "用户姓名：",
                name: "name",
                required: true,
                hasFeedback: true,
                rules: [
                    { required: true, min:3, max: 32, message: '3~32个字符以内' }
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
        }, {
            label: "角色：",
            name: "roleIdList",
            labelCol: { span: 2 },
            wrapperCol: { span: 8 },
            rules: [{required: false, type: 'array'}],
            checkboxGroup: {
                options: roleListNew,
                value: getChecked(),
                onChange: (value) => {
                    this.setState({
                        roleChecked: value
                    })
                }
            }
        }];

        config.initValue = {}

        const roleIdList = []
        this.state.roleChecked.forEach((cItem) => {
            roleList.forEach((item) => {
                if (item.label == cItem) {
                    roleIdList.push(item.value)
                }
            })
        })

        config.initValue.roleIdList = roleIdList
        if (item) {
            config.initValue = item; 
            
            config.initValue.roleIdList = roleIdList

        } else {
            config.formItems.splice(1, 1, {
                label: "密码：",
                name: "password",
                rules: [
                    { required: true, min: 3, message: '至少为3个字符' }
                ],
                input: {
                    type: "password",
                    placeholder: "请输入密码",
                }
            });
        }

        for (var key in config.initValue) {
            if (config.initValue[key] == null) {
                delete config.initValue[key]
            }
        }

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

Edit.proptype = {

  loading: React.PropTypes.bool,
  params: React.PropTypes.object

}

export default Edit;

