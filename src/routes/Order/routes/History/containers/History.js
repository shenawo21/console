import React, {PropTypes, Component} from 'react'
import {connect} from 'react-redux'
import HistoryView from '../components/HistoryView'
import Panel from 'components/Panel'
import {queryList, appList} from '../modules/HistoryReducer'
import {getTimeStamp} from 'common/utils';
import {message} from 'hen';
class History extends Component {

  constructor(props) {
    super(props);
    this.getFormOptions = this.getFormOptions.bind(this);
    this.getQuickOptions = this.getQuickOptions.bind(this);
    this.state = {
      params: {
        payTimeSort: '0'
      },

    }
  }

  componentDidMount() {
    const {queryList, location, appList} = this.props;
    const {params} = this.state;
    const {query} = location;
    let pageNumber = query.p ? Number(query.p) : 1;
    let payTimeSort = params.payTimeSort;
    queryList({pageNumber, payTimeSort});
    /**
     * 获取该企业的所有店铺
     */
    appList()
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
        if ((getTimeStamp(value.payStartTime) > getTimeStamp(value.payEndTime)) || (getTimeStamp(value.shoppStartTime) > getTimeStamp(value.shoppEndTime))) {
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
    const {items, queryList, totalItems, loading, appResult} = this.props;
    const tableOptions = {
      dataSource: items,                         //加载组件时，表格从容器里获取初始值
      action: queryList,                         //表格翻页时触发的action
      pagination: {                              //表格页码配置，如果为false，则不展示页码
        total: totalItems                      //数据总数
      },
      loading,                                    //表格加载数据状态
      params,                                     //表格检索数据参数
      //rowSelection: this.handleRowSelection()    //需要checkbox时填写
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

    return <Panel title=""><HistoryView {...tableOptions} downParams={params} {...formOptions} shopList={shopList}
                                                          quickOptions={this.getQuickOptions()}/></Panel>
  }
}

History.propTypes = {

  queryList: React.PropTypes.func,
  items: React.PropTypes.array.isRequired,
  totalItems: React.PropTypes.number.isRequired,
  loading: React.PropTypes.bool
}

const mapActionCreators = {
  queryList,
  appList
}


const mapStateToProps = (state) => {
  const {result, loading, appResult} = state.history;
  const {items = [], totalItems = 0} = result || {};
  return {items, totalItems, loading, appResult};

}

export default connect(mapStateToProps, mapActionCreators)(History)

