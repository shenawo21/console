/**
 * edit.js.js
 * @date Created on 2016/5/5
 * @author ShenXing(慎行)<shenxing@suneee.com>
 *
 */
import React, { PropTypes, Component} from 'react'
import { connect } from 'react-redux'
import StartView from '../components/Start';
import Panel from 'components/Panel';

class Start extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {

  }

  render() {
    return <Panel title=""><StartView /></Panel>
  }
}

//数据限制类型
Start.propTypes = {

}

const mapActionCreators = {

}

const mapStateToProps = (state) => ({

})

export default connect(mapStateToProps, mapActionCreators)(Start)
