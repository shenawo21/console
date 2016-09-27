import React, {Component, PropTypes} from 'react';
import Form from 'components/Form';
import ChooseView from './ChooseView'
import {Button, Icon, Modal, Table, Input, message} from 'hen';
import {getSpecValue} from 'common/utils';
class Add extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      tabDataSource: []
    }
  }

  _getFormItems() {
    let config = {}, context = this;
    const {shopList, cList, addrResult, tabDataSource, rowtabSelection}=context.props;
    const columns = [{
      key: '0',
      title: 'SPU编码',
      dataIndex: 'outerIid'
    }, {
      key: '1',
      title: 'SKU编码',
      dataIndex: 'outerSkuId'
    }, {
      key: '2',
      title: '商品名称',
      dataIndex: 'title'
    }, {
      key: '3',
      title: '商品类目编码',
      dataIndex: 'cid'
    }, {
      key: '4',
      title: '销售价',
      dataIndex: 'price'
    }, {
      key: '5',
      title: 'Sku属性',
      dataIndex: 'skuPropertiesName',
      render(val, row){
        return getSpecValue(row)
      }
    }, {
      key: '6',
      title: '在售库存',
      dataIndex: 'stock',
    }, {
      key: '7',
      title: '购买数量',
      dataIndex: 'num',
      render(value, row){
        return <Input type="number" min="1" placeholder="请输入购买数量" name='num' onChange={(e) => {
                tabDataSource.forEach((val,index)=>{
                    if(row.outerSkuId==val.outerSkuId){
                      tabDataSource[index].num = e.target.value
                    }
                })
                context.setState({
                  tabDataSource
                })
        }}/>
      },
      width: 150
    }, {
      key: '8',
      title: '商品金额',
      dataIndex: 'totalFee',
      render(val, row){
        return <span>{row.num * row.price}</span>
      }
    }];
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
          label: "订单商品：",
          name: "dtos",
          wrapperCol: {span: 18},
          required: true,
          custom(getCustomFieldProps) {
            return <div>
              <Button type="ghost" onClick={context.showModal.bind(context)}><Icon type="search"/>选择订单商品</Button>
              {
                tabDataSource.length > 0 ?
                  <Table rowKey={record => record._index} rowSelection={rowtabSelection()} columns={columns}
                         dataSource={tabDataSource} bordered
                         pagination={false} size="middle" style={{marginTop:'20px'}}/> : ''
              }
            </div>
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
            style:{width: '350px'},
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
      dtos: null,
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
    const context = this;
    const {selectList, isOK}=context.props;
    context.setState({
      visible: false
    });
    isOK(selectList);
  }

  handleCancel() {
    this.setState({
      visible: false
    });
  }

  render() {
    const context = this;
    const {formOptions, ...other} = context.props;
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
    const {shopList, cateList, proResult, chooseTableOptions, chooseFormOption}=context.props;
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
