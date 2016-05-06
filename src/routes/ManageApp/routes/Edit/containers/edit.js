/**
 * edit.js.js
 * @date Created on 2016/5/5
 * @author ShenXing(慎行)<shenxing@suneee.com>
 *
 */
import React, { PropTypes, Component} from 'react'
import { connect } from 'react-redux'
import EditView from '../components/Edit';
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
    this.state = {
      step:0
    };
    this.onNext = this.onNext.bind(this);
  }
  componentDidMount() {

  }
  onNext(){
    let s = this.state.step + 1;
    if (s === steps.length) {
      s = 0;
    }
    this.setState({
      step: s
    });
  }
  render() {
    return <Panel title="">
      <EditView steps={steps} step={this.state.step} next={this.onNext}/>
    </Panel>
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
