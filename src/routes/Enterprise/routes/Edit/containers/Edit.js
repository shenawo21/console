import React, {PropTypes, Component} from 'react'
import {connect} from 'react-redux'
import EditView from '../components/EditView'
import Panel from 'components/Panel'
import {view, auditS, auditF, addItem} from '../modules/EditReducer'

class Edit extends Component {

  constructor(props) {
    super(props);

    this.getFormOptions = this.getFormOptions.bind(this);


    this.state = {
      params: {},   //表格需要的筛选参数
      item: {}
    }
  }

  componentDidMount() {
    const {params, view} = this.props;
    if (params.id) {
      view({enterpriseCode: params.id})
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
      handleSubmit(value,key) {
        const {addItem, params, auditS,auditF} = context.props;
        context.setState({
          params: value
        })
        params.id ? key == 'reviewS'? auditS({
          enterpriseCode: value.enterpriseCode,
          reviewDesctiption: value.reviewDesctiption
        }) : auditF({
          enterpriseCode: value.enterpriseCode,
          reviewDesctiption: value.reviewDesctiption
        }) : addItem({...value})
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


    return <Panel title=""><EditView item={item}  {...formOptions}/></Panel>
  }
}


Edit.propTypes = {

  result: React.PropTypes.object,
  addItem: React.PropTypes.func,
  audit: React.PropTypes.func,
  view: React.PropTypes.func,

  loading: React.PropTypes.bool
}

const mapActionCreators = {
  view,
  auditS,
  auditF,
  addItem
}


const mapStateToProps = (state) => {
  const {result, loading} = state.edit;
  return {'result': result, loading};

}

export default connect(mapStateToProps, mapActionCreators)(Edit)

