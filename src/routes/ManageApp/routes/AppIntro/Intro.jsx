import React,{Component, PropTypes} from 'react';
import {Link} from 'react-router';
import { Button, Row, Col, Input, InputNumber, Pagination, message, Checkbox} from 'hen';

import classes from './Intro.less'

class Add extends Component{

  render() {
    return (
        <Row>
          <Col span="15">
            <dl>
              <dd>
                  <img src="" width="120px" height="120px" />
              </dd>
              <dt>
                  <h2>微购</h2>
                  <p>应用状态：<span className={classes.green}>安卓版打包成功</span>&nbsp;&nbsp;&nbsp;&nbsp;<a className={classes.red} href="#/manage/edit">IOS版打包失败</a></p>
                  <p>更新时间：<span>2016-03-29</span> </p>
                  <p>应用版本：<span>V1.0.005</span> </p>
                  <p>应用类型：<span>App</span> </p>
              </dt>              
            </dl>
          </Col>
          <Col span="9">
              <Button type="ghost" className={classes.wth}>编辑</Button>
              <Button type="ghost" className={classes.wth}>删除</Button>
              <Button type="ghost" className={classes.wth}>发布到市场</Button>
              <Button type="ghost" className={classes.wth}>发布到微信</Button>
              <Button type="ghost" className={classes.wth}>查看统计</Button>
              <Button type="ghost" className={classes.wth}>查看历史版本</Button>
          </Col>
        </Row>
    );
  } 

}

Add.propsTypes = {

}

export default Add;

