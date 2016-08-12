import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

import StorageQuery from './StorageQuery'
import OutgoQuery from './OutgoQuery'


import {Tabs } from 'hen';
const TabPane = Tabs.TabPane;

class virtualhouse extends Component {
    callback(key) {
        const {isStatus} = this.props;
        isStatus(key); 
    }

    render() {
        const {formOptions, quickOptions, isStatus, ...other} = this.props;
        console.log(2121221,other)
        
        return (
            <div>
                <Tabs defaultActiveKey="1" onChange={this.callback.bind(this)}>
                    <TabPane tab="出库单" key="1"><OutgoQuery formOptions={formOptions} {...other} /></TabPane>
                    <TabPane tab="入库单" key="2"><StorageQuery formOptions={formOptions} {...other} /></TabPane>
                </Tabs>

            </div>
        )
    }
}


virtualhouse.propTypes = {

    //dataSource : React.PropTypes.array.isRequired,
    //action : React.PropTypes.func.isRequired,

    //loading : React.PropTypes.bool,
    //params : React.PropTypes.object
}


export default virtualhouse;
