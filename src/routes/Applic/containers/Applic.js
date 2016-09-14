import React, { PropTypes, Component} from 'react'
import { connect } from 'react-redux'
import ApplicView from '../components/ApplicView'
import Panel from 'components/Panel'
import {queryList, enabledItem, disabledItem, deleteItem} from '../modules/ApplicReducer'

class Applic extends Component {

    constructor(props) {
        super(props);
        this.getFormOptions = this.getFormOptions.bind(this);
        this.getQuickOptions = this.getQuickOptions.bind(this);
        this.state = {
            params: {}   //表格需要的筛选参数
        }
    }

  //删除
  delApp(id) {
    const {deleteItem} = this.props;
    deleteItem({shopId: id})
  }

  //激活 禁用
  isAble(row, id) {
    const {enabledItem, disabledItem} = this.props;
    if (row.enabled) {
      //调用禁用
      disabledItem({shopId: id})
    } else {
      //调用激活
      enabledItem({shopId: id})
    }
  }

    componentDidMount() {

        const {queryList, location} = this.props;
        const {query} = location;
        let pageNumber = query.p ? Number(query.p) : 1;
        queryList({ pageNumber });

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


       /**
       * (表格头部快捷按钮配功能置项)
       *
       * @returns (description)
       */
      getQuickOptions(){
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

        const {items, queryList, totalItems, loading} = this.props;
        const tableOptions = {
            dataSource : items,                         //加载组件时，表格从容器里获取初始值
            action : queryList,                         //表格翻页时触发的action
            pagination : {                              //表格页码陪着，如果为false，则不展示页码
                total : totalItems                      //数据总数
            },
            loading,                                    //表格加载数据状态
            params,                                     //表格检索数据参数
            //rowSelection : this.handleRowSelection()    //需要checkbox时填写
          delApp: this.delApp.bind(this),
          isAble: this.isAble.bind(this)
        }


        const formOptions = {
            'formOptions' : this.getFormOptions()
        }

        return <Panel title=""><ApplicView {...tableOptions} {...formOptions} quickOptions={this.getQuickOptions()}  /></Panel>
    }
}


Applic.propTypes = {

    queryList: React.PropTypes.func,
    items: React.PropTypes.array.isRequired,
    totalItems: React.PropTypes.number.isRequired,

    loading: React.PropTypes.bool
}

const mapActionCreators = {
    queryList,
    deleteItem,
    enabledItem,
    disabledItem
}


const mapStateToProps = (state) => {
    const {result, loading,deResult,enResult,disResult} = state.applic;
    const {items = [], totalItems = 0} = result || {};
    return { items, totalItems, loading,deResult,enResult,disResult};

}

export default connect(mapStateToProps, mapActionCreators)(Applic)

