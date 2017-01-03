import React, {Component, PropTypes} from 'react';
import Form from 'components/Form';
import {UploadImage} from 'components/FileLoader';
class Edit extends Component {

  /**
   * (form表单生成配置)
   *
   * @returns (description)
   */
  _getFormItems() {
    let config = {}, context = this;
    const {item, imageList, imageImg, params, cList} = context.props;
    let upConfig = {
      listType: 'picture',
      showUploadList: true,
      onlyFile: true,
    };
    config.panels = [
      {
        title: '',
        className: 'noborder',
        formItems: [{
          label: "类目名称：",
          name: "name",
          infoLabel: <div style={{color:'#ccc'}}>填写类目名称名称，20字符以内</div>,
          rules: [
            {required: true, message: '请输入正确的类目名称'},
            {
              validator(rule, value, callback) {
	      	      //去掉类目名称中所有空格
                value = value.replace(/\s+/g, "");
                if (!value) {
                  callback();
                } else {
                  setTimeout(()=> {
                    if (!(/^[\u4e00-\u9fa5a-zA-Z0-9]{1,20}$/.test(value))) {
                      callback([new Error('请输入正确的类目名称')]);
                    } else {
                      callback();
                    }
                  }, 800);
                }
              }
            }
          ],
          input: {
            type: 'text',
            placeholder: "请输入正确的类目名称"
          }
        }, {
          label: "类目图片：",
          name: "image",
          custom(getCustomFieldProps) {
            upConfig.fileList = imageList;
            return <UploadImage title="类目图片" className='upload-list-inline upload-fixed'
                                upConfig={{...upConfig, onChangeFileList:imageImg}}
              {...getCustomFieldProps('Image')} />
          }
        }, {
          label: "分佣比例：",
          infoLabel: <div style={{color:'#ccc'}}> 必须为0 - 100 的整数 </div>,
          name: 'commisRate',
          rules: [{
                    validator(rule, value, callback) { 
                        if (!value && value !== 0) {
                            callback(new Error('请输入0~100之间值!'));
                        } else if (value < -1 || value > 100) {
                            callback(new Error('请输入0~100之间值!'));
                        } else {
                            callback();
                        }
                    }
                }],
          inputNumber: {
            min: 0,
            max: 100,
          }
        }, {
          label: "上级分类",
          required: params.type ? true : false,
          disabled: params.type ? true : false,
          name: 'parentCode',
          infoLabel: <div style={{color:'#ccc'}}>如果选择上级类目，那么新增的类目则为上级类目的子类目，否则为一级类目</div>,
          rules: [{required: params.type ? true : false, type: 'array', message: '请选择上级分类'}],
          cascader: {
            options: cList,
            placeholder: "请选择上级分类",
            changeOnSelect: true
          }
        }, {
          label: "排序：",
          name: "orderNumber",
          rules: [
            {required: true, type: 'number', message: '请填写0以上的整数'},
          ],
          infoLabel: <div style={{color:'#ccc'}}>请填写0以上的，数值越小排序越靠前</div>,
          inputNumber: {
            min: 0,
            max: 999
          }
        }]
      }];
    params && params.type == 'modify' ? config.panels[0].formItems.splice(3, 1) : '';
    config.initValue = {
      name: null,
      image: null,
      commisRate: 0,
      parentCode: null,
      orderNumber: 1
    };
    if (item) {
      config.initValue = item;
    }
    if (params.type == 'add') {
      /**
       * 拆分参数，转化成数组，并形成新数组
       * pop(),splice()
       */
      const s = params.id.toString(), reg = /[A-Za-z0-9]{2}/g, rs = s.match(reg) || [];
      rs.push(s.substring(rs.join('').length));
      //删除最后一个空元素
      rs.pop();
      //替换最后一个元素
      rs.splice(-1, 1, params.id.toString())
      config.initValue.parentCode = rs;

      if (params.rate) {
        config.initValue.commisRate = params.rate
      }
    }
    return config;
  }

  render() {
    const {formOptions, item, btnOption, ...other} = this.props;
    return (
      <div>
        <Form horizontal items={this._getFormItems()} onSubmit={formOptions.handleSubmit}
              onReset={formOptions.handleReset} btnOption={btnOption}/>
      </div>
    );
  }
}
Edit.proptype = {
  loading: React.PropTypes.bool,
  params: React.PropTypes.object
}

export default Edit;

