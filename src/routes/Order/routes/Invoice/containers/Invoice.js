import React, {PropTypes, Component} from 'react'
import {connect} from 'react-redux'
import InvoiceView from '../components/InvoiceView'
import Panel from 'components/Panel'
import {queryList, deleteItem, appList} from '../modules/InvoiceReducer'

class Invoice extends Component {

  constructor(props) {
    super(props);
    this.getFormOptions = this.getFormOptions.bind(this);
    this.getQuickOptions = this.getQuickOptions.bind(this);

    this.state = {
      params: {},
      selectList: []
    }
  }

  /**
   * 单个发货
   * @param {row.shoppId,row.outSid}
   */
  isGive(row) {
    const context = this;
    let ids = [];
    /**
     * {row.shoppId,.rowoutSid}
     */
    ids.push(id);
    const {deleteItem} = context.props;
    //deleteItem({List: ids})
  }

  /**
   * 批量发货
   * @param {row.shoppId,row.outSid}
   */
  isGiveM() {
    const context = this;
    const {deleteItem} = context.props;
    const {selectList} = this.state;
    //deleteItem({List: selectList});
    context.setState({
      selectList: []
    })
  }

  componentDidMount() {
    const {queryList, location,appList} = this.props;
    const {query} = location;
    let pageNumber = query.p ? Number(query.p) : 1;
    queryList({pageNumber});
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
    const {params, selectList} = this.state;
    const {items, queryList, totalItems, loading, appResult} = this.props;
    const tableOptions = {
      dataSource: items,                         //加载组件时，表格从容器里获取初始值
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
    return <Panel title=""><InvoiceView {...tableOptions} {...formOptions} shopList={shopList} items={items}
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
  const {result, loading, appResult} = state.invoice;

  const {items = [], totalItems = 0} = result || {};
  return {items, totalItems, loading, appResult};

}

export default connect(mapStateToProps, mapActionCreators)(Invoice)

