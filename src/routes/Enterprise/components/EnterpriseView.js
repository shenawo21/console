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
    const {item} = context.props;
    const {logoList, licenseList} =  this.state;
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
        },{
          label: "企业邮箱：",
          name: "enterpriseMail",
          hasFeedback: true,
          rules: [{required: true, message: '企业邮箱为必填'}],
          input: {
            type: "email",
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
          custom(getCustomFieldProps) {
            upConfig.fileList = licenseList;
            return <UploadImage title="营业执照" className='upload-list-inline upload-fixed' upConfig={{...upConfig, onChangeFileList(files) {
                                context.setState({
                                    licenseList : files
                                })
                            }}} {...getCustomFieldProps('businessLicense')} />
          }
        }, {
          label: "企业LOGO：",
          name: "logo",
          custom(getCustomFieldProps) {
            upConfig.fileList = logoList;
            return <UploadImage title="企业LOGO" className='upload-list-inline upload-fixed' upConfig={{...upConfig, onChangeFileList(files) {
                                context.setState({
                                    logoList : files
                                })
                            }}} {...getCustomFieldProps('logo')} />
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
          rules: [{required: true, message: '联系电话为必填'}],
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
      }, {
        title: '备注',
        className: '',
        formItems: [{
          label: "审核状态：",
          name: "reviewStatue",
          select: {
            disabled: true,
            tipValue: "请选择企业类型",
            optionValue: Object.keys(REVIEW).map((key) => {
              return {'value': key, 'title': REVIEW[key]}
            })
          }
        }, {
          label: "审核描述：",
          name: "reviewDesctiption",
          wrapperCol: {span: 10},
          input: {
            disabled: true,
            rows: '5',
            type: "textarea",
            placeholder: "请输入审核描述",
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
      reviewStatue: null,
      reviewDesctiption: null
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
