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
        const {item} = this.props;

        config.formItems = [
            {
                label: '用户名称:',
                name: "username",
                input: {
                    disabled : 'disabled' 
                }
            },
            {
                label: '用户电子邮箱:',
                name: "user_email",
                rules: [{ required: true, type: 'email', message: '请输入正确的邮箱地址' }],
                input: {}
            },
            {
                label: '真实姓名:',
                name: "true_name",
                rules: [
                    { required: false,  message: '至少为4个字符' }
                ],
                input: {}
            },
            {
                label: '密码:',
                name: "passwd",
                rules: [
                    { required: true, min: 6, message: '至少为6个字符' }
                ],
                input: { type:'password'}
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
                    { required: false }
                ],
                input: {}
            },
            {
                label: '阿里旺旺:',
                name: "aliwangwang_account",
                rules: [
                    { required: false }
                ],
                input: {}
            },
            {
                label: '是否允许举报:',
                name: "inform_allow",
                radio: {
                    radioValue: [
                        { value: "1", title: '可以' },
                        { value: "2", title: '不可以' }
                    ],
                }
            },
            {
                label: '是否有购买权限:',
                name: "is_buy",
                radio: {
                    radioValue: [
                        { value: "1", title: '开启' },
                        { value: "0", title: '关闭' }
                    ],
                }
            },
            {
                label: '是否有发表评论权限:',
                name: "is_allowtalk",
                radio: {
                    radioValue: [
                        { value: "1", title: '开启' },
                        { value: "0", title: '关闭' }
                    ],
                }
            },
            {
                label: '是否锁定登录:',
                name: "is_lock",
                radio: {
                    radioValue: [
                        { value: "1", title: '锁定' },
                        { value: "0", title: '未锁定' }
                    ],
                }
            },
            {
                label: '积分:',
                name: "user_integral",
                rules: [
                    { required: false,  message: '至少为4个字符' }
                ],
                input: {}
            }
        ];

        

        if(item){
            config.initValue = item;
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