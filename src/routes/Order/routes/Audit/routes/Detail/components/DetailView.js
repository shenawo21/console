import React, {Component, PropTypes} from 'react';

//基本信息
import BasicView from '../../pubViews/BasicView';
//买家信息
import BuyersView from '../../pubViews/BuyersView';
//收货信息
import ReceivingView from '../../pubViews/ReceivingView';
//发票要求
import InvoiceView from '../../pubViews/InvoiceView';

import { Collapse } from 'hen';
const Panel = Collapse.Panel;
class Detail extends Component {

    render() {
        const {formOptions, ...other} = this.props;

        return (
          <Collapse defaultActiveKey={['1']}>
            <Panel header="基本信息" key="1">
              <BasicView />
            </Panel>
            <Panel header="买家信息" key="2">
              <BuyersView />
            </Panel>
            <Panel header="收货信息" key="3">
              <ReceivingView />
            </Panel>
            <Panel header="发票要求" key="4">
              <InvoiceView />
            </Panel>
            <Panel header="其他信息" key="5">
              <p>敬请期待！！！</p>
            </Panel>
          </Collapse>
        )
    }
}


Detail.propTypes = {

    loading : React.PropTypes.bool,
    params : React.PropTypes.object
}


export default Detail;
