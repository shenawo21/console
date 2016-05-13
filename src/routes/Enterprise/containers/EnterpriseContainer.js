/**
 * list.js
 * @date Created on 2016/5/13
 * @author Tity(泽钰)<zeyu@suneee.com>
 *
 */

import React, { PropTypes, Component} from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router';

import { Modal} from 'hen';


import Enterprise from '../components/Enterprise';
import Panel from 'components/Panel'

class Enterprises extends Component {
  constructor(props) {
    super(props);
    //this.onDel = this.onDel.bind(this);
  }
  componentDidMount() {

  }
  onDel(){
    Modal.confirm({
      title: 'Confirm',
      content: 'Bla bla ...',
      okText: 'OK',
      cancelText: 'Cancel'
    });
  }

  render() {
    return <Panel><Enterprise delet={this.onDel.bind(this)} /></Panel>
  }
}

//数据限制 类型
Enterprises.propTypes = {

}

const mapActionCreators = {

}

const mapStateToProps = (state) => ({

})

export default connect(mapStateToProps, mapActionCreators)(Enterprises)
