import React, { PropTypes, Component} from 'react'
import { connect } from 'react-redux'
import TableCascaderComView from '../components/TableCascaderComView'
import Panel from 'components/Panel'
import {queryList, addItem, modifyItem, deleteItem} from '../modules/TableCascaderTestReducer'

class TableCascaderTest extends Component {
  
    constructor(props) {
        super(props);
        
        this.getFormOptions = this.getFormOptions.bind(this)
        
        this.state = {
            // selectedItems: null,
            pageSize : 5,
            params: {}   //表格需要的筛选参数
        }
    }
    
    getPageNumber(location) {
        const {query} = location;
        return query && query.p ? Number(query.p) : 1;
    }

    componentDidMount() {
        const {queryList, location} = this.props;
        const {pageSize} = this.state;
        let pageNumber = this.getPageNumber(location);
        queryList({ pageNumber, pageSize});
    }
    
      /**
       * (表格功能配置项)
       * 
       * @returns (description)
       */
      getFormOptions() {
          const context = this;
          const {pageSize} = this.state;
          return {
              /**
               * (筛选表单提交)
               * 
               * @param value (description)
               */
              handleSubmit(value) {
                  context.setState({
                      params: {pageSize, ...value}
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
        const {params, selectedItems,pageSize} = this.state;
        const {items, queryList, totalItems, loading, location} = this.props;
        const tableOptions = {
            dataSource : items,                         //加载组件时，表格从容器里获取初始值
            action : queryList,                         //表格翻页时触发的action
            pagination : {                              //表格页码陪着，如果为false，则不展示页码
                total : totalItems,                     //数据总数
                pageSize,
                current : this.getPageNumber(location)
            },
            loading,                                    //表格加载数据状态
            params                                      //表格检索数据参数
        }
       
        const formOptions = {
            ...this.getFormOptions()
        }

        
        return <Panel title=""><TableCascaderComView tableOptions={tableOptions} formOptions={formOptions} /></Panel>
    }
}


TableCascaderTest.propTypes = {
    
    queryList: React.PropTypes.func,
    items: React.PropTypes.array.isRequired,
    totalItems: React.PropTypes.number.isRequired,
    
    loading: React.PropTypes.bool
}

const mapActionCreators = {
    queryList,
    deleteItem,
    modifyItem,
    addItem
}


const mapStateToProps = (state) => {
    const {result, loading} = state.tableCascaderTest;
    
    const {items = [], totalItems = 0} = result || {};
    return { items, totalItems, loading };
    
}

export default connect(mapStateToProps, mapActionCreators)(TableCascaderTest)

