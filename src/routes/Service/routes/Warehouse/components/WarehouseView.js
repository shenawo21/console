import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import ForCheck from './ForCheck'
import Checked from './Checked'

import {Tabs } from 'hen';
const TabPane = Tabs.TabPane;

class refund extends Component {
    callback(key) {
        const {isStatus} = this.props;
        isStatus(key); 
    }

    render() {
        const {formOptions, quickOptions, isStatus, ...other} = this.props;        
        return (
            <div>
                <Tabs defaultActiveKey="1" onChange={this.callback.bind(this)}>
                    <TabPane tab="待验收" key="1"><ForCheck formOptions={formOptions} {...other} /></TabPane>
                    <TabPane tab="已验收" key="2"><Checked formOptions={formOptions} {...other} /></TabPane>
                </Tabs>

            </div>
        )
    }
}


refund.propTypes = {

    //dataSource : React.PropTypes.array.isRequired,
    //action : React.PropTypes.func.isRequired,

    //loading : React.PropTypes.bool,
    //params : React.PropTypes.object
}


export default refund;
