import React, {PropTypes, Component} from 'react'
import {connect} from 'react-redux'
import AddView from '../components/AddView'
import Panel from 'components/Panel'
import {appList, companyList, addrList, addItem, cateList, proList} from '../modules/AddReducer'
import {message} from 'hen';
import {getSpecValue} from 'common/utils';

class Add extends Component {
  constructor(props) {
    super(props);
    this.getFormOptions = this.getFormOptions.bind(this);
    this.state = {
      params: {},
      selectList: {},
      tabDataSource: [],
      selectTable: [],
      realPrice:null
    }
  }

  componentDidMount() {
    const {appList, companyList, addrList, cateList, proList}=this.props;
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

  componentWillReceiveProps(nextProps, preProps) {
    if (nextProps.isJump) {
      setTimeout(()=> {
        nextProps.history.replace('/order/invoice');
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
    const {addItem} = context.props;
    const {selectTable} = context.state;
    return {
      /**
       * (筛选表单提交)
       *
       * @param value (description)
       */
      handleSubmit(value, key) {
        if (selectTable.length > 0) {
          value.dtos = selectTable;
          selectTable.map((s)=> {
            if (s.num == null) {
              message.warning('请重新输入并勾选商品！');
              return false;
            }
          })
        } else {
          message.warning('请勾选订单商品！');
          return false;
        }
        let P = '', C = '', D = '';
        if (value.receiverAddr) {
          P = value.receiverAddr[0];
          C = value.receiverAddr[1];
          D = value.receiverAddr[2]
        }
        key == 'commit' ? addItem({
          title: value.title,
          buyerNick: value.buyerNick,
          dtos: value.dtos,
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
        }) : ''
      },
      /**
       * (筛选表单重置)
       */
      handleReset() {
      }
    }
  }

  isOK(data) {
    const context = this;
    context.setState({
      tabDataSource: data
    })
  }

  chooseFormOption() {
    const context = this;
    return {
      handleSubmit(value) {
        context.setState({
          params: value
        })
      },
      handleReset() {
      }
    }
  }

  rowtabSelection() {
    return {
      onSelect: (record, selected, selectedRows) => {
        selectedRows.map((s)=> {
          if (s.num == null) {
            message.warning('购买数量不能为空！');
            return false;
          }
        })
        let selectTable = selectedRows.map(c => {
          return {
            outerIid: c.outerIid,
            outerSkuId: c.outerSkuId,
            title: c.title,
            cid: c.cid,
            price: c.price,
            num: c.num,
            skuPropertiesName: getSpecValue(c),
            stockId: c.stockId,
            shopId: c.shopId
          }
        });
        this.setState({selectTable});
        if (selectTable.length > 0) {
          let sum = selectTable.map((s)=> {
            return s.num * s.price
          })
          let amount = 0;
          for (var i = 0; i < sum.length; i++) {
            amount += sum[i];
          }
          this.setState({realPrice:amount});
        }
      },
      onSelectAll: (selected, selectedRows, changeRows) => {
        selectedRows.map((s)=> {
          if (s.num == null) {
            message.warning('购买数量不能为空！');
            return false;
          }
        })
        let selectTable = selectedRows.map(c => {
          return {
            outerIid: c.outerIid,
            outerSkuId: c.outerSkuId,
            title: c.title,
            cid: c.cid,
            price: c.price,
            num: c.num,
            skuPropertiesName: getSpecValue(c),
            stockId: c.stockId,
            shopId: c.shopId
          }
        });
        this.setState({selectTable});
        if (selectTable.length > 0) {
          let sum = selectTable.map((s)=> {
            return s.num * s.price
          })
          let amount = 0;
          for (var i = 0; i < sum.length; i++) {
            amount += sum[i];
          }
          this.setState({realPrice:amount});
        }
      }
    }
  }

  chooseRowSelection() {
    return {
      onSelect: (record, selected, selectedRows) => {
        let selectList = selectedRows.map(c => {
          return {
            //Spu ID
            outerIid: c.spuId,
            //Sku ID
            outerSkuId: c.skuId,
            //商品名称
            title: c.title,
            //商品类目
            cid: c.categoryCode,
            //销售价
            price: c.price,
            //在售库存
            stock: c.stock,
            //属性...
            specOneValue: c.specOneValue,
            specTwoValue: c.specTwoValue,
            specThreeValue: c.specThreeValue,
            specFourValue: c.specFourValue,
            stockId: c.stockId,
            shopId: c.shopId,
            //购买数量
            num: null,
            //商品金额
            totalFee: null
          }
        });
        this.setState({selectList});
      },
      onSelectAll: (selected, selectedRows, changeRows) => {
        let selectList = selectedRows.map(c => {
          return {
            outerIid: c.spuId,
            outerSkuId: c.skuId,
            title: c.title,
            cid: c.categoryCode,
            price: c.price,
            marketPrice: c.marketPrice,
            stock: c.stock,
            specOneValue: c.specOneValue,
            specTwoValue: c.specTwoValue,
            specThreeValue: c.specThreeValue,
            specFourValue: c.specFourValue,
            num: null,
            totalFee: null,
            shopId: null,
            stockId: c.stockId
          }
        });
        this.setState({selectList});
      }
    }
  }

  render() {
    const {params, selectList, tabDataSource, realPrice} = this.state;
    const {loading, items, proList, result, appResult, cResult, totalItems, addrResult, cateResult, proResult} = this.props;
    const chooseTableOptions = {
      dataSource: items,                         //加载组件时，表格从容器里获取初始值
      action: proList,                         //表格翻页时触发的action
      pagination: {                              //表格页码配置，如果为false，则不展示页码
        total: totalItems                        //数据总数
      },
      loading,                                   //表格加载数据状态
      params,                                    //表格检索数据参数
      rowSelection: this.chooseRowSelection()    //需要checkbox时填写
    }
    /**
     * 店铺列表
     * @type {Array}
     */
    let shopList = [];
    if (appResult) {
      shopList = appResult.map(c=> {
        return {
          value: c.shopId,
          title: c.name,
          //disabled: (c.status != 'use' || c.enabled == false) ? true : false
        }
      });
    } else {
      shopList = [{
        value: null,
        title: '正在加载中...'
      }]
    }
    ;
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

    return <Panel title=""><AddView  {...formOptions} cList={cList} addrResult={addrResult} proResult={proResult}
                                                      chooseTableOptions={chooseTableOptions}
                                                      chooseFormOption={this.chooseFormOption.bind(this)}
                                                      rowtabSelection={this.rowtabSelection.bind(this)}
                                                      isOK={this.isOK.bind(this)}
                                                      cList={cList}
                                                      tabDataSource={tabDataSource}
                                                      shopList={shopList}
                                                      realPrice={realPrice}
                                                      selectList={selectList} cateList={loop(cateResult)}/></Panel>
  }
}

Add.propTypes = {
  result: React.PropTypes.object,
  addItem: React.PropTypes.func,
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
  const {result, loading, appResult, cResult, addrResult, cateResult, proResult, isJump} = state.add;
  const {items = [], totalItems = 0} = proResult || {};
  return {'result': result, items, totalItems, loading, appResult, cResult, addrResult, cateResult, proResult, isJump};
}

export default connect(mapStateToProps, mapActionCreators)(Add)
