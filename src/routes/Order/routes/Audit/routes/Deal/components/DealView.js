import React, {Component, PropTypes} from 'react';
import {Collapse, Tabs, Button, Cascader} from 'hen';
import Form from 'components/Form';
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

const Panel = Collapse.Panel;
const TabPane = Tabs.TabPane;

class Deal extends Component {

  _getFormItems() {
    let config = {}, context = this;
    const {params, cList, addrResult, item} = context.props;
    config.panels = [
      {
        title: '修改物流信息',
        className: '',
        formItems: [{
          label: "选择省市区：",
          name: "receiverAddr",
          required: true,
          rules: [{required: true, type: 'array', message: '请选择省市区'}],
          cascader: {
            options: addrResult,
            placeholder: "请选择省市区",
            changeOnSelect: false
          }
        }, {
          label: "详细地址：",
          name: "receiverAddress",
          span: '24',
          labelCol: {span: 2},
          wrapperCol: {span: 13},
          hasFeedback: true,
          rules: [{required: true, message: '请输入详细地址'}],
          input: {
            type: 'text',
            placeholder: "请输入详细地址"
          }
        }, {
          label: "收件人：",
          name: "receiverName",
          span: '8',
          labelCol: {span: 6},
          wrapperCol: {span: 10},
          hasFeedback: true,
          rules: [{required: true, message: '请输入详细地址'}],
          input: {
            type: 'text',
            placeholder: "请输入收件人姓名"
          }
        }, {
          label: "邮政编码：",
          name: "receiverZip",
          span: '12',
          labelCol: {span: 4},
          wrapperCol: {span: 10},
          hasFeedback: true,
          rules: [{required: true, message: '请输入邮政编码'}],
          input: {
            type: 'text',
            placeholder: "请输入邮政编码"
          }
        }, {
          label: "手机号码：",
          name: "receiverMobile",
          span: '8',
          labelCol: {span: 6},
          wrapperCol: {span: 10},
          hasFeedback: true,
          rules: [{required: true, message: '请输入手机号码'}],
          input: {
            type: 'text',
            placeholder: "请输入手机号码"
          }
        }, {
          label: "固定电话：",
          span: '12',
          labelCol: {span: 4},
          wrapperCol: {span: 10},
          name: "receiverPhone",
          input: {
            type: 'text',
            placeholder: "请输入固定电话"
          }
        }, {
          label: "变更快递公司：",
          name: "companyCode",
          span: '12',
          labelCol: {span: 4},
          select: {
            optionValue: cList
          }
        }]
      }];
    config.initValue = {
      receiverAddr: null,
      receiverAddress: null,
      receiverName: null,
      receiverZip: null,
      receiverMobile: null,
      receiverPhone: null,
      companyCode: null
    };
    if (item) {
      config.initValue = item
      if (item.receiverState && item.receiverCity && item.receiverDistrict) {
        const addr=[];
        addr.push(item.receiverState,item.receiverCity,item.receiverDistrict);
        config.initValue.receiverAddr = addr;
      }
    }
    return config;
  }

  _getNoteItems() {
    const {item} = this.props;
    let config = {
      formItems: [{
        label: "客服备注：",
        name: "remark",
        wrapperCol: {span: 10},
        input: {
          type: "textarea",
          rows: 5,
          placeholder: "请输入备注信息",
        }
      }],
      initValue: {
        remark: null
      }
    }
    if(item){
      config.initValue = item
    }
    return config;
  }

  editLogsic() {
    const {edited} = this.props;
    edited()
  }

  render() {
    const {formOptions, noteOptions,isShow,result, item, ...other} = this.props;
    const buttonOption = {
      buttons: [
        {
          key: 'submit',
          name: '提交发货',
          type: 'primary'
        },
        {
          key: 'delay',
          name: '延迟发货',
          type: 'primary'
        },
        {
          key: 'again',
          name: '重新理单',
          type: 'primary'
        },
        {
          key: 'unlock',
          name: '解锁',
          type: 'primary'
        }
      ]
    }
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
                <div style={{ position: 'absolute',top: 0,right: 0 }}>
                  <Button type="ghost" onClick={this.editLogsic.bind(this)}>
                    修改物流信息
                  </Button>
                </div>
                <div style={{display: isShow?'':'none'}}>
                  <Form horizontal items={this._getFormItems()} onSubmit={formOptions.handleSubmit}
                        onReset={formOptions.handleReset}/>
                </div>
              </TabPane>
              <TabPane tab="订单处理记录" key="5">
                <LogView LogInfo={result}/>
              </TabPane>
            </Tabs>
          </Panel>
        </Collapse>
        <div style={{ marginTop: 16 }}>
          <Form horizontal items={this._getNoteItems()} onSubmit={noteOptions.handleSubmit} buttonOption={buttonOption}
                onReset={noteOptions.handleReset}/>
        </div>
      </div>
    )
  }
}

Deal.propTypes = {
  loading: React.PropTypes.bool,
  params: React.PropTypes.object
}

export default Deal;







