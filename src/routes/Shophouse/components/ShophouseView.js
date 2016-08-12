import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

import Shop from './Shop'
import Product from './Product'


import {Tabs } from 'hen';
const TabPane = Tabs.TabPane;

class shopprice extends Component {
    

    render() {
        const {formOptions, quickOptions, isStatus, ...other} = this.props;
        
        function callback(key) {
            isStatus(key);            
        }
        return (
            <div>

                <Tabs defaultActiveKey="1" onChange={callback}>
                    <TabPane tab="店铺仓库" key="1"><Product formOptions={formOptions} {...other}  /></TabPane>
                    <TabPane tab="商品对比" key="2"><Shop formOptions={formOptions} {...other} /></TabPane>
                </Tabs>

            </div>
        )
    }
}


shopprice.propTypes = {

    //dataSource : React.PropTypes.array.isRequired,
    //action : React.PropTypes.func.isRequired,

    //loading : React.PropTypes.bool,
    //params : React.PropTypes.object
}


export default shopprice;
