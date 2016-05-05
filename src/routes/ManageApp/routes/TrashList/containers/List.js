/**
 * list.js
 * @date Created on 2016/5/5
 * @author Tity(泽钰)<zeyu@suneee.com>
 *
 */

import React, { PropTypes, Component} from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router';
import ListView from '../components/List';
import Panel from 'components/Panel'

class List extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {

  }

  render() {
    return <Panel><ListView /></Panel>
  }
}

//数据限制类型
Add.propTypes = {

}

const mapActionCreators = {

}

const mapStateToProps = (state) => ({

})

export default connect(mapStateToProps, mapActionCreators)(List)
