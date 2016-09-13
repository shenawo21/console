import React, {PropTypes, Component} from 'react'
import {connect} from 'react-redux'
import AddView from '../components/AddView'
import Panel from 'components/Panel'
import {appList,companyList,addrList,addItem,cateList,proList} from '../modules/AddReducer'

class Add extends Component {
  constructor(props) {
    super(props);
    this.getFormOptions = this.getFormOptions.bind(this);
    this.state = {
      params: {}   //表格需要的筛选参数
    }
  }

  componentDidMount() {
    const {appList,companyList,addrList,cateList,proList}=this.props;
    //店铺列表
    appList();
    //物流公司列表
    companyList();
    //省市区列表
    addrList();
    //类目列表
    cateList();
    //仓库商品列表
    proList()
  }
  /**
   * (表格功能配置项)
   *
   * @returns (description)
   */
  getFormOptions() {
    const context = this;
    const {addItem} = context.props;
    return {
      /**
       * (筛选表单提交)
       *
       * @param value (description)
       */
      handleSubmit(value,key) {
        console.log(value)
        let P = '', C = '', D = '';
        if (value.receiverAddr) {
          P = value.receiverAddr[0];
          C = value.receiverAddr[1];
          D = value.receiverAddr[2]
        }
        key=='commit'?addItem({
          title: value.title,
          shopId: value.shopId,
          buyerNick: value.buyerNick,
          invoiceType: value.invoiceType,
          receiverState: P,
          receiverCity: C,
          receiverDistrict: D,
          receiverAddress: value.receiverAddress,
          receiverName: value.receiverName,
          receiverMobile: value.receiverMobile,
          receiverPhone: value.receiverPhone,
          receiverZip: value.receiverZip,
          companyCode: value.companyCode,
          remark: value.remark
        }):
        context.setState({
          params: ''
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
    const {loading, result,appResult,cResult, addrResult,cateResult,proResult} = this.props;
    /**
     * 店铺列表
     * @type {Array}
     */
    let shopList = [];
    if (appResult) {
      shopList = appResult.map(c=> {
        return {
          value: c.shopId,
          title: c.name
        }
      });
    } else {
      shopList = [{
        value: null,
        title: '正在加载中...'
      }]
    };
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
    /**
     * 类目列表
     * @param lists
     * @returns {*}
     */
    const loop = (lists) => {
      return lists && lists.map(a => {
          let children = a.level < 3 ? loop(a.children) : '';

          if (children) {
            return {
              value: a.categoryCode + '',
              label: a.name,
              children
            }
          } else {
            return {
              value: a.categoryCode + '',
              label: a.name
            }
          }
        })
    }
    const formOptions = {
      loading,
      result,
      'formOptions': this.getFormOptions()
    }

    return <Panel title=""><AddView  {...formOptions} cList={cList} addrResult={addrResult} 
                                                      shopList={shopList} cateList={loop(cateResult)} /></Panel>
  }
}

Add.propTypes = {
  result: React.PropTypes.object,
  addItem : React.PropTypes.func,
  loading: React.PropTypes.bool
}

const mapActionCreators = {
  appList,
  companyList,
  addrList,
  addItem,
  cateList,
  proList
}

const mapStateToProps = (state) => {
  const {result, loading, appResult,cResult, addrResult,cateResult,proResult} = state.add;
  return {'result': result, loading, appResult,cResult, addrResult,cateResult,proResult};
}

export default connect(mapStateToProps, mapActionCreators)(Add)

