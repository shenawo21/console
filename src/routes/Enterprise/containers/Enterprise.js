import React, {PropTypes, Component} from 'react'
import {connect} from 'react-redux'
import EnterpriseView from '../components/EnterpriseView'
import Panel from 'components/Panel'
import {view, modifyItem} from '../modules/EnterpriseReducer'
import store from 'store2';
class Enterprise extends Component {
  constructor(props) {
    super(props);
    this.getFormOptions = this.getFormOptions.bind(this);

    this.state = {
      item: {}
    }
  }

  componentDidMount() {
    const {view} = this.props;
    const id = store.get('USER').enterpriseCode;
    //缓存中获取登陆信息
    if (id) {
      view({enterpriseCode: id})
    }
  }

  componentWillReceiveProps(nextProps, preProps) {
    if(nextProps){
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
      handleSubmit(value) {
        const {modifyItem} = context.props;
        context.setState({
          params: value
        })
        modifyItem({...value})
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


    return <Panel title=""><EnterpriseView item={item}  {...formOptions}/></Panel>
  }
}


Enterprise.propTypes = {

  result: React.PropTypes.object,
  view: React.PropTypes.func,

  loading: React.PropTypes.bool
}

const mapActionCreators = {
  view,
  modifyItem
}


const mapStateToProps = (state) => {
  const {result, loading} = state.enterprise;
  return {'result': result, loading};

}

export default connect(mapStateToProps, mapActionCreators)(Enterprise)

