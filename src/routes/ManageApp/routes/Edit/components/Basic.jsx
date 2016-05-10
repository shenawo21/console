import React from 'react';
import {Steps,Button,Row, Col,message,Input} from 'hen';
import Form from 'components/Form';
import classes from '../assets/Edit.less'
import iconImage from '../assets/icon.png'

export default () => {
  let _getBasicItems = function() {
    let config = {};
    config.formItems = [{
      label: "应用名称：",
      name: "appName",
      wrapperCol: {span: 10},
      labelCol: {span: 4},
      required: true,
      hasFeedback: true,
      rules: [
        {required: true,max:20, message: '应用名称不能为空，最多20个字符'},
      ],
      input: {
        placeholder: "输入APP名称"
      }
    },{
      label: "应用图标：",
      name: "appIcon",
      wrapperCol: {span: 10},
      labelCol: {span: 4},
      required: true,
      hasFeedback: true,
      rules: [
        {required: true, message: '应用名称不能为空，最多20个字符'},
        {
          validator(rule, value, callback){
            if (!value) {
              callback();
            } else {
              value.length > 21?callback([new Error('抱歉，该用户名已被占用。')]):''
            }
          }
        }
      ],
      input: {
        placeholder: "输入APP名称"
      }
    },{
      label: "应用版本号：",
      name: "appVer",
      wrapperCol: {span: 10},
      labelCol: {span: 4},
      required: true,
      hasFeedback: true,
      rules: [
        {required: true, message: '格式：x.x.xxx，“x”为数字'}
      ],
      input: {
        placeholder: "应用版本号"
      }
    },{
      label:"应用编码：",
      labelCol: {span: 4},
      custom(getCustomFieldProps){
        return <label className="ant-checkbox-inline">
          <span name="appCode">{getCustomFieldProps('appCode').value}</span>
        </label>
      }
    },{
      label: "应用描述：",
      name: "appDesc",
      wrapperCol: {span: 16},
      labelCol: {span: 4},
      input: {
        type: "textarea",
        placeholder: "随便写",
        rows: '5'
      }
    }
    ];
    config.initValue = {
      appName : '象翌微链',
      appIcon : 0,
      appVer: '1.0.001',
      appCode : 'xxxx160426000001',
      appDesc:'应用名称和应用图标上传后显示在右侧预览手机桌面应用名称和应用图标上传后显示在右侧预览手机桌'
    };
    return config;
  };
  return <Row className={classes.edit}>
    <Col span="11">
      <Form horizontal items={_getBasicItems()} button={<span></span>} />
    </Col>
    <Col span="13" >
      <div className={classes.mobShell}>
        <div className={classes.mobScreen}>
          <div className={classes.appIcon}>
            <div className={classes.appImage}>
              <img src={iconImage} width="48" height="48"/>
            </div>
            <div className={classes.appText}>
              象翌微链
            </div>
          </div>
        </div>
      </div>
    </Col>
  </Row>
}


