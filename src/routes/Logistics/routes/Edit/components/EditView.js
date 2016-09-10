import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

import Form from 'components/Form';

class Edit extends Component {
    
    _getFormItems(){
        const {item} = this.props;
        let config = {
            formItems: [{
                label: "物流公司名称：",
                name: "companyName",
                required: true,
                hasFeedback: true,
                rules: [
                    {required: true, max:50, message: '物流公司名称长度>=50'},
                ],
                input: {
                    placeholder: '请输入物流公司名称'
                }
            },{
                label: "联系电话：",
                name: "tel",
                required: true,
                hasFeedback: true,
                rules: [
                    {required: true, max:11, message: '请输入固话或者手机号码'},
                ],
                input: {
                    placeholder: '请输入联系电话'
                }
            },{
                label: "联系人：",
                name: "",
                input: {
                    placeholder: '请输入联系人'
                }
            },{
                label: "备注信息：",
                name: "remark",
                input: {
                    type: "textarea",
                    placeholder: "请输入备注信息"
                }
            }],
            initValue: {
                companyName: null,
                tel: null,
                ren: null,                
                remark: null
            }
        }
        if(item){
            config.initValue = item
        }
        return config;
    }
    
    render() {
        const {formOptions, ...other} = this.props;
        
        return (
            <div>
                <Form horizontal  items={this._getFormItems()} onSubmit={formOptions.handleSubmit} onReset={formOptions.handleReset} />
            </div>
        )
    }
}


Edit.propTypes = {    
    loading : React.PropTypes.bool,
    params : React.PropTypes.object
}

export default Edit;
