import React, {PropTypes, Component} from 'react'
import {connect} from 'react-redux'
import InvoiceView from '../components/InvoiceView'
import Panel from 'components/Panel'
import {queryList, deleteItem, appList} from '../modules/InvoiceReducer'
import {getTimeStamp} from 'common/utils';
import {message} from 'hen';
class Invoice extends Component {

  constructor(props) {
    super(props);
    this.getFormOptions = this.getFormOptions.bind(this);
    this.getQuickOptions = this.getQuickOptions.bind(this);

    this.state = {
      params: {},
      selectList: [],
      tData: []
    }
  }

  /**
   * 单个发货
   * @param {row.shoppId,row.outSid}
   */
  isGive(row) {
    const context = this;
    const {deleteItem} = context.props;
    deleteItem({
      sendGoods: [{
        shoppId: row.shoppId,
        outSid: row.outSid
      }]
    })
  }

  /**
   * 批量发货
   * @param {row.shoppId,row.outSid}
   */
  isGiveM() {
    const context = this;
    const {deleteItem} = context.props;
    const {selectList} = this.state;
    deleteItem({sendGoods: selectList});
    context.setState({
      selectList: []
    })
  }


  componentDidMount() {
    const {queryList, location, appList} = this.props;
    const {query} = location;
    let pageNumber = query.p ? Number(query.p) : 1;
    queryList({pageNumber});
    /**
     * 获取该企业的所有店铺
     */
    appList()
  }

  componentWillReceiveProps(nextProps, preProps) {
    this.setState({
      tData: nextProps.items
    })
    if (nextProps.dResult) {
      message.info('发货结果：' + nextProps.dResult.success + '条成功' + ',' + nextProps.dResult.fail + '条失败', 1);
    }
    if (nextProps.isRefresh) {
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
    return {
      /**
       * (筛选表单提交)
       *
       * @param value (description)
       */
      handleSubmit(value) {
        const csTime = getTimeStamp(value.createStartTime), ceTime = getTimeStamp(value.createEndTime),
          rsTime = getTimeStamp(value.reviewStartTime), reTime = getTimeStamp(value.reviewEndTime)
        if (( csTime > ceTime) || (rsTime > reTime)) {
          message.error('开始时间不能晚于结束时间！');
          return false
        } else {
          context.setState({
            params: value
          })
        }
      },

      /**
       * (筛选表单重置)
       */
      handleReset() {
      }
    }
  }

  getQuickOptions() {
    const contex = this;
    return {
      /**
       *
       * (description)
       */
      doUp() {
        console.log('');
      },
    }
  }


  handleRowSelection() {
    return {
      onSelect: (record, selected, selectedRows) => {
        let selectList = selectedRows.map(c => {
          return {
            shoppId: c.shoppId,
            outSid: c.outSid
          }
        });
        this.setState({selectList});
      },
      onSelectAll: (selected, selectedRows, changeRows) => {
        let selectList = selectedRows.map(c => {
          return {
            shoppId: c.shoppId,
            outSid: c.outSid
          }
        });
        this.setState({selectList});
      }
    }
  }

  render() {
    const {params, selectList, tData} = this.state;
    const {items, queryList, totalItems, loading, appResult} = this.props;
    const tableOptions = {
      dataSource: tData,                         //加载组件时，表格从容器里获取初始值
      action: queryList,                         //表格翻页时触发的action
      pagination: {                              //表格页码配置，如果为false，则不展示页码
        total: totalItems                        //数据总数
      },
      loading,                                    //表格加载数据状态
      params,                                     //表格检索数据参数
      rowSelection: this.handleRowSelection(),    //需要checkbox时填写
      isGive: this.isGive.bind(this),
      isGiveM: this.isGiveM.bind(this)
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
          title: c.name
        }
      });
    } else {
      shopList = [{
        value: null,
        title: '正在加载中...'
      }]
    }
    const formOptions = {
      'formOptions': this.getFormOptions()
    }
    return <Panel title=""><InvoiceView {...tableOptions} {...formOptions} shopList={shopList} tData={tData}
                                                                           hasSelected={selectList.length > 0}
                                                                           selectList={selectList}
                                                                           quickOptions={this.getQuickOptions()}/></Panel>
  }
}


Invoice.propTypes = {

  queryList: React.PropTypes.func,
  items: React.PropTypes.array.isRequired,
  totalItems: React.PropTypes.number.isRequired,

  loading: React.PropTypes.bool
}

const mapActionCreators = {
  queryList,
  deleteItem,
  appList
}


const mapStateToProps = (state) => {
  const {result, loading, appResult, dResult, isRefresh} = state.invoice;
  const {items = [], totalItems = 0} = result || {};
  return {items, totalItems, loading, appResult, dResult, isRefresh};
}

export default connect(mapStateToProps, mapActionCreators)(Invoice)

