import React from 'react';
import {Row, Col} from 'hen';
const tplArr={
  navId: 0,
  title: '导航方式',
  children: [{
    key: 0,
    name: '底部导航',
    children: [{
      tplId: 0,
      title: '炫酷',
      thumb: '111',
      image: '1111'
    },{
      tplId: 1,
      title: '金属',
      thumb: '222',
      image: '2222'
    }]
  }]
};

export default () => {
  return <Row>
    <Col span="12" >
      <h3>选择模板</h3>
      <dl>
        <dt>导航方式</dt>
        {
          tplArr.children.map((s,i) =><dd key={i}>{s.title}</dd>)
        }
        <dd>底部导航</dd>
      </dl>
      <dl>
        <dt>模板样式</dt>
        {
          tplArr.children.map((s,i) =>s.children.map((m,n) =><dd key={n}>{m.title}</dd> ))
        }
      </dl>
    </Col>
    <Col span="12" >
      手机大屏
    </Col>
  </Row>
}
