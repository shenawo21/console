import React, {Component, PropTypes} from 'react';

import Form from 'components/Form';

class storageMgt extends Component {

    constructor(){
        super();
        this.state = {
            
        }
    }

    /**
     * (form表单生成配置)
     *
     * @returns (description)
     */
    _getFormItems() {
        let config = {}, context = this;
        const {item, formOptions} = context.props;
        config.formItems = [{
                label: "入库类型：",
                name: "account",
                required: true,
                hasFeedback: true,
                rules: [{ required: true, max: 64, message: '最多为64个字符' }],
                input: {
                    type: 'text',
                    disabled: true,
                    placeholder: "请输入帐号",
                }
            }, {
                label: "入库说明：",
                name: "textarea",
                required: true,
                rules: [{ required: true, message: '不打算写点什么吗' }],
                input: {
                    type: "textarea",
                    placeholder: "随便写"
                }
            }, {
                label: "待入库商品信息：",
                name: "password",
                button: {
                    placeholder: "请输入密码",
                }
            }];

        config.initValue = {
            account: null,
            textarea: null,
            password: null
        };
        
        if (item) {    
            config.initValue = item;            
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

storageMgt.proptype = {

loading: React.PropTypes.bool,
params: React.PropTypes.object

}

export default storageMgt;

