import React, {Component, PropTypes} from 'react';
import Form from 'components/Form';
import {Link} from 'react-router';
import {Alert, Switch, Radio} from 'hen';



class Manage extends Component {

    constructor(props) {
        super(props)

        this.state = {
            show_store_name: 0
        }
    }


    _gitFormItems() {
        let config = {};
        let context = this;


        config.formItems = [
            {
                label: '用户名称:',
                name: "username",
                rules: [
                    { required: true, min: 2, message: '至少为2个字符' }
                ],
                input: {}
            },
            {
                label: '用户密码:',
                name: "passwd",
                rules: [
                    { required: true, min: 6, message: '至少为6个字符' }
                ],
                input: {
                    type: "password"
                }
            },
            {
                label: '用户电子邮箱:',
                name: "user_email",
                rules: [{ required: true, type: 'email', message: '请输入正确的邮箱地址' }],
                input: {}
            },
            {
                label: '手机号:',
                name: "user_mobile",
                rules: [
                    { required: true, message: '手机号不能为空' },
                    {
                        validator: function (rule, value, callback) {
                            if (!value) {
                                callback();
                            } else {
                                if (!/^1[34578][0-9]\d{8}$/g.test(value)) {
                                    callback('请输入正确的手机号码');
                                } else {
                                    callback();
                                }
                            }
                        }
                    }
                ],
                input: {}
            },
            {
                label: '真实姓名:',
                name: "true_name",
                rules: [
                    { required: false, min: 2, message: '至少为2个字符' }
                ],
                input: {}
            },
            {
                label: '用户性别:',
                name: "user_sex",
                radio: {
                    radioValue: [
                        { value: "0", title: '女' },
                        { value: "1", title: '男' },
                        { value: "2", title: '保密' }
                    ],
                }
            },
            {
                label: '用户QQ:',
                name: "qq_account",
                rules: [
                    { required: false, min: 4, message: '至少为4个字符' }
                ],
                input: {}
            },
            {
                label: '阿里旺旺:',
                name: "aliwangwang_account",
                rules: [
                    { required: false, min: 4, message: '至少为4个字符' }
                ],
                input: {}
            }
        ];


        config.initValue = {
            username: '',
            passwd: '',
            user_email: '',
            user_mobile: '',
            true_name: '',
            user_sex: '2',
            qq_account: '',
            aliwangwang_account: ''
        }



        return config;
    }

    componentDidMount() {

    }

    render() {
        const {hedleSubmit} = this.props;
        return <Form horizontal items={this._gitFormItems() } onSubmit={hedleSubmit} buttonOption={{ cancel: false }}/>
    }
}

export default Manage