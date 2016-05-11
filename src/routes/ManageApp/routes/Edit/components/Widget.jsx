import React from 'react';
import {Row, Col,Upload, Icon} from 'hen';
import classes from '../assets/Edit.less';
import startImage from '../assets/startImg.png'
export default () => {
  return <Row className={classes.edit}>
    <Col span="11">
        <div className={classes.imgSize}>自定义导航</div>

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


