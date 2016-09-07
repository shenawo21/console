import React, {Component, PropTypes} from 'react';
import Form from 'components/Form';
import {Row, Col, Button, Icon, DatePicker} from 'hen';
//是否成功
const ISSUCC = {
  true: "成功",
  false: "失败"
};
class Manual extends Component {

  _getFormItems() {
    let context = this, config = {};
    const {shopList} = context.props;
    config = {
      formItems: [{
        label: "选择店铺：",
        name: "shopId",
        select: {
          placeholder: "请选择所属店铺",
          optionValue: shopList
        }
      }, {
        label: "按订单编号：",
        name: "tId",
        wrapperCol: {span: 5},
        input: {}
      }, {
        label: "按日期查询：",
        labelCol: {span: 2},
        wrapperCol: {span: 19},
        custom(getCustomFieldProps, FormContext){
          return <div>
            <Col span="3">
              <DatePicker format="yyyy-MM-dd HH:mm:ss" {...getCustomFieldProps('synStartTime') } showTime={true}/>
            </Col>
            <Col span="2">
              <p className="ant-form-split">~</p>
            </Col>
            <Col span="3">
              <DatePicker format="yyyy-MM-dd HH:mm:ss"  {...getCustomFieldProps('synEndTime') } showTime={true}/>
            </Col>
          </div>
        }
      }],
      initValue: {
        shopId: null,
        tId: null,
        synStartTime: null,
        synEndTime: null
      }
    }
    return config;
  }

  _sFormItems() {
    let config = {}, context = this;
    config.panels = [
      {
        title: '同步结果',
        className: '',
        formItems: [
          {
            label: "是否成功：",
            custom(getCustomFieldProps) {
              return <label className="ant-checkbox-inline">
                <span name="isSuccess">ISSUCC[getCustomFieldProps('isSuccess').value]</span>
              </label>
            }
          }, {
            label: "同步订单数量：",
            custom(getCustomFieldProps) {
              return <label className="ant-checkbox-inline">
                <span name="synOrderNum">{getCustomFieldProps('synOrderNum').value}</span>
              </label>
            }
          }, {
            label: "返回信息：",
            custom(getCustomFieldProps) {
              return <label className="ant-checkbox-inline">
                <span name="returnInfo">{getCustomFieldProps('returnInfo').value}</span>
              </label>
            }
          }
        ]
      }
    ];
    config.initValue = {
      isSuccess: null,
      synOrderNum: null,
      returnInfo: null
    };
    return config;
  }

  render() {
    const {formOptions, ...other, isVisible} = this.props;
    const buttonOptionNone = {
      buttons: [
        {
          key: 'save',
          type: 'primary',
          name: '开始同步'
        },
        {
          key: 'clear',
          name: '重置'
        }
      ]
    }
    const buttonOptionBack = {
      buttons: [
        {
          key: 'back',
          name: '返回',
          handle(){
            history.go(-1);
          }
        }
      ]
    }
    return (
      <div>
        <Form horizontal items={this._getFormItems()} buttonOption={buttonOptionNone}
              onSubmit={formOptions.handleSubmit}
              onReset={formOptions.handleReset}/>
        <div style={{display:isVisible?'':'none'}}>
          <Form horizontal items={this._sFormItems()} buttonOption={buttonOptionBack}
                onSubmit={formOptions.handleSubmit}
                onReset={formOptions.handleReset}/>
        </div>
      </div>
    )
  }
}

Manual.propTypes = {
  loading: React.PropTypes.bool,
  params: React.PropTypes.object
}

export default Manual;
