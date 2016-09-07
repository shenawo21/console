import React, {PropTypes, Component} from 'react'
import {connect} from 'react-redux'
import DetailView from '../components/DetailView'
import Panel from 'components/Panel'
import {view} from '../modules/DetailReducer'

class Detail extends Component {

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
    const id = params.id;
    if (id) {
      view({tid: id})
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
  }

  /**
   * (表格功能配置项)
   *
   * @returns (description)
   */
  getFormOptions() {
    const context = this;
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
      },

      /**
       * (筛选表单重置)
       */
      handleReset() {
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
    return <Panel title=""><DetailView item={item}/></Panel>
  }
}


Detail.propTypes = {
  result: React.PropTypes.object,
  loading: React.PropTypes.bool
}

const mapActionCreators = {
  view
}

const mapStateToProps = (state) => {
  const {result, loading} = state.detail;
  return {'result': result, loading};
}
export default connect(mapStateToProps, mapActionCreators)(Detail)

