import React, {PropTypes, Component} from 'react'
import {connect} from 'react-redux'
import EditView from '../components/EditView'
import Panel from 'components/Panel'
import {view, audit, addItem} from '../modules/EditReducer'

class Edit extends Component {

  constructor(props) {
    super(props);

    this.getFormOptions = this.getFormOptions.bind(this);


    this.state = {
      params: {}   //表格需要的筛选参数
    }
  }

  componentDidMount() {

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
        const {addItem} = context.props;
        console.log(value)
        context.setState({
          params: value
        })
        addItem({...value})
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


    return <Panel title=""><EditView  {...formOptions} /></Panel>
  }
}


Edit.propTypes = {

  result: React.PropTypes.bool,
  addItem: React.PropTypes.func,
  audit: React.PropTypes.func,
  view: React.PropTypes.func,

  loading: React.PropTypes.bool
}

const mapActionCreators = {
      view,
      audit,
      addItem
}


const mapStateToProps = (state) => {
  const {result, loading} = state.edit;

  return {'result': result.data, loading};

}

export default connect(mapStateToProps, mapActionCreators)(Edit)

