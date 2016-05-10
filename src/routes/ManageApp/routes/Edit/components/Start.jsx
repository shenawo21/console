import React from 'react';
import {Row, Col,Upload, Icon} from 'hen';
import classes from '../assets/Edit.less';
import startImage from '../assets/startImg.png'
const Dragger = Upload.Dragger;
const props = {
  name: 'file',
  showUploadList: false,
  action: '/upload.do',
};

export default () => {
  return <Row className={classes.edit}>
    <Col span="11">
    <Row>
      <div className={classes.imgSize}>启动画面(3:4)</div>
      <Col span="6">
        <div className={classes.start}>
          <Dragger {...props}>
            <Icon type="plus" />
          </Dragger>
        </div>
      </Col>
      <Col span="6">
        <dl>
          <dt className={classes.dt}>图片上传说明:</dt>
          <dd className={classes.dd}>分辨率: <span className={classes.startColor}>768*1024</span></dd>
          <dd className={classes.dd}>图片格式: <span className={classes.startColor}>png</span></dd>
          <dd className={classes.dd}>图片大小: <span className={classes.startColor}>2M以内</span></dd>
          <dd className={classes.dd}>适配机型: <span className={classes.startColor}>4寸以内小屏机</span></dd>
        </dl>
      </Col>
    </Row>
      <hr/>
    <Row>
      <div className={classes.imgSize}>启动画面(9:16)</div>
      <Col span="6">
        <div className={classes.start}>
          <Dragger {...props}>
            <Icon type="plus" />
          </Dragger>
        </div>
      </Col>
      <Col span="6">
        <dl>
          <dt className={classes.dt}>图片上传说明:</dt>
          <dd className={classes.dd}>分辨率: <span className={classes.startColor}>1440*2560</span></dd>
          <dd className={classes.dd}>图片格式: <span className={classes.startColor}>png</span></dd>
          <dd className={classes.dd}>图片大小: <span className={classes.startColor}>2M以内</span></dd>
          <dd className={classes.dd}>适配机型: <span className={classes.startColor}>4寸以上大屏机</span></dd>
        </dl>
      </Col>
    </Row>
    </Col>
    <Col span="13" >
      <div className={classes.mobShell}>
        <div className={classes.mobScreen}>
          <img src={startImage} width="240" height="427" />
        </div>
      </div>
    </Col>
  </Row>
}

