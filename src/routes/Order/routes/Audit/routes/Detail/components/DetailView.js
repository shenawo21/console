import React, {Component, PropTypes} from 'react';
//基本信息
import BasicView from '../../pubViews/BasicView';
//买家信息
import BuyersView from '../../pubViews/BuyersView';
//收货信息
import ReceivingView from '../../pubViews/ReceivingView';
//发票要求
import InvoiceView from '../../pubViews/InvoiceView';
//商品明细
import ProductView from '../../pubViews/ProductView';
//支付详情
import PayView from '../../pubViews/PayView';
//促销信息
import PromView from '../../pubViews/PromView';
//订单处理记录
import LogView from '../../pubViews/LogView';
import {Collapse, Tabs, Button} from 'hen';

const Panel = Collapse.Panel;
const TabPane = Tabs.TabPane;
class Detail extends Component {
  goBack() {
    history.go(-1);
  }

  render() {
    const {item} = this.props;
    return (
      <div>
        <Collapse defaultActiveKey={['5']}>
          <Panel header="基本信息" key="1">
            <BasicView basicInfo={item}/>
          </Panel>
          <Panel header="买家信息" key="2">
            <BuyersView buyersInfo={item}/>
          </Panel>
          <Panel header="收货信息" key="3">
            <ReceivingView receivingInfo={item}/>
          </Panel>
          <Panel header="发票要求" key="4">
            <InvoiceView invoiceInfo={item}/>
          </Panel>
          <Panel header="其他信息" key="5">
            <Tabs defaultActiveKey="1">
              <TabPane tab="商品明细" key="1">
                <ProductView productInfo={item}/>
              </TabPane>
              <TabPane tab="支付详情" key="2">
                <PayView payInfo={item}/>
              </TabPane>
              <TabPane tab="促销信息" key="3">
                <PromView promInfo={item}/>
              </TabPane>
              <TabPane tab="物流快递" key="4">
                <ReceivingView receivingInfo={item}/>
              </TabPane>
              <TabPane tab="订单处理记录" key="5">
                <LogView LogInfo={item}/>
              </TabPane>
            </Tabs>
          </Panel>
        </Collapse>
        <div style={{ marginTop: 16 }}>
          <Button type="ghost" onClick={this.goBack.bind(this)}>
            关闭
          </Button>
        </div>
      </div>)
  }
}


Detail.propTypes = {
  loading: React.PropTypes.bool,
  params: React.PropTypes.object
}


export default Detail;
