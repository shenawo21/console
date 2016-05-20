import React, {Component, PropTypes} from 'react';
import { Button, Row, Col, Input, Tree, InputNumber, DatePicker, message, Checkbox} from 'hen';
import Form from 'components/Form';
import {Link} from 'react-router';
const TreeNode = Tree.TreeNode;

class Edit extends Component {
    
    /**
	 * 生成树形
	 */
	// _renderTree() {
	// 	let key = 1;
	// 	/**
	// 	 * tree
	// 	 * @param  {any} children
	// 	 */
	// 	let tree = (children) => {

	// 		return children.map((c, index) => {
	// 			key++;
	// 			return <TreeNode title={c.name} category={c}  key={key}>
	// 				{

	// 					c.children ? tree(c.children) : ''
	// 				}
	// 			</TreeNode>
	// 		})
	// 	}

	// 	return tree(this.state.category)

	// }
    
    
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
                }]
            }];

        config.initValue = {
            account: null,
            password: null
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
                    
                {/*<Tree onSelect={this._handleSelect} defaultExpandAll={false}>{this._renderTree() }</Tree>*/}
            </div>
        );
    }

}

Edit.proptype = {

loading: React.PropTypes.bool,
params: React.PropTypes.object

}

export default Edit;

