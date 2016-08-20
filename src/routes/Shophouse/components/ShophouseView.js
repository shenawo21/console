import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

import Shop from './Shop'
import Product from './Product'


import {Tabs } from 'hen';
const TabPane = Tabs.TabPane;

class shopprice extends Component {
	callback(key) {
	     const {isStatus} = this.props.tableOptions;
            isStatus(key);            
        }

    render() {
        const {formOptions, quickOptions, ...other} = this.props;
        
        return (
            <div>

                <Tabs defaultActiveKey="1" onChange={this.callback.bind(this)}>
                    <TabPane tab="店铺仓库" key="1"><Shop formOptions={formOptions} {...other} /></TabPane>
                    <TabPane tab="商品对比" key="2"><Product formOptions={formOptions} {...other}  /></TabPane>
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
