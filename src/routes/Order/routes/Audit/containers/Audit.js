import React, {PropTypes, Component} from 'react'
import {connect} from 'react-redux'
import AuditView from '../components/AuditView'
import Panel from 'components/Panel'
import {giveItem, deleteItem, appList, queryList,channelList} from '../modules/AuditReducer'
import {getTimeStamp} from 'common/utils';
import { message } from 'hen';
class Audit extends Component {

  constructor(props) {
    super(props);
    this.getFormOptions = this.getFormOptions.bind(this);
    this.getQuickOptions = this.getQuickOptions.bind(this);
    this.state = {
      params: {}   //表格需要的筛选参数
    }
  }

  /**
   * 放弃合并
   * @param row
   */
  notMerge(row,refresh) {
    const context = this;
    const {deleteItem} = context.props;
    deleteItem({
      mergeStatus: '放弃合并',
      tid: row.tid
    })
     refresh()
  }

  /**
   * 直接发货
   * @param row
   */
  isGive(row,refresh) {
    const context = this;
    const {giveItem} = context.props;
    giveItem({
      tid: row.tid
    })
    refresh()
  }

  componentDidMount() {
    const {queryList, location, appList,channelList} = this.props;
    const {query} = location;
    let pageNumber = query.p ? Number(query.p) : 1;
    queryList({pageNumber});
    /**
     * 获取该企业的所有店铺
     */
    appList()
    // 所属渠道
    channelList();
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
        if (getTimeStamp(value.createStartTime) > getTimeStamp(value.createEndTime)) {
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


  /**
   * (表格头部快捷按钮配功能置项)
   *
   * @returns (description)
   */
  getQuickOptions() {
    const contex = this;
    return {
      /**
       *
       * (description)
       */
      doUp() {
        console.log('快捷按钮');
      },
    }
  }

  handleRowSelection() {
    return {
      onSelect(record, selected, selectedRows) {
        console.log(record, selected, selectedRows);
      },
      onSelectAll(selected, selectedRows, changeRows) {
        console.log(selected, selectedRows, changeRows);
      },
    }
  }

  render() {
    const {params} = this.state;
    const {items, queryList, totalItems, loading, appResult,chResult} = this.props;
    const tableOptions = {
      dataSource: items,                         //加载组件时，表格从容器里获取初始值
      action: queryList,                         //表格翻页时触发的action
      pagination: {                              //表格页码陪着，如果为false，则不展示页码
        total: totalItems                      //数据总数
      },
      loading,                                    //表格加载数据状态
      params,                                     //表格检索数据参数
      //rowSelection : this.handleRowSelection()，    //需要checkbox时填写
      isGive: this.isGive.bind(this),
      notMerge: this.notMerge.bind(this)
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
    /**
     * 所属渠道
     * @type {Array}
     */
    let chList = [];
    if (chResult) {
        chList = chResult.map(c=> {
            return {
            value: c.channelCode,
            title: c.name
            }
        });
    } else {
        chList = [{
            value: null,
            title: '正在加载中...'
        }]
    }
    const formOptions = {
      'formOptions': this.getFormOptions()
    }

    return <Panel title=""><AuditView {...tableOptions} {...formOptions} quickOptions={this.getQuickOptions()}
                                                                         shopList={shopList} chList={chList} /></Panel>
  }
}


Audit.propTypes = {
  queryList: React.PropTypes.func,
  items: React.PropTypes.array.isRequired,
  totalItems: React.PropTypes.number.isRequired,
  loading: React.PropTypes.bool
}

const mapActionCreators = {
  queryList,
  appList,
  deleteItem,
  giveItem,
  channelList,
}

const mapStateToProps = (state) => {
  const {result, loading, appResult,giveResult,delResult,chResult} = state.audit;
  const {items = [], totalItems = 0} = result || {};
  return {items, totalItems, loading, appResult,giveResult,delResult,chResult};

}

export default connect(mapStateToProps, mapActionCreators)(Audit)

