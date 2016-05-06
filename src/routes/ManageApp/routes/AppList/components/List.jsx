import React,{Component, PropTypes} from 'react';
import {Link} from 'react-router';
import { Button, Row, Col, Input, InputNumber, Pagination, message, Checkbox} from 'hen';

class Add extends Component{

  render() {
    return (
      <div>
        <h2>我的App列表</h2>
        <div class="col-4">
          <dl className="">
            <dt>
                <h2>欢乐购</h2>
                <p>应用状态：<span>安卓版打包成功</span>    <span>IOS版打包成功</span></p>
                <p>更新时间：<span>2016-03-29</span> </p>
                <p>应用版本：<span>V1.0.005</span> </p>
                <p>应用类型：<span>App</span> </p>
            </dt>
            <dd>
                <img src="" width="110px" height="110px" />
            </dd>
          </dl>
          <div class="col-4">
            <ul>
              <li><Button type="ghost">编辑</Button></li>
              <li><Button type="ghost">删除</Button></li>
              <li><Button type="ghost">发布到市场</Button></li>
              <li><Button type="ghost">发布到微信</Button></li>
              <li><Button type="ghost">查看统计</Button></li>
              <li><Button type="ghost">查看历史版本</Button></li>
            </ul>
          </div>
          <div class="col-4">
            <ul>
              <li>
                <img src="" alt="" width="100px" height="100px" />
                <p><Button type="ghost">安卓下载及推广</Button></p>
              </li>
              <li>
                <img src="" alt="" width="100px" height="100px" />
                <p><Button type="ghost">IOS下载及推广</Button></p>
              </li>
            </ul>
          </div>
        </div>
        <Pagination showSizeChanger defaultCurrent={3} total={500} />
      </div>
    );
  }

}

Add.propsTypes = {

}

export default Add;

