import React, {Component, PropTypes} from 'react';
import {Collapse, Tabs, Button, Table, InputNumber} from 'hen';
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
class Apart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: []
    }
  }

  _getFormItems() {
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
    return config;
  }

  _getColumns() {
    const context = this;
    const {item}=context.props;
    let columns = [{
      title: '商品编码',
      dataIndex: 'outerSkuId',
    }, {
      title: '商品名称',
      dataIndex: 'title'
    }, {
      title: '市场价',
      dataIndex: 'price'
    }, {
      title: '销售价',
      dataIndex: 'salePrice'
    }, {
      title: '数量',
      dataIndex: 'num'
    }, {
      title: '总金额',
      dataIndex: 'payment'
    }, {
      title: '已拆单数量',
      dataIndex: 'splitNum'
    }, {
      title: '发货数量',
      dataIndex: 'quantity',
      render(value, row){
        /**
         * 如果是天猫店的话不可以修改
         */
        return <InputNumber name='quantity' disabled={item.channelCode == 'TMALL' ? true : false} onChange={(e) => {
                    item && item.tradesOrderList.forEach((val,index)=>{
                    if(row.outerSkuId==val.outerSkuId){
                      item.tradesOrderList[index].quantity = e.target.value
                    }
                })
                context.setState({
                  item
                })
                }}/>
      },
      width: 100
    }/*, {
     title: '发货商品金额',
     dataIndex: '',
     render(row){
     return <span>{row.salePrice * row.quantity}</span>
     }
     }*/];
    return columns;
  }

  render() {
    const context = this;
    const {formOptions, handleRowSelection, item, ...other} = context.props;
    const buttonOption = {
      buttons: [
        {
          name: '拆单发货',
          type: 'primary',
          key: 'ok'
        },
        {
          name: '返回',
          type: 'ghost',
          key: 'no'
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
          <Panel header="商品拆分" key="5">
            <Table bordered={true} dataSource={item.tradesOrderList} rowSelection={handleRowSelection}
                   rowKey={record => record.orderId}
                   columns={this._getColumns()} pagination={false}/>
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


Apart.propTypes = {

  loading: React.PropTypes.bool,
  params: React.PropTypes.object
}


export default Apart;
