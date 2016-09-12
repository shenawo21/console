import React, {Component, PropTypes} from 'react';
import Form from 'components/Form';
import {Button, Icon, Modal} from 'hen';
class Add extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    }
  }

  _getFormItems() {
    let config = {}, context = this;
    const {shopList, cList, addrResult}=context.props;
    config.panels = [
      {
        title: '订单基本信息：',
        className: '',
        formItems: [{
          label: "订单标题：",
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
          rules: [{required: true, type: 'number', message: '所属店铺不能为空'}],
          select: {
            optionValue: shopList
          }
        }, {
          label: "订单列表：",
          name: "dtos",
          rules: [{required: true, type: 'number', message: '所属店铺不能为空'}],
          custom(getCustomFieldProps) {
            return <Button type="ghost" onClick={context.showModal.bind(context)}><Icon type="search"/>选择订单商品</Button>
          }
        }]
      },
      {
        title: '订单信息处理',
        className: '',
        formItems: [{
          label: "用户昵称：",
          name: "buyerNick",
          required: true,
          rules: [{required: true, message: ''}],
          input: {
            placeholder: "请输入买家昵称",
          }
        }, {
          label: "发票类型：",
          name: "invoiceType",
          radio: {
            radioValue: [
              {value: "1", title: '电子发票'},
              {value: "2", title: '纸质发票'}
            ],
          }
        }, {
          label: "省市区：",
          required: true,
          name: 'receiverAddr',
          rules: [{required: true, type: 'array', message: '请选择省市区'}],
          cascader: {
            options: addrResult,
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
          input: {
            placeholder: "请输入固定电话",
          }
        }, {
          label: "快递公司：",
          name: "companyCode",
          required: true,
          rules: [{required: true, type: 'string', message: '快递公司不能为空'}],
          select: {
            optionValue: cList
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
          name: "remark",
          wrapperCol: {span: 10},
          input: {
            type: "textarea",
            rows: 5,
            placeholder: "请输入备注信息",
          }
        }]
      }];

    config.initValue = {
      title: null,
      shopId: null,
      buyerNick: null,
      invoiceType: null,
      receiverAddr: null,
      receiverAddress: null,
      receiverName: null,
      receiverMobile: null,
      receiverPhone: null,
      receiverZip: null,
      companyCode: null,
      remark: null,
    };
    return config;
  }

  showModal() {
    this.setState({
      visible: true
    });
  }

  handleOk() {
    this.setState({
      visible: false
    });
    console.log('确定！');
  }

  handleCancel() {
    this.setState({
      visible: false
    });
    console.log('取消！');
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
        <Modal visible={this.state.visible}
               width={1024}
               onOk={this.handleOk.bind(this)} onCancel={this.handleCancel.bind(this)}>
          我是订单商品
        </Modal>
      </div>
    )
  }
}

Add.propTypes = {
  loading: React.PropTypes.bool,
  params: React.PropTypes.object
}

export default Add;

