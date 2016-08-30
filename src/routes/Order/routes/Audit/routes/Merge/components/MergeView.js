import React, {Component, PropTypes} from 'react';
import {Collapse, Tabs, Button, Table} from 'hen';
import Form from 'components/Form';

//基本信息
import BasicView from '../../pubViews/BasicView';
//买家信息
import BuyersView from '../../pubViews/BuyersView';
//收货信息
import ReceivingView from '../../pubViews/ReceivingView';
//发票要求
import InvoiceView from '../../pubViews/InvoiceView';

const Panel = Collapse.Panel;
class Merge extends Component {

  _getFormItems() {
    let config = {
      formItems: [{
        label: "客服备注：",
        name: "remark",
        wrapperCol: {span: 10},
        hasFeedback: true,
        rules: [{required: true, message: '请输入备注信息'}],
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
    return config;
  }
  _getColumns() {
    const context = this;
    let columns = [{
      title: '商品编码',
      dataIndex: 'channelSku',
    }, {
      title: '商品名称',
      dataIndex: 'spuName'
    }, {
      title: '淘宝销售价',
      dataIndex: 'salePrice'
    }, {
      title: '数量',
      dataIndex: 'num'
    }, {
      title: '促销ID',
      dataIndex: 'promotionId'
    }, {
      title: '促销名称',
      dataIndex: 'promotionName'
    }, {
      title: '行金额',
      dataIndex: 'payment'
    }];
    return columns;
  }

  render() {
    const {formOptions, ...other} = this.props;
    const proList = [
      {
        title:'111111111111',
        skuList:[{
          channelSku:'45646',
          spuName:'45646',
          salePrice:'45646',
          num:'45646',
          promotionId:'45646',
          promotionName:'45646',
          payment:'45646'
        },{
          channelSku:'45646',
          spuName:'45646',
          salePrice:'45646',
          num:'45646',
          promotionId:'45646',
          promotionName:'45646',
          payment:'45646'
        }]
      },{
        title:'111111111111',
        skuList:[{
          channelSku:'45646',
          spuName:'45646',
          salePrice:'45646',
          num:'45646',
          promotionId:'45646',
          promotionName:'45646',
          payment:'45646'
        },{
          channelSku:'45646',
          spuName:'45646',
          salePrice:'45646',
          num:'45646',
          promotionId:'45646',
          promotionName:'45646',
          payment:'45646'
        }]
      }
    ];
    const buttonOption = {
      buttons: [
        {
          name: '合并发货',
          type: 'primary'
        },
        {
          name: '返回',
          type: 'ghost'
        }
      ]
    }
    return (
      <div>
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
          <Panel header="商品拆分" key="5">
            {
              proList.map(s => {
                return <div style={{marginBottom:'15'}}>
                  <h3 style={{color:'#FF6633',fontSize:'14',fontWeight:'bold',marginBottom:'10'}}>订单编号：{s.title}</h3>
                  <Table dataSource={s.skuList} columns={this._getColumns()} pagination={false} bordered/>
                </div>
              })
            }

          </Panel>
        </Collapse>
        <div style={{ marginTop: 16 }}>
          <Form horizontal items={this._getFormItems()} onSubmit={formOptions.handleSubmit} buttonOption={buttonOption}
                onReset={formOptions.handleReset}/>
        </div>
      </div>
    )
  }
}

Merge.propTypes = {

  loading: React.PropTypes.bool,
  params: React.PropTypes.object
}

export default Merge;
