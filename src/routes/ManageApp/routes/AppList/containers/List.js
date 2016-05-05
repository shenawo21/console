/**
 * add.js
 * @date Created on 2016/5/5
 * @author ShenXing(慎行)<shenxing@suneee.com>
 *
 */

import React, { PropTypes, Component} from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router';
import AddView from '../components/Add';
import Panel from 'components/Panel'

class Add extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {

  }

  render() {
    return <Panel title="我的App列表"><AddView /></Panel>
  }
}

//数据限制类型
Add.propTypes = {

}

const mapActionCreators = {

}

const mapStateToProps = (state) => ({

})

export default connect(mapStateToProps, mapActionCreators)(Add)
