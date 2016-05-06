/**
 * func.js.js
 * @date Created on 2016/5/6
 * @author ShenXing(慎行)<shenxing@suneee.com>
 *
 */
import React, { PropTypes, Component} from 'react'
import { connect } from 'react-redux'
import FuncView from '../components/Func';
import Panel from 'components/Panel';

class Func extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {

  }

  render() {
    return <Panel title=""><FuncView /></Panel>
  }
}

//数据限制类型
Func.propTypes = {

}

const mapActionCreators = {

}

const mapStateToProps = (state) => ({

})

export default connect(mapStateToProps, mapActionCreators)(Func)
