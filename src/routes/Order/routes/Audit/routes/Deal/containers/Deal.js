import React, {PropTypes, Component} from 'react'
import {connect} from 'react-redux'
import DealView from '../components/DealView'
import Panel from 'components/Panel'
import {view, submitOrder, modifyItem, companyList, modifyLogistics, addrList} from '../modules/DealReducer'

class Deal extends Component {

  constructor(props) {
    super(props);
    this.getFormOptions = this.getFormOptions.bind(this);
    this.getNoteOptions = this.getNoteOptions.bind(this);
    this.state = {
      params: {},
      isShow: false
    }
  }

  componentDidMount() {
    const {view, params, companyList, addrList} = this.props;
    const id = params.id;
    if (id) {
      view({tId: id})
    }
    /**
     * 物流公司列表
     */
    companyList();
    /**
     * 省市区列表
     */
    addrList()
  }

  componentWillReceiveProps(nextProps, preProps) {
    if (nextProps.isJump) {
      this.setState({
        isShow: true
      })
    }
  }

  edited() {
    this.setState({
      isShow: true
    })
  }

  /**
   * (表格功能配置项)
   *
   * @returns (description)
   */
  getFormOptions() {
    const context = this;
    const {modifyLogistics} = this.props;
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
        modifyLogistics({...value})
      },

      /**
       * (筛选表单重置)
       */
      handleReset() {
      }
    }
  }

  getNoteOptions() {
    const context = this;
    const {submitOrder, modifyItem, params} = context.props;
    return {
      handleSubmit(value, key) {
        console.log(value, key)
        context.setState({
          params: value
        })
        key == 'submit' ? submitOrder({
          tid: params.id
        }) :
          key == 'delay' ? modifyItem({
            tid: params.id,
            ...value
          }) :
            key == 'again' ? modifyItem({
              tid: params.id
            }) :
              key == 'unlock' ? modifyItem({
                tid: params.id,
                isLocked: value.isLocked
              }) : ''
      },
      handleReset() {
      }
    }
  }

  render() {
    const {params, isShow} = this.state;
    const {loading, result} = this.props;
    const formOptions = {
      loading,
      result,
      'formOptions': this.getFormOptions()
    }
    const noteOptions = {
      loading,
      result,
      'noteOptions': this.getNoteOptions()
    }

    return <Panel title=""><DealView isShow={isShow}
                                     edited={this.edited.bind(this)} {...formOptions} {...noteOptions} /></Panel>
  }
}

Deal.propTypes = {

  result: React.PropTypes.object,
  deleteItem: React.PropTypes.func,
  modifyItem: React.PropTypes.func,
  loading: React.PropTypes.bool
}

const mapActionCreators = {
  view,
  submitOrder,
  modifyItem,
  companyList,
  modifyLogistics,
  addrList
}


const mapStateToProps = (state) => {
  const {result, loading} = state.deal;
  return {'result': result, loading};
}

export default connect(mapStateToProps, mapActionCreators)(Deal)

