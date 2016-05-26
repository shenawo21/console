import React from 'react';
import avatar from './avatar.png';
import {Menu} from 'hen';

const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;


export default () => {

    return (
      <ul className="nav navbar-toolbar navbar-right navbar-toolbar-right">
        <li className="dropdown">
          <a className="dropdown-toggle" data-toggle="dropdown" href="javascript:void(0)" data-animation="scale-up" aria-expanded="false" role="button">
            <span className="flag-icon flag-icon-us" />
          </a>

        </li>
        <li className="dropdown">
          <a className="navbar-avatar dropdown-toggle" data-toggle="dropdown" href="#" aria-expanded="false" data-animation="scale-up" role="button">
            
            <span className="avatar avatar-online">
              <img src={avatar} alt="..." />
              <i />
            </span>
          </a>
        </li>
        <li className="dropdown">
          <a data-toggle="dropdown" href="javascript:void(0)" title="Notifications" aria-expanded="false" data-animation="scale-up" role="button">
            <i className="icon wb-bell" aria-hidden="true" />
            <span className="badge badge-danger up">5</span>
          </a>

        </li>
        <li className="dropdown">
          <a data-toggle="dropdown" href="javascript:void(0)" title="Messages" aria-expanded="false" data-animation="scale-up" role="button">
            <i className="icon wb-envelope" aria-hidden="true" />
            <span className="badge badge-info up">3</span>
          </a>

        </li>
        <li id="toggleChat">
          <a data-toggle="site-sidebar" href="javascript:void(0)" title="Chat" data-url="site-sidebar.tpl">
            <i className="icon wb-chat" aria-hidden="true" />
          </a>
        </li>
      </ul>

    )

}
