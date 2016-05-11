import React, { PropTypes, Component} from 'react'
import { connect } from 'react-redux'
import <%= pascalEntityName %>View from '../components/<%= pascalEntityName %>View'
import Panel from 'components/Panel'
import {queryList, addItem, modifyItem, deleteItem} from '../modules/<%= pascalEntityName %>Reducer'

class <%= pascalEntityName %> extends Component {
  
    constructor(props) {
        super(props);
        <% if (hasSearch === 'true') { %>
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
    <% if (hasSearch === 'true') { %>
      getFormOptions() {
          const context = this;
          return {
              /**
               * (筛选表单提交)
               * 
               * @param value (description)
               */
              handleSubmit(value) {
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
    /**
     * (表格头部快捷按钮配功能置项)
     * 
     * @returns (description)
     */
    <% if (hasQuickButton === 'true') { %>
      getQuickOptions(){
          const contex = this;
          return {
              /**
               * 
               * (description)
               */
              doUp() {
                  //console.log(111);
              },
          }
      }
    <% } %>
    
    handleRowSelection() {
        return {
            onSelect(record, selected, selectedRows) {
               // console.log(record, selected, selectedRows);
            },
            onSelectAll(selected, selectedRows, changeRows) {
               // console.log(selected, selectedRows, changeRows);
            },
        }
    }

    render() {
        const {items, queryList, totalItems, loading} = this.props;
        const {params} = this.state;
        
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

        return <Panel title=""><<%= pascalEntityName %>View {...tableOptions}<% if (hasSearch === 'true') { %> formOptions={this.getFormOptions()}<% } %><% if (hasQuickButton === 'true') { %> quickOptions={this.getQuickOptions()} <% } %> /></Panel>
    }
}


<%= pascalEntityName %>.propTypes = {
    items: React.PropTypes.array.isRequired,
    queryList: React.PropTypes.func.isRequired,
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
    const {result, loading} = state.<%= camelEntityName %>;
    const {items = [], totalItems = 0} = result.data || {};
    return { items, totalItems, loading };
}

export default connect(mapStateToProps, mapActionCreators)(<%= pascalEntityName %>)

