import React, {Component, PropTypes} from 'react';
import {Col, DatePicker} from 'hen';
import Form from 'components/Form';
import {UploadImage} from 'components/FileLoader'
//企业类型
const TYPE = {
  'client': "客户",
  'system': "系统"
};
//审核状态
const REVIEW = {
  'no': "未审核",
  'success': "成功",
  'failure': "未通过"
};
//是否可用
const ENABLED = {
  'false': "否",
  'true': "是"
};
class Enterprise extends Component {

  constructor() {
    super();
    this.state = {
      logoList: [],
      licenseList: []
    }
  }

  _getFormItems() {
    let config = {}, context = this;
    const {item, licenseImg, logoImg, licenseList, logoList} = context.props;
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
          input: {
            type: "text",
            disabled: true,
            placeholder: "请输入企业编码",
          }
        }, {
          label: "企业名称：",
          name: "name",
          required: true,
          wrapperCol: {span: 10},
          hasFeedback: true,
          rules: [{required: true, message: '企业名称为必填'}],
          input: {
            type: "text",
            placeholder: "请输入企业名称",
          }
        }, {
          label: "企业简称：",
          name: "shortName",
          required: true,
          hasFeedback: true,
          rules: [{required: true, message: '企业简称为必填'}],
          input: {
            type: "text",
            placeholder: "请输入企业简称",
          }
        }, {
          label: "企业邮箱：",
          name: "enterpriseMail",
          hasFeedback: true,
          rules: [
            {required: true, message: '企业邮箱为必填'},
            {
              validator(rule, value, callback) {
                if (!value) {
                  callback();
                } else {
                  setTimeout(function () {
                    if (!(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9]+)+$/.test(value))) {
                      callback([new Error('请输入正确的email地址')]);
                    } else {
                      callback();
                    }
                  }, 800);
                }
              }
            }
          ],
          input: {
            type: "email",
            disabled: true,
            placeholder: "请输入企业邮箱",
          }
        }, {
          label: "企业类型：",
          name: "type",
          required: true,
          hasFeedback: true,
          rules: [{required: true, message: '企业类型为必填'}],
          select: {
            disabled: true,
            tipValue: "请选择企业类型",
            optionValue: Object.keys(TYPE).map((key) => {
              return {'value': key, 'title': TYPE[key]}
            })
          }
        }, {
          label: "是否可用：",
          name: "enabled",
          select: {
            disabled: true,
            tipValue: "请选择是否可用",
            optionValue: Object.keys(ENABLED).map((key) => {
              return {'value': key, 'title': ENABLED[key]}
            })
          }
        }, {
          label: "地址：",
          name: "address",
          wrapperCol: {span: 10},
          hasFeedback: true,
          rules: [{required: true, message: '地址为必填'}],
          input: {
            type: "text",
            placeholder: "请输入企业地址",
          }
        }, {
          label: "描述：",
          name: "remark",
          wrapperCol: {span: 10},
          input: {
            type: "textarea",
            rows: 5,
            placeholder: "请输入企业描述",
          }
        }, {
          label: "营业执照：",
          name: "businessLicense",
          required: true,
          //rules: [{required: true, message: '营业执照为必选'}],
          disabled:true,
          custom(getCustomFieldProps) {
            upConfig.fileList = licenseList;
            return <UploadImage title="营业执照" className='upload-list-inline upload-fixed'
                                upConfig={{...upConfig, onChangeFileList:licenseImg}}
              {...getCustomFieldProps('businessLicense')} />
          }
        }, {
          label: "企业LOGO：",
          name: "logo",
          custom(getCustomFieldProps) {
            upConfig.fileList = logoList;
            return <UploadImage title="企业LOGO" className='upload-list-inline upload-fixed'
                                upConfig={{...upConfig, onChangeFileList:logoImg}}
              {...getCustomFieldProps('logo')} />
          }
        }]
      }, {
        title: '法定代表人信息',
        formItems: [{
          label: "姓名：",
          name: "lealPerson",
          required: true,
          hasFeedback: true,
          rules: [{required: true, message: '法人代表为必填'}],
          input: {
            type: "text",
            placeholder: "请输入法人代表姓名",
          }
        }, {
          label: "联系电话：",
          name: "telephone",
          hasFeedback: true,
          rules: [
            {required: true, message: '联系电话为必填'},
            {
              validator(rule, value, callback) {
                if (!value) {
                  callback();
                } else {
                  setTimeout(function () {
                    if (!(/^1[3|4|5|7|8]\d{9}$/.test(value))) {
                      callback([new Error('请输入正确的手机号')]);
                    } else {
                      callback();
                    }
                  }, 800);
                }
              }
            }
          ],
          input: {
            type: "text",
            placeholder: "请输入联系电话",
          }
        }, {
          label: "创建时间：",
          name: "createTime",
          datepicker: {
            disabled: true,
            format: "yyyy-MM-dd HH:mm:ss",
            showTime: true
          }
        }]
      }];
    config.initValue = {
      enterpriseCode: null,
      name: null,
      shortName: null,
      enterpriseMail: null,
      type: null,
      enabled: null,
      address: null,
      remark: null,
      businessLicense: null,
      logo: null,
      lealPerson: null,
      telephone: null,
      createTime: null,
    };
    if (item) {
      config.initValue = item;
    }
    return config;
  }

  render() {
    const {formOptions, ...other} = this.props;
    return (
      <div>
        <Form horizontal items={this._getFormItems()} onSubmit={formOptions.handleSubmit}
              onReset={formOptions.handleReset}/>
      </div>
    )
  }
}


Enterprise.propTypes = {

  loading: React.PropTypes.bool,
  params: React.PropTypes.object
}


export default Enterprise;
