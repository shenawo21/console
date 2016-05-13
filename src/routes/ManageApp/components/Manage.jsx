import React,{Component, PropTypes} from 'react';
import {Link} from 'react-router';
import MyAppList from '../routes/AppList/containers/List'
import TrashList from '../routes/TrashList/containers/List'
import { Tabs, Button,Icon } from 'hen';

const TabPane = Tabs.TabPane;
const operations = <Link to='/manage/add' className="ant-btn ant-btn-primary">
<Icon type="plus-circle-o" />  我要制作应用</Link>;

class Manage extends Component{

  render() {
    return (
      <Tabs tabBarExtraContent={operations}>
        <TabPane tab="我的应用" key="1"><MyAppList /></TabPane>
        <TabPane tab="回收站" key="2"><TrashList /></TabPane>
      </Tabs>
    );
  }

}

Manage.propsTypes = {

}

export default Manage;

