import React, {Component, PropTypes} from 'react';
import { Button, Row, Col, Input, Tree, InputNumber, DatePicker, message, Checkbox} from 'hen';
import Form from 'components/Form';
import {Link} from 'react-router';

class Edit extends Component {
    
    
    /**
     * (form表单生成配置)
     * 
     * @returns (description)
     */
    _getFormItems() {
        let config = {}, context = this;
        const {item} = context.props;  

        config.panels = [
            {
                title: '角色基本信息',
                className: 'noborder',
                formItems: [{
                    label: "名称：",
                    name: "account",
                    required: true,
                    hasFeedback: true,
                    rules: [{ required: true, max: 64, message: '最多为64个字符' }],
                    input: {
                        type: 'text',
                        placeholder: "请输入名称",
                    }
                }, {
                    label: "编码：",
                    name: "code",
                    required: true,
                    hasFeedback: true,
                    rules: [
                        { required: true, min: 3, message: '至少为3个字符' }
                    ],
                    input: {
                        type: "text",
                        placeholder: "请输入编码",
                    }
                }]
            }, {
                title: '权限分配',
                className: 'noborder',
                formItems: [ {
                        label: "权限分配：",
                        name: "permissionGroup",
                        required: true,
                        rules: [{required: false, type: 'array'}],
                        //rules: [{ type: 'boolean', required: true, message: 'I do!' }],
                        checkboxGroup: {
                            options:[
                                { label: '苹果', value: 'Apple' },
                                { label: '梨', value: 'Pear' },
                                { label: '橘', value: 'Orange' },
                            ]
                            //disabled : false,
                        }
                    }]
            }];

        config.initValue = {
            account: null,
            password: null,
            permissionGroup: []
        };

        return config;
    }

    render() {
        const {formOptions, item, btnOption, ...other} = this.props;
        return (
            <div>
                <Form horizontal items={this._getFormItems()} onSubmit={formOptions.handleSubmit} 
                    onRest={formOptions.handleReset} btnOption={item && item.adminId ? btnOption : ''}
                    allDisable={item && item.adminId ? true : false}/>
                    
            </div>
        );
    }

}

Edit.proptype = {

loading: React.PropTypes.bool,
params: React.PropTypes.object

}

export default Edit;

