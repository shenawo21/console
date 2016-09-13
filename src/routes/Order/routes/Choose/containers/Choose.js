import React, {PropTypes, Component} from 'react'
import {connect} from 'react-redux'
import ChooseView from '../components/ChooseView'
import {queryList, appList, cateList} from '../modules/ChooseReducer'

class Choose extends Component {

  constructor(props) {
    super(props);
    this.getFormOptions = this.getFormOptions.bind(this);
    this.state = {
      params: {}
    }
  }

  componentDidMount() {
    const {queryList, location, companyList, cateList} = this.props;
    const {query} = location;
    let pageNumber = query.p ? Number(query.p) : 1;
    queryList({pageNumber});
    /**
     * 店铺列表
     */
    companyList();
    /**
     * 类目列表
     */
    cateList();

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
        console.log(value)
        context.setState({
          params: value
        })
      },

      /**
       * (筛选表单重置)
       */
      handleReset() {
      }
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

    const {items, queryList, totalItems, loading, cateResult, appResult} = this.props;
    const tableOptions = {
      dataSource: items,                         //加载组件时，表格从容器里获取初始值
      action: queryList,                         //表格翻页时触发的action
      pagination: {                              //表格页码配置，如果为false，则不展示页码
        total: totalItems                         //数据总数
      },
      loading,                                    //表格加载数据状态
      params,                                     //表格检索数据参数
      rowSelection: this.handleRowSelection()    //需要checkbox时填写
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
    ;
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
    return <ChooseView {...tableOptions} formOptions={this.getFormOptions()}
                                       shopList={shopList} cateList={loop(cateResult)}/>
  }
}

Choose.propTypes = {
  queryList: React.PropTypes.func,
  items: React.PropTypes.array.isRequired,
  totalItems: React.PropTypes.number.isRequired,
  loading: React.PropTypes.bool
}

const mapActionCreators = {
  queryList,
  appList,
  cateList
}

const mapStateToProps = (state) => {
  const {result, loading, appResult, cateResult} = state.choose;
  const {items = [], totalItems = 0} = result || {};
  return {items, totalItems, loading, appResult, cateResult};

}

export default connect(mapStateToProps, mapActionCreators)(Choose)

