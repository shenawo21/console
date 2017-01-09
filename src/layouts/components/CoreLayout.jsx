import React, { PropTypes } from 'react'
import {Link} from 'react-router'
import 'hen/style/index.less'
import '../../styles/core.less'
import classes from './CoreLayout.less'
import { Menu, Breadcrumb, Icon } from 'hen'
import store from 'store2';
const SubMenu = Menu.SubMenu
const MenuItem = Menu.Item;

import Page from '../../components/Page'
import getMenu from '../../common/menu'
import NavBar from '../../components/NavBar'

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
function CoreLayout(props) {
  let result = null;
  let findNestedProp = (props)=>{
      let previousChildren = props.children;

      if(null !== props.children){
          result = props.children;
          findNestedProp(props.children.props)
      }
  }
  findNestedProp(props);

  const {handleLogout} = props;

  //获取本地存储的菜单信息
  const menuList = store.get('USER') && store.get('USER').menuList;
  //修改菜单数据格式
  let menus = getMenu(menuList);
  //获取图像
  const pic = store.get('USER') && store.get('USER').photo
  console.log(menus,'menus***************')
  return (
    <div className={classes.corelayout}>
      <div className={classes.header + ' site-navbar navbar navbar-default navbar-fixed-top navbar-mega navbar-inverse'}>
          <div className={classes.logo}>
            <Link to="/">
              <img src={logo} height="46"/>
            </Link>
          </div>
          <NavBar logout={handleLogout} pic={pic} />
      </div>
      <div className={classes.aside}>
        <aside className={classes.sider + ' site-menu-horizontal'}>

          <Menu mode="horizontal" defaultOpenKeys={['sub0']}>
            {
              menus.map((menu, index) => {
                return <SubMenu key={`menu-${index}`} title={<span><Icon type={menu.icon} />{menu.title}</span>}>
                  {
                    menu.children.map((subMenu, subIndex) => {
                      if(subMenu.children){
                          return <SubMenu key={`sub-${subIndex}`} title={<span><Icon type={subMenu.icon} />{subMenu.title}</span>}>
                          {
                            subMenu.children.map((subChildMenu, subChildIndex) => {
                                return <MenuItem key={`${subChildMenu.url}`}>
                                   <Link to={subChildMenu.url}>{subChildMenu.title}</Link>
                                </MenuItem>
                            })
                          }
                          </SubMenu>
                      }else{
                        return <MenuItem key={`${subMenu.url}`}>
                          <Link to={subMenu.url}>{subMenu.title}</Link>
                        </MenuItem>
                      }
                    })
                  }
                </SubMenu>
              })
            }
          </Menu>

        </aside>

        <div className={classes['container']}>
          <Page>
            {result ? result : props.children}
          </Page>
        </div>
        {/*<div className={classes['footer']}>
          Made with <i className="red-600 wb wb-heart" /> by <a href="#hen">Hen</a>
        </div>*/}
      </div>
    </div>

  )
}

CoreLayout.propTypes = {
  children: PropTypes.element
}

export default CoreLayout
