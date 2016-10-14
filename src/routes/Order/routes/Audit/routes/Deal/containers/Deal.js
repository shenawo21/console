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
      item: {},
      isShow: false
    }
  }

  componentDidMount() {
    const {view, params, companyList, addrList} = this.props;
    const id = params.id;
    if (id) {
      view({tid: id})
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
    if (!nextProps.params.id) {
      this.setState({
        item: {}
      })
    } else {
      this.setState({
        item: nextProps.result
      })
    }

    if (nextProps.isLogis) {
      this.setState({
        isShow: false
      })
    }
    
    if (nextProps.isJump) {
      setTimeout(()=> {
        nextProps.history.go(-1);
      }, 800);
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
    const {modifyLogistics, params} = context.props;
    return {
      /**
       * (筛选表单提交)
       *
       * @param value (description)
       */
      handleSubmit(value) {
        let P = '', C = '', D = '';
        if (value.receiverAddr) {
          P = value.receiverAddr[0];
          C = value.receiverAddr[1];
          D = value.receiverAddr[2]
        }
        modifyLogistics({
          tid: params.id,
          receiverState: P,
          receiverCity: C,
          receiverDistrict: D,
          receiverAddress: value.receiverAddress,
          receiverName: value.receiverName,
          receiverZip: value.receiverZip,
          receiverMobile: value.receiverMobile,
          receiverPhone: value.receiverPhone,
          companyCode: value.companyCode
        })
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
    const {item} = context.state;
    return {
      handleSubmit(value, key) {
        context.setState({
          params: value
        })
        key == 'submit' ? submitOrder({
          ...value,
          tid: params.id
        }) :
          key == 'delay' ? modifyItem({
            offlineStatus: '延迟发货',
            tid: params.id,
            ...value
          }) :
            key == 'again' ? modifyItem({
              offlineStatus: '重新理单',
              ...value,
              tid: params.id
            }) :
              key == 'unlock' ? modifyItem({
                ...value,
                tid: params.id,
                isLocked: item.is_Locked
              }) : ''
      },
      handleReset() {
      }
    }
  }

  render() {
    const {params, isShow, item} = this.state;
    const {loading, result, cResult, addrResult} = this.props;
    /**
     * 快递公司列表
     * @type {Array}
     */
    let cList = [];
    if (cResult) {
      cList = cResult.map(c=> {
        return {
          value: c.companyCode,
          title: c.companyName
        }
      });
    } else {
      cList = [{
        value: null,
        title: '正在加载中...'
      }]
    }
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

    return <Panel title=""><DealView isShow={isShow} result={result} item={item} cList={cList} addrResult={addrResult}
                                     edited={this.edited.bind(this)} {...formOptions} {...noteOptions} /></Panel>
  }
}

Deal.propTypes = {

  result: React.PropTypes.object,
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
  const {result, loading, cResult, addrResult, lResult, isJump,sendResult,modResult,isLogis} = state.deal;
  return {'result': result, loading, cResult, addrResult, lResult, isJump,sendResult,modResult,isLogis};
}

export default connect(mapStateToProps, mapActionCreators)(Deal)

