import React, {PropTypes, Component} from 'react'
import {connect} from 'react-redux'
import MergeView from '../components/MergeView'
import Panel from 'components/Panel'
import {view, mergeOrder} from '../modules/MergeReducer'

class Merge extends Component {

  constructor(props) {
    super(props);
    this.getFormOptions = this.getFormOptions.bind(this);
    this.state = {
      params: {}
    }
  }

  componentDidMount() {
    const {view,params} = this.props;
    const id = params.id;
    if (id) {
      view({tId: id})
    }
  }

  /**
   * (表格功能配置项)
   *
   * @returns (description)
   */
  getFormOptions() {
    const context = this;
    const {mergeOrder,params} = context.props;
    return {
      /**
       * (筛选表单提交)
       *
       * @param value (description)
       */
      handleSubmit(value) {
        console.log(value)
        context.setState({
          params: value
        })
        mergeOrder({
          ...value
        })
      },

      /**
       * (筛选表单重置)
       */
      handleReset() {
      }
    }
  }


  render() {
    const {params} = this.state;

    const {loading, result} = this.props;
    const formOptions = {
      loading,
      result,
      'formOptions': this.getFormOptions()
    }


    return <Panel title=""><MergeView  {...formOptions} /></Panel>
  }
}


Merge.propTypes = {

  result: React.PropTypes.object,
  loading: React.PropTypes.bool
}

const mapActionCreators = {
  view,
  mergeOrder
}


const mapStateToProps = (state) => {
  const {result, loading} = state.merge;

  return {'result': result, loading};

}

export default connect(mapStateToProps, mapActionCreators)(Merge)

