/**
 * manage.js
 * @date Created on 2016/5/5
 * @author ShenXing(慎行)<shenxing@suneee.com>
 *
 */

import React, { PropTypes, Component} from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router';
import ManageView from '../components/Manage';
import Panel from 'components/Panel'

class Manage extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {

  }

  render() {
    return <Panel title="应用管理"><ManageView /></Panel>
  }
}

//数据限制类型
Manage.propTypes = {

}

const mapActionCreators = {

}

const mapStateToProps = (state) => ({

})

export default connect(mapStateToProps, mapActionCreators)(Manage)
