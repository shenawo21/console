import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

import StorageOdd from '../../StorageQuery/containers/StorageQuery'
import OutgoOdd from '../../OutgoQuery/containers/OutgoQuery'


import {Tabs } from 'hen';
const TabPane = Tabs.TabPane;

class virtualhouse extends Component {
    

    render() {
        const {formOptions,quickOptions, ...other} = this.props;
        function callback(key) {
            console.log(key);
        }
        return (
            <div>

                <Tabs defaultActiveKey="1" onChange={callback}>
                    <TabPane tab="出库单" key="1"><StorageOdd /></TabPane>
                    <TabPane tab="入库单" key="2"><OutgoOdd /></TabPane>
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
