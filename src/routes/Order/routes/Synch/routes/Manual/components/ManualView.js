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
        infoLabel: <div style={{color:'#ccc'}}>电商平台各自订单编号规则要求：淘宝是14位数字，京东是10位数字</div>,
        wrapperCol: {span: 5},
        input: {}
      }, {
        label: "按日期查询：",
        span: '11',
        labelCol: { span: 4 },
        wrapperCol: { span: 19 },
        custom(getCustomFieldProps, FormContext){
          return <div>
                    <DatePicker format="yyyy-MM-dd HH:mm:ss" {...getCustomFieldProps('startSynTime') } showTime={true}/>
                    <span className="ant-form-split">~</span>
                    <DatePicker format="yyyy-MM-dd HH:mm:ss"  {...getCustomFieldProps('endSynTime') } showTime={true}/>
                </div>
        }
      }],
      initValue: {
        shopId: null,
        tId: null,
        startSynTime: null,
        endSynTime: null
      }
    }
    return config;
  }

  _sFormItems() {
    let config = {}, context = this;
    const {item} = context.props;
    config.panels = [
      {
        title: '同步结果',
        className: '',
        formItems: [
          {
            label: "是否成功：",
            custom(getCustomFieldProps) {
              return <label className="ant-checkbox-inline">
                <span style={{color:item.isSuccess?'#0C3':'#F00'}}
                      name="isSuccess">{'同步'+ISSUCC[getCustomFieldProps('isSuccess').value]+'！'}</span>
              </label>
            }
          }, {
            label: "同步订单数量：",
            custom(getCustomFieldProps) {
              return <label className="ant-checkbox-inline">
                <span name="num">{getCustomFieldProps('num').value}</span>
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
      num: null,
      returnInfo: null
    };
    if (item) {
      config.initValue = item
    }
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
          key: 'reset',
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


