import React, {Component, PropTypes} from 'react';
import Form from 'components/Form';
import ChooseView from './ChooseView'
import {Button, Icon, Modal} from 'hen';
class Add extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
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
          labelCol: {span: 2},
          wrapperCol: {span: 13},
          required: true,
          rules: [{required: true, message: '订单标题为必填项'}],
          input: {
            placeholder: "请输入订单标题",
          }
        }, {
          label: "所属店铺：",
          name: "shopId",
          rules: [{required: true, type: 'number', message: '所属店铺不能为空'}],
          select: {
            width: '400',
            optionValue: shopList
          }
        }, {
          label: "订单商品：",
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
          rules: [{required: true, message: '请输入买家昵称'}],
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
          labelCol: {span: 2},
          wrapperCol: {span: 13},
          required: true,
          rules: [{required: true, message: '详细地址为必填项'}],
          input: {
            placeholder: "请输入详细地址",
          }
        }, {
          label: "收件人：",
          name: "receiverName",
          wrapperCol: {span: 8},
          required: true,
          rules: [{required: true, message: '收件人为必填项'}],
          input: {
            placeholder: "请输入收件人姓名",
          }
        }, {
          label: "手机号：",
          name: "receiverMobile",
          required: true,
          rules: [{required: true, message: '手机号为必填项'}],
          input: {
            placeholder: "请输入手机号",
          }
        }, {
          label: "固定电话：",
          name: "receiverPhone",
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
          rules: [{required: true, message: '邮政编码为必填项'}],
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
    const context = this;
    const {shopList, cateList, proResult,chooseTableOptions,chooseFormOption}=context.props;
    return (
      <div>
        <Form horizontal items={this._getFormItems()} onSubmit={formOptions.handleSubmit}
              onReset={formOptions.handleReset} buttonOption={buttonOption}/>
        <Modal visible={this.state.visible}
               width={1366}
               onOk={this.handleOk.bind(this)} onCancel={this.handleCancel.bind(this)}>
                <ChooseView shopList={shopList} cateList={cateList} proResult={proResult}
                            chooseTableOptions={chooseTableOptions} chooseFormOption={chooseFormOption}
                />
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
