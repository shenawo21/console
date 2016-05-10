import React from 'react';
import {Row, Col} from 'hen';
import classes from '../assets/Edit.less';
import coolImage from '../assets/cool.png';
import metalImage from '../assets/metal.png';
import tempImage from '../assets/tempImg.png'

const tplArr={
  navId: 0,
  title: '导航方式',
  children: [{
    key: 0,
    name: '底部导航',
    children: [{
      tplId: 0,
      title: '炫酷',
      thumb: coolImage,
      image: '1111'
    },{
      tplId: 1,
      title: '金属',
      thumb: metalImage,
      image: '2222'
    }]
  }]
};

export default () => {
  return <Row className={classes.edit}>
    <Col span="11">
      <h4>导航方式</h4>
      <Row>
        {
          tplArr.children.map((s) =><Col span="4" key={s.navId}>
            <div className={classes.navTitle+' '+classes.navHover}>
              {s.name}
            </div>
          </Col>)
        }
      </Row>
      <h4>模板样式</h4>
      <Row>
        {
          tplArr.children.map((s,i) =>s.children.map((m) =><Col span="3" key={m.tplId}>
            <div className={m.tplId == 0?classes.styleTitle+' '+classes.hover:classes.styleTitle}>
              <img src={m.thumb} width="65" height="65" />
              <p>{m.title}</p>
            </div>
          </Col>))
        }
      </Row>
    </Col>
    <Col span="13" >
      <div className={classes.mobShell}>
        <div className={classes.mobScreen}>
          <img src={tempImage} width="240" height="427" />
        </div>
      </div>
    </Col>
  </Row>
}
