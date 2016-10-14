import React from 'react';
import avatar from './avatar.png';
import {Menu, Dropdown, Icon} from 'hen';
import style from './navBar.less';
import store from 'store2';
import Image from 'components/Image';

export default (props) => {
  //account
  const account = store.get('USER').account;
    const menu = (
      <Menu>
        <Menu.Item key="0">
          <i className="icon wb-user " aria-hidden="true"></i> {account}
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="1">
          <a href="#/accounts/updpwd?_k=n6ktwc" role="menuitem"><i className="icon wb-settings " aria-hidden="true"></i> 修改密码</a>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="2">
          <a href="javascript:void(0)" onClick={props.logout} role="menuitem"><i className="icon wb-power" aria-hidden="true"></i> 退出</a>
        </Menu.Item>
      </Menu>
    )


    return (
      <div className="nav navbar-toolbar navbar-right navbar-toolbar-right">
        <Dropdown className={style.navDown} overlay={menu} trigger={['click']}>
          <a className="ant-dropdown-link" href="#">
            <span className="avatar avatar-online">
              {
                props.pic ? <Image src={props.pic} alt="头像"/> : <img src={avatar} alt="头像"/>
              }
              <i></i>
            </span>
          </a>
        </Dropdown>
      </div>
    )
}
