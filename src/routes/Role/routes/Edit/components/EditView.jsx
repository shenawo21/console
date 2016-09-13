import React, {Component, PropTypes} from 'react';
import Form from 'components/Form';

//是否可用
const STATUS = {
  false: '不可用',
  true: '可用'
};
class Edit extends Component {

  constructor() {
    super();
    this.state = {
      permission: []
    }
  }

  /**
   * (form表单生成配置)
   *
   * @returns (description)
   */
  _getFormItems() {
    let config = {}, context = this;
    const {item} = context.props;
    config.panels = [
      {
        title: '角色基本信息',
        className: 'noborder',
        formItems: [{
          label: "名称：",
          name: "name",
          hasFeedback: true,
          rules: [{required: true, message: '名称为必填'}],
          input: {
            type: 'text',
            placeholder: "请输入名称",
          }
        }, {
          label: "编码：",
          name: "code",
          hasFeedback: true,
          rules: [{required: true, message: '编码为必填'}],
          input: {
            type: "text",
            placeholder: "请输入编码",
          }
        }, {
          label: "是否可用：",
          name: "enabled",
          hasFeedback: true,
          rules: [{required: true, message: '请选择是否可用'}],
          select: {
            optionValue: Object.keys(STATUS).map((key) => {
              return {'value': key, 'title': STATUS[key]}
            })
          }
        }]
      }];

    config.initValue = {
      name: null,
      code: null,
      enabled: null,
    };
    if (item) {
      config.initValue = item;
    }
    return config;
  }
  render() {
    const {formOptions, item, btnOption, ...other} = this.props;
    return (
      <div>
        <Form horizontal items={this._getFormItems()} onSubmit={formOptions.handleSubmit}
              onRest={formOptions.handleReset} btnOption={btnOption} allDisabled={item && item.roleId ? false : false}/>
      </div>
    );
  }
}

Edit.proptype = {

  loading: React.PropTypes.bool,
  params: React.PropTypes.object

}

export default Edit;

