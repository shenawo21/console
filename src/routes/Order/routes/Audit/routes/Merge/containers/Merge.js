import React, {PropTypes, Component} from 'react'
import {connect} from 'react-redux'
import MergeView from '../components/MergeView'
import Panel from 'components/Panel'
import {view, mergeOrder,unlock} from '../modules/MergeReducer'

class Merge extends Component {

  constructor(props) {
    super(props);
    this.getFormOptions = this.getFormOptions.bind(this);
    this.state = {
      params: {},
      item: {}
    }
  }

  componentDidMount() {
    const {view, params} = this.props;
    if (params.id) {
      view({tids: params.id.split(",")})
    }
  }

  componentWillReceiveProps(nextProps, preProps) {
    if (!nextProps.params.id) {
      this.setState({
        item: {}
      })
    } else {
      this.setState({
        item: nextProps.result
      })
    }
    if (nextProps.isJump) {
      setTimeout(()=> {
        nextProps.history.go(-1);
      }, 800);
    }
  }

  /**
   * (表格功能配置项)
   *
   * @returns (description)
   */
  getFormOptions() {
    const context = this;
    const {mergeOrder, params,unlock} = context.props;
    return {
      /**
       * (筛选表单提交)
       *
       * @param value (description)
       */
      handleSubmit(value) {
        context.setState({
          params: value
        })
        mergeOrder({
          ...value,
          tids: params.id.split(",")
        })
      },

      /**
       * (筛选表单重置)
       */
      handleReset() {
        unlock({
          tids: params.id.split(",")
        })
      }
    }
  }


  render() {
    const {params, item} = this.state;
    const {loading, result} = this.props;
    const formOptions = {
      loading,
      result,
      'formOptions': this.getFormOptions()
    }


    return <Panel title=""><MergeView  {...formOptions} item={item}/></Panel>
  }
}


Merge.propTypes = {

  result: React.PropTypes.object,
  loading: React.PropTypes.bool
}

const mapActionCreators = {
  view,
  mergeOrder,
  unlock
}


const mapStateToProps = (state) => {
  const {result, loading, isJump} = state.merge;

  return {'result': result, loading, isJump};

}

export default connect(mapStateToProps, mapActionCreators)(Merge)

