import React, {Component, PropTypes} from 'react';
import {Col, DatePicker} from 'hen';
import Form from 'components/Form';
import {UploadImage} from 'components/FileLoader'
//企业类型
const TYPE = {
  'client': "客户",
  'system': "系统"
};
class Edit extends Component {

  constructor() {
    super();
    this.state = {
      upList: ""
    }
  }

  _getFormItems() {
    let config = {}, context = this;
    const {item} = context.props;
    const {upList} =  this.state;
    let upConfig = {
      listType: 'picture',
      showUploadList: true,
      onlyFile: true,
    };
    const review = {
      title: '备注',
      className: '',
      formItems: [{
        label: "审核描述：",
        name: "reviewDesctiption",
        wrapperCol: {span: 10},
        required: true,
        hasFeedback: true,
        rules: [{required: true, message: '审核描述为必填'}],
        input: {
          disabled: false,
          rows: '5',
          type: "textarea",
          placeholder: "请输入审核描述",
        }
      }]
    }

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
          label: "企业类型：",
          name: "type",
          required: true,
          hasFeedback: true,
          rules: [{required: true, message: '企业类型为必填'}],
          select: {
            tipValue: "请选择企业类型",
            optionValue: Object.keys(TYPE).map((key) => {
              return {'value': key, 'title': TYPE[key]}
            })
          }
        }, {
          label: "地址：",
          name: "address",
          wrapperCol: {span: 10},
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
            upConfig.fileList = upList;
            return <UploadImage title="营业执照" className='upload-list-inline upload-fixed' upConfig={{...upConfig, onChangeFileList(files) {
                                context.setState({
                                    upList : files
                                })
                            }}} {...getCustomFieldProps('businessLicense')} />
          }
        }, {
          label: "企业LOGO：",
          name: "logo",
          custom(getCustomFieldProps) {
            upConfig.fileList = upList;
            return <UploadImage title="企业LOGO" className='upload-list-inline upload-fixed' upConfig={{...upConfig, onChangeFileList(files) {
                                context.setState({
                                    upList : files
                                })
                            }}} {...getCustomFieldProps('logo')} />
          }
        }]
      },{
        title: '法定代表人信息',
        className: '',
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
          input: {
            type: "text",
            placeholder: "请输入联系电话",
          }
        }]
      }];
    item && item.enterpriseCode ? config.panels.push(review) : '';
    config.initValue = {
      enterpriseCode: null,
      name: null,
      shortName: null,
      type: null,
      address: null,
      remark: null,
      businessLicense: null,
      logo: null,
      lealPerson: null,
      telephone: null,
      reviewDesctiption: null
    };
    if (item) {
      config.initValue = item;
    }
    return config;
  }

  render() {
    const {formOptions, item, buttonOption, ...other} = this.props;
    console.log(this.props)
    return (
      <div>
        <Form horizontal items={this._getFormItems()} onSubmit={formOptions.handleSubmit}
              onReset={formOptions.handleReset} buttonOption={item && item.enterpriseCode?buttonOption:''}
              allDisabled={item && item.enterpriseCode?true:false}/>
      </div>
    )
  }
}


Edit.propTypes = {

  loading: React.PropTypes.bool,
  params: React.PropTypes.object
}


export default Edit;
