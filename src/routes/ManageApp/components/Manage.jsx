import React,{Component, PropTypes} from 'react';
import {Link} from 'react-router';

import { Tabs, Button,Icon } from 'hen';

const TabPane = Tabs.TabPane;
const operations = <Button type="primary" outline><Link to="manage/add"></Link>
<Icon type="plus-circle-o" />  我要制作应用
</Button>;

class Manage extends Component{

  render() {
    return (
      <Tabs tabBarExtraContent={operations}>
        <TabPane tab="我的应用" key="1"></TabPane>
        <TabPane tab="回收站" key="2">回收站</TabPane>
      </Tabs>
    );
  }

}

Manage.propsTypes = {

}

export default Manage;

