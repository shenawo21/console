import React, {Component, PropTypes} from 'react';

import Form from 'components/Form';

class Edit extends Component {

  _getFormItems() {
    let context = this;
    const {inList, chList, item} = context.props;
    let config = {
      formItems: [{
        label: "所属行业：",
        name: "industryId",
        hasFeedback: true,
        rules: [{required: true, type: 'number', message: '所属行业为必填'}],
        select: {
          optionValue: inList
        }
      }, {
        label: "店铺名称：",
        name: "name",
        hasFeedback: true,
        infoLabel: <div style={{color:'#ccc'}}>输入你的店铺名称，40个字符以内，支持汉字、字母、数字</div>,
        rules: [
          {required: true, message: '请输入正确的店铺名称'},
          {
            validator(rule, value, callback) {
              if (!value) {
                callback();
              } else {
                setTimeout(()=> {
                  if (!(/^[\u4e00-\u9fa5a-zA-Z0-9]{1,40}$/.test(value))) {
                    callback([new Error('请输入正确的店铺名称')]);
                  } else {
                    callback();
                  }
                }, 800);
              }
            }
          }
        ],
        input: {
          disabled: item.shopId && item.status == 'audit' ? true : false,
          type: 'text',
          placeholder: "请输入正确的店铺名称"
        }
      },{
        label: "应用类型：",
        custom(getCustomFieldProps) {
          return <label className="ant-checkbox-inline">
            <span name="type">第三方商城</span>
          </label>
        }
      }, {
        label: "对接店铺类型：",
        name: "channelCode",
        infoLabel: <div style={{color:'#ccc'}}>不同类型的店铺对接信息不同，请选择正确的类型</div>,
        hasFeedback: true,
        rules: [{required: true, message: '对接店铺类型为必填'}],
        select: {
          optionValue: chList,
          disabled: item.shopId  ? (item.status == 'create' ? false : true) : false
        }
      }, {
        label: "店铺描述：",
        name: "remark",
        wrapperCol: {span: 10},
        rules: [
          {required: true, message: '请输入店铺描述,1000字符以内'},
          {
            validator(rule, value, callback) {
              if (!value) {
                callback();
              } else {
                setTimeout(()=> {
                  if (value.length>1000) {
                    callback([new Error('请输入店铺描述,1000字符以内')]);
                  } else {
                    callback();
                  }
                }, 800);
              }
            }
          }
        ],
        input: {
          type: "textarea",
          rows: 5,
          placeholder: "请输入店铺描述,1000字以内",
          disabled: item.shopId && item.status == 'audit' ? true : false
        }
      }],
      initValue: {
        industryId: null,
        name: null,
        channelCode: null,
        remark: null
      }
    }
    if (item) {
      config.initValue = item;
    }
    return config;
  }

  render() {
    const {formOptions, item, ...other} = this.props;
    const buttonOptionNone = {
      buttons: [
        {
          key: 'save',
          type: 'primary',
          name: '保存并进入下一步'
        },
        {
          key: 'reset',
          name: '重置'
        }
      ]
    }
    return (
      <div>
        <Form horizontal buttonOption={buttonOptionNone}
              items={this._getFormItems()} onSubmit={formOptions.handleSubmit}
              onReset={formOptions.handleReset} allDisabled={item && item.shopId ? true : false}/>
      </div>
    )
  }
}

Edit.propTypes = {
  loading: React.PropTypes.bool,
  params: React.PropTypes.object
}

export default Edit;
