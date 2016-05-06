/**
 * choose.js.js
 * @date Created on 2016/5/6
 * @author ShenXing(慎行)<shenxing@suneee.com>
 *
 */
import React, { PropTypes, Component} from 'react'
import { connect } from 'react-redux'
import ChooseView from '../components/Choose';
import Panel from 'components/Panel';

class Choose extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {

  }

  render() {
    return <Panel title=""><ChooseView /></Panel>
  }
}

//数据限制类型
Choose.propTypes = {

}

const mapActionCreators = {

}

const mapStateToProps = (state) => ({

})

export default connect(mapStateToProps, mapActionCreators)(Choose)
