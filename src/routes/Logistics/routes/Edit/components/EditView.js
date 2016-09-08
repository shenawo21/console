import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';


import Form from 'components/Form';


class Edit extends Component {
    
    _getFormItems(){
        let config = {
            formItems: [{
                label: "物流公司名称",
                name: "",
                input: {}
            },{
                label: "联系电话",
                name: "",
                select: {}
            },{
                label: "联系人",
                name: "",
                select: {}
            },{
                label: "备注",
                name: "",
                select: {}
            }],
            initValue: {
                
            }
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
