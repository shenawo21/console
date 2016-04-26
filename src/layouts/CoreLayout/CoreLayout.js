import React, { PropTypes } from 'react'
import {Link} from 'react-router'
import 'hen/style/index.less'
import '../../styles/core.less'
import classes from './CoreLayout.less'
import { Menu, Breadcrumb, Icon } from 'hen'
const SubMenu = Menu.SubMenu
const MenuItem = Menu.Item;

import Page from '../../components/Page'
import menus from '../../common/menu'


var logo = require('./logo.png')

// Note: Stateless/function components *will not* hot reload!
// react-transform *only* works on component classes.
//
// Since layouts rarely change, they are a good place to
// leverage React's new Stateless Functions:
// https://facebook.github.io/react/docs/reusable-components.html#stateless-functions
//
// CoreLayout is a pure function of its props, so we can
// define it with a plain javascript function...
function CoreLayout({ children }) {
  return (
    console.log(children);
    <div>
      <div className={classes['header']}>
        <div className={classes['wrapper']}>
          <div className={classes['logo']}>
            <Link to="/">
              <img src={logo} height="46"/>
            </Link>
          </div>
          <Menu mode="horizontal"
            defaultSelectedKeys={['2']} style={{ lineHeight: '64px' }}>
            <Menu.Item key="2">
              <Link to="repo">仓库</Link>
            </Menu.Item>
            <Menu.Item key="3">导航三</Menu.Item>
          </Menu>
        </div>
      </div>
      <div className={classes['aside']}>
        <aside className={classes['sider']}>
          <Menu mode="inline" theme="dark" defaultOpenKeys={['sub0']}>
            {
              menus.map((menu, index) => {
                return <SubMenu key={`sub${index}`} title={<span><Icon type={menu.icon} />{menu.title}</span>}>
                  {
                    menu.children.map((subMenu, subIndex) => {
                      return <MenuItem key={`item${subMenu.url}`}>
                        <Link to={subMenu.url}>{subMenu.title}</Link>
                      </MenuItem>
                    })
                  }
                </SubMenu>
              })
            }
          </Menu>

          <div className={classes['site-menubar-footer'] + ' site-menubar-footer'}>
            <a href="javascript: void(0);" className="fold-show" data-placement="top" data-toggle="tooltip" data-original-title="Settings">
              <span className="icon wb-settings" aria-hidden="true" />
            </a>
            <a href="javascript: void(0);" data-placement="top" data-toggle="tooltip" data-original-title="Lock">
              <span className="icon wb-eye-close" aria-hidden="true" />
            </a>
            <a href="javascript: void(0);" data-placement="top" data-toggle="tooltip" data-original-title="Logout">
              <span className="icon wb-power" aria-hidden="true" />
            </a>
          </div>
        </aside>

        <div className={classes['container']}>
          <Page>
            {children}
          </Page>
        </div>
        <div className={classes['footer']}>
          Made with <i className="red-600 wb wb-heart" /> by <a href="#hen">Hen</a>
        </div>
      </div>
    </div>

  )
}

CoreLayout.propTypes = {
  children: PropTypes.element
}

export default CoreLayout
