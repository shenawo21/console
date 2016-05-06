/**
 * generate.js.js
 * @date Created on 2016/5/6
 * @author ShenXing(慎行)<shenxing@suneee.com>
 *
 */
import React, { PropTypes, Component} from 'react'
import { connect } from 'react-redux'
import GenerateView from '../components/Generate';
import Panel from 'components/Panel';

const steps = [{
  title: '选择模板',
  description: '选择模板'
}, {
  title: '基本信息',
  description: '基本信息'
}, {
  title: '启动画面',
  description: '启动画面'
}, {
  title: '功能设置',
  description: '功能设置'
}, {
  title: '生成应用',
  description: '生成应用'
}];
class Edit extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {

  }

  render() {
    return <Panel title=""><GenerateView steps={steps} /></Panel>
  }
}

//数据限制类型
Edit.propTypes = {

}

const mapActionCreators = {

}

const mapStateToProps = (state) => ({

})

export default connect(mapStateToProps, mapActionCreators)(Edit)
