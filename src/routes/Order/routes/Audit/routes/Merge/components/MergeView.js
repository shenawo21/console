import React, {Component, PropTypes} from 'react';
import {Collapse, Tabs, Button, Table} from 'hen';
import Form from 'components/Form';

//买家信息
import BuyersView from '../../pubViews/BuyersView';
//收货信息
import ReceivingView from '../../pubViews/ReceivingView';
//商品明细
import ProductView from '../../pubViews/ProductView';

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

  render() {
    const {formOptions, item, ...other} = this.props;
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
        <Collapse defaultActiveKey={['1','2','3']}>
          <Panel header="买家信息" key="1">
            <BuyersView buyersInfo={item}/>
          </Panel>
          <Panel header="收货信息" key="2">
            <ReceivingView receivingInfo={item}/>
          </Panel>
          <Panel header="商品合并（下列商品将合并到一个发货单发货）" key="3">
            {
              item.tradesOrderMap ? item.tradesOrderMap.map(s => {
                return <div style={{marginBottom:'15px'}}>
                  <h3 style={{color:'#FF6633',fontSize:'14px',fontWeight:'bold',marginBottom:'10px'}}>订单编号：{s.tid}</h3>
                  <ProductView productInfo={s}/>
                </div>
              }) : ''
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
