import React, {Component, PropTypes} from 'react';
import {Collapse, Tabs, Button,Table} from 'hen';
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
      title: '发货数量',
      dataIndex: 'quantity',
      render(value){
        return <Input placeholder="发货数量" name='quantity' onChange={(e) => {
                    context.setState({
                        quantity: e.target.value
                    })
                    /**
                    * 如果是天猫店的话不可以修改
                    */
                }} defaultValue={value}/>
      },
      width: 100
    }, {
      title: '发货商品金额',
      dataIndex: '',
      render(row){
        return <span>{row.salePrice*row.quantity}</span>
      }
    }];
    return columns;
  }

  render() {
    const context = this;
    const {formOptions, handleRowSelection,...other} = context.props;
    const skuList = [];
    const buttonOption = {
      buttons: [
        {
          name: '拆单发货',
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
            <Table bordered={true} rowSelection={handleRowSelection} columns={this._getColumns()} />
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
