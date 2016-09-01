import React, {Component, PropTypes} from 'react';

import Form from 'components/Form';
const PAYMENTTYPE = [
  {value: 1, title: "京东"},
  {value: 2, title: "财付通"},
  {value: 3, title: "快钱支付"},
  {value: 4, title: "微信支付"}
];
const address = [{
  value: 'zhejiang',
  label: '浙江',
  children: [{
    value: 'hangzhou',
    label: '杭州',
    children: [{
      value: 'xihu',
      label: '西湖',
    }],
  }],
}, {
  value: 'jiangsu',
  label: '江苏',
  children: [{
    value: 'nanjing',
    label: '南京',
    children: [{
      value: 'zhonghuamen',
      label: '中华门',
    }],
  }],
}];
class Add extends Component {

  _getFormItems() {
    let config = {}, context = this;
    config.panels = [
      {
        title: '订单基本信息：',
        className: '',
        formItems: [{
          label: "订单标题信息：",
          name: "title",
          span: '24',
          labelCol: {span: 2},
          wrapperCol: {span: 13},
          required: true,
          rules: [{required: true, message: ''}],
          input: {
            placeholder: "请输入订单标题",
          }
        }, {
          label: "所属店铺：",
          name: "shopId",
          rules: [{required: false, type: 'string', message: '所属店铺不能为空'}],
          select: {
            optionValue: PAYMENTTYPE
          }
        }, {
          label: "买家昵称：",
          name: "buyerNick",
          required: true,
          rules: [{required: true, message: ''}],
          input: {
            placeholder: "请输入买家昵称",
          }
        }]
      },
      {
        title: '订单信息处理',
        className: '',
        formItems: [{
          label: "发票要求：",
          name: "invoiceKind",
          required: true,
          radio: {
            radioValue: [
              {value: "0", title: '不要发票'},
              {value: "1", title: '要发票'}
            ],
          }
        }, {
          label: "省市区：",
          required: true,
          name: 'receiverState',
          rules: [{required: true, type: 'array', message: '请选择地址'}],
          cascader: {
            options: address,
            placeholder: "请选择地区",
            changeOnSelect: false
          }
        }, {
          label: "详细地址：",
          name: "receiverAddress",
          span: '24',
          labelCol: {span: 2},
          wrapperCol: {span: 13},
          required: true,
          rules: [{required: true, message: ''}],
          input: {
            placeholder: "请输入详细地址",
          }
        }, {
          label: "收件人：",
          name: "receiverName",
          span: '8',
          labelCol: {span: 6},
          wrapperCol: {span: 13},
          required: true,
          rules: [{required: true, message: ''}],
          input: {
            placeholder: "请输入收件人姓名",
          }
        }, {
          label: "手机号：",
          name: "receiverMobile",
          span: '8',
          labelCol: {span: 6},
          wrapperCol: {span: 13},
          required: true,
          rules: [{required: true, message: ''}],
          input: {
            placeholder: "请输入手机号",
          }
        }, {
          label: "固定电话：",
          name: "receiverPhone",
          span: '8',
          labelCol: {span: 6},
          wrapperCol: {span: 13},
          required: true,
          rules: [{required: true, message: ''}],
          input: {
            placeholder: "请输入固定电话",
          }
        }, {
          label: "快递公司：",
          name: "companyName",
          required: true,
          rules: [{required: true, type: 'string', message: '快递公司不能为空'}],
          select: {
            optionValue: PAYMENTTYPE
          }
        }, {
          label: "邮政编码：",
          name: "receiverZip",
          required: true,
          rules: [{required: true, message: ''}],
          input: {
            placeholder: "请输入邮政编码",
          }
        }, {
          label: "备注信息：",
          name: "buyerMemo",
          required: true,
          rules: [{required: true, message: ''}],
          input: {
            placeholder: "请输入备注信息",
          }
        }]
      }];

    config.initValue = {
      title: null,
      shopId: null,
      invoiceKind: null,
      receiverAddress: null,
      receiverState: null,
      receiverName: null,
      receiverMobile: null,
      receiverPhone: null,
      receiverZip: null,
      companyName: null,
      buyerMemo: null,
    };
    return config;
  }

  render() {
    const {formOptions, ...other} = this.props;
    const buttonOption = {
      buttons: [
        {
          key: 'commit',
          name: '确认无误，提交自动发货',
          type: 'primary',
        },
        {
          key: 'reset',
          name: '重置'
        }
      ]
    }
    return (
      <div>
        <Form horizontal items={this._getFormItems()} onSubmit={formOptions.handleSubmit}
              onReset={formOptions.handleReset} buttonOption={buttonOption}/>
      </div>
    )
  }
}

Add.propTypes = {
  loading: React.PropTypes.bool,
  params: React.PropTypes.object
}

export default Add;

