import React, {Component, PropTypes} from 'react';
import Form from 'components/Form';
class Joint extends Component {

  _getFormItems() {
    let config = {}, context = this;
    const {jsonList, sName, kList, vList} = context.props;
    config.panels = [
      {
        title: '基本信息',
        className: '',
        formItems: [{
          label: "店铺名称：",
          name: "name",
          input: {
            disabled: true
          }
        }]
      }, {
        title: '应用信息',
        className: '',
        formItems: jsonList
      }];
    config.initValue = {
      name: null,
    };
    /**
     * 数据拼接
     * @type {string}
     */
    let jsonInitStr = "{";
    let vsize = vList.length;
    for (let i = 0; i < vsize; i++) {
      jsonInitStr += "\"" + vList[i] + "\":null";
      if (i < vsize - 1) {
        jsonInitStr += ",";
      }
    }
    jsonInitStr += "}";
    config.initValue = JSON.parse(jsonInitStr);
    if(kList){
      config.initValue = kList;
    }
    if (sName) {
      config.initValue.name = sName;
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

Joint.propTypes = {

  loading: React.PropTypes.bool,
  params: React.PropTypes.object
}

export default Joint;
