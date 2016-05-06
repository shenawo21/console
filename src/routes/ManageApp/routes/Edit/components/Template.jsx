import React from 'react';
import {Row, Col} from 'hen';
const tplArr=[{
  navId: 0,
  title: '导航方式',
  children: [{
    key: 0,
    name: '地步导航',
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
    },{
      tplId: 2,
      title: '流光',
      thumb: '333',
      image: '3333'
    }]
  }]
}];
tplArr.map((s,i) =><dd key={i}>{s.title}</dd>)
export default () => {
  return <Row>
    <Col span="12" >
      <h3>选择模板</h3>
      <dl>
        <dt>导航方式</dt>
        <dd>底部导航</dd>
      </dl>
      <dl>
        <dt>模板样式</dt>
        <dd>
          模板样式
        </dd>
      </dl>
    </Col>
    <Col span="12" >
      手机大屏
    </Col>
  </Row>
}
