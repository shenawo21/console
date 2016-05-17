import React, {Component, PropTypes} from 'react';
import {Col, DatePicker} from 'hen';
import Form from 'components/Form';
class Edit extends Component {

  _getFormItems() {
    let config = {};
    let upConfig = {
      listType: 'picture',
      showUploadList: true,
      onlyFile: true,
    };
    config.panels = [
      {
        title: '基本信息',
        className: 'aa',
        formItems: [{
          label: "企业编码：",
          name: "enterpriseCode",
          required: true,
          hasFeedback: true,
          rules: [{required: true, message: '企业编码为必填'}],
          input: {
            type: "text",
            placeholder: "请输入企业编码",
          }
        }, {
          label: "企业名称：",
          name: "name",
          required: true,
          hasFeedback: true,
          rules: [{required: true, message: '企业名称为必填'}],
          input: {
            type: "text",
            placeholder: "请输入企业名称",
          }
        }, {
          label: "企业账号：",
          name: "account",
          required: true,
          hasFeedback: true,
          rules: [{required: true, message: '企业账号为必填'}],
          input: {
            type: "text",
            placeholder: "请输入企业账号",
          }
        }, {
          label: "营业执照：",
          name: "address",
          required: true,
          hasFeedback: true,
          rules: [{required: true, message: '企业地址为必填'}],
          input: {
            type: "text",
            placeholder: "请输入企业地址",
          }
        }, {
          label: "企业LOGO：",
          name: "address",
          required: true,
          hasFeedback: true,
          rules: [{required: true, message: '企业地址为必填'}],
          input: {
            type: "text",
            placeholder: "请输入企业地址",
          }
        }, {
          label: "企业地址：",
          name: "address",
          required: true,
          hasFeedback: true,
          rules: [{required: true, message: '企业地址为必填'}],
          input: {
            type: "text",
            placeholder: "请输入企业地址",
          }
        }, {
          label: "企业描述：",
          name: "remark",
          required: true,
          hasFeedback: true,
          rules: [{required: true, message: '企业描述为必填'}],
          input: {
            type: "textarea",
            placeholder: "请输入企业描述",
          }
        }]
      },
      {
        title: '法定代表人信息',
        className: '',
        formItems: [{
          label: "姓名：",
          name: "userName",
          required: true,
          hasFeedback: true,
          rules: [{required: true, message: '企业地址为必填'}],
          input: {
            type: "text",
            placeholder: "请输入企业地址",
          }
        }, {
          label: "联系电话：",
          name: "telephone",
          required: true,
          hasFeedback: true,
          rules: [{required: true, message: '企业地址为必填'}],
          input: {
            type: "text",
            placeholder: "请输入企业地址",
          }
        }]
      }];

    config.initValue = {
      enterpriseCode: null,
      name: null,
      account: null,
      userName: null,
      address: null,
      remark: null,
      userName: null,
      telephone: null,
    };

    return config;
  }


  render() {
    const {formOptions, ...other} = this.props;

    return (
      <div>

        <Form horizontal items={this._getFormItems()} onSubmit={formOptions.handleSubmit}
              onReset={formOptions.handleReset} allDisabled/>
      </div>
    )
  }
}


Edit.propTypes = {

  loading: React.PropTypes.bool,
  params: React.PropTypes.object
}


export default Edit;
