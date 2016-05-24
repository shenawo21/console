import React, { PropTypes, Component} from 'react'
import { connect } from 'react-redux'
import <%= pascalEntityName %>View from '../components/<%= pascalEntityName %>View'
import Panel from 'components/Panel'
import {queryList, addItem, modifyItem, deleteItem} from '../modules/<%= pascalEntityName %>Reducer'

class <%= pascalEntityName %> extends Component {
  
    constructor(props) {
        super(props);
        <% if (hasSearch === 'true' || type === 'form') { %>
        this.getFormOptions = this.getFormOptions.bind(this);
        <% } %>
        <% if (hasQuickButton === 'true') { %>
        this.getQuickOptions = this.getQuickOptions.bind(this);
        <% } %>
        this.state = {
            params: {}   //表格需要的筛选参数
        }
    }
    
    componentDidMount() {
        <% if (type === 'table') { %>
        const {queryList, location} = this.props;
        const {query} = location;
        let pageNumber = query.p ? Number(query.p) : 1;
        queryList({ pageNumber });
        <% } %>
    }
    <% if (hasSearch === 'true' || type === 'form') { %>
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
    <% } %>
    <% if (hasQuickButton === 'true') { %>
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
    <% } %>
    <% if (type === 'table') { %>
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
    <% } %>
    render() {
        const {params} = this.state;
        <% if (type === 'table') { %>
        const {items, queryList, totalItems, loading} = this.props;
        const tableOptions = {
            dataSource : items,                         //加载组件时，表格从容器里获取初始值
            action : queryList,                         //表格翻页时触发的action
            pagination : {                              //表格页码陪着，如果为false，则不展示页码
                total : totalItems                      //数据总数
            },  
            loading,                                    //表格加载数据状态
            params,                                     //表格检索数据参数
            rowSelection : this.handleRowSelection()    //需要checkbox时填写
        }
        <% }else{ %>
           const {loading, result} = this.props;
           const formOptions = {
              loading, 
              result,
              'formOptions' : this.getFormOptions()
           }
        <% } %>
        <% if (hasSearch === 'true' && type !== 'form'){  %>
        const formOptions = {
            'formOptions' : this.getFormOptions()
        }
        <% } %>
        return <Panel title=""><<%= pascalEntityName %>View <% if (type === 'table') { %>{...tableOptions}<% } %><% if (hasSearch === 'true' || type === 'form') { %> {...formOptions}<% } %><% if (hasQuickButton === 'true') { %> quickOptions={this.getQuickOptions()} <% } %> /></Panel>
    }
}


<%= pascalEntityName %>.propTypes = {
    <% if (type === 'table') { %>
    queryList: React.PropTypes.func,
    items: React.PropTypes.array.isRequired,
    totalItems: React.PropTypes.number.isRequired,
    <% }else{ %>
    result: React.PropTypes.bool,
    deleteItem: React.PropTypes.func,
    modifyItem: React.PropTypes.func,
    addItem : React.PropTypes.func,
    <% } %>
    loading: React.PropTypes.bool
}

const mapActionCreators = {
    queryList,
    deleteItem,
    modifyItem,
    addItem
}


const mapStateToProps = (state) => {
    const {result, loading} = state.<%= camelEntityName %>;
    <% if (type === 'table') { %>
    const {items = [], totalItems = 0} = result || {};
    return { items, totalItems, loading };
    <% }else{ %>
    return { 'result' : result, loading };
    <% } %>
}

export default connect(mapStateToProps, mapActionCreators)(<%= pascalEntityName %>)

