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
const getMenu = (menuLists) => {
    return menuLists && menuLists.map((menu, index) => {
        if(new RegExp('http').test(menu.uri)) {
          return (<MenuItem key={`sub-${index}`}><a href={menu.uri} target='blank'><Icon type={menu.icon} />{menu.name}</a></MenuItem>)
        } else {
          return (
            <SubMenu key={`sub-${index}`} title={<span><Icon type={menu.icon} />{menu.name}</span>}>
            {
                (menu.children && menu.children[0].showType == 1) && menu.children.map((item,index) => {
                  if(item.children && item.children.length > 0 && item.children[0].showType == 1) {
                    return (
                      <SubMenu key={`group-${index}`} title={item.name}>
                        {
                          item.children.map((menuItem,index) => {
                            let url = menuItem.uri || '#'
                            return (
                              <MenuItem key={`item-${item.code}-${index}`}>
                                {new RegExp('http').test(menuItem.uri) ? <a href={menuItem.uri} target='blank'>{menuItem.name}</a> : <Link to={url}>{menuItem.name}</Link>}
                              </MenuItem>
                            )
                          })
                        }
                      </SubMenu>
                    )
                  } else {
                    let url = item.uri || '#'
                    console.log(item.code)
                    return (
                      <MenuItem key={`item-${item.code}-${index}`}>
                        {new RegExp('http').test(item.uri) ? <a href={item.uri} target='blank'>{item.name}</a> : <Link to={url}>{item.name}</Link>}
                      </MenuItem>
                    )
                  }
                })
            }
            </SubMenu>
          )
        }
    })
}


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
  //获取图像
  const pic = store.get('USER') && store.get('USER').photo
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
              getMenu(menuList)
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
