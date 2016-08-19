import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';


import Form from 'components/Form';


class Manual extends Component {
    
    _getFormItems(){
        let config = {
            formItems: [{
                label: "标题名1",
                name: "name1",
                input: {}
            },{
                label: "标题名2",
                name: "name2",
                select: {}
            }],
            initValue: {
                name1: null,
                name2 : null
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


Manual.propTypes = {
    
    loading : React.PropTypes.bool,
    params : React.PropTypes.object
}


export default Manual;
