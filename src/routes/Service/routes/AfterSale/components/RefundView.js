import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import ReturnMoney from './ReturnMoney'
import ReturnGoods from './ReturnGoods'


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
                    <TabPane tab="订单退款" key="1"><ReturnMoney formOptions={formOptions} {...other} /></TabPane>
                    <TabPane tab="退换货" key="2"><ReturnGoods formOptions={formOptions} {...other} /></TabPane>
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
