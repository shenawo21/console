import React, { PropTypes, Component} from 'react'
import { connect } from 'react-redux'
import AdjustStockView from '../components/AdjustStockView'
import Panel from 'components/Panel'
import {adjustStock, getAirList} from '../modules/AdjustStockReducer'

class AdjustStock extends Component {
  
    constructor(props) {
        super(props);
        
        this.getFormOptions = this.getFormOptions.bind(this);       
        
        this.state = {
            item: {},
            params: {},  //表格需要的筛选参数
            pageSize: 5
        }
    }
    
    //获取分页页码
    getPageNumber(location) {
        const {query} = location;
        return query && query.p ? Number(query.p) : 1;
    }

    componentDidMount() {        
        const {adjustStock, location} = this.props;
        const {pageSize} = this.state;
        let pageNumber = getPageNumber();
        adjustStock({ pageNumber });
        
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

              },

              /**
               * (筛选表单重置)
               */
              handleReset() {
              }
          }
      }   
    
    
    render() {
        const {item, params, selectedItems, shopList, pageSize} = this.state;
        
        const {items, getAirList, totalItems, loading, location} = this.props;
        const tableOptions = {
            dataSource : items,                         //加载组件时，表格从容器里获取初始值
            action : getAirList,                         //表格翻页时触发的action
            pagination : {                              //表格页码陪着，如果为false，则不展示页码
                total : totalItems,                      //数据总数
                pageSize,
                current : this.getPageNumber(location)
            },  
            loading,                                    //表格加载数据状态
            params,                                     //表格检索数据参数
        }
        
        
        const formOptions = {
            'formOptions' : this.getFormOptions()
        }
        
        return <Panel title=""><AdjustStockView {...tableOptions} {...formOptions} /></Panel>
    }
}


AdjustStock.propTypes = {
    
    adjustStock: React.PropTypes.func,
    getAirList: React.PropTypes.func, 
    loading: React.PropTypes.bool,
    result: React.PropTypes.object,
}

const mapActionCreators = {
    adjustStock,
    getAirList
}


const mapStateToProps = (state) => {
    const {result, airListResult, loading} = state.adjustStock;
    
    const {items = [], totalItems = 0} = airListResult || {};
    return { items, totalItems, 'result': result, loading };
    
}

export default connect(mapStateToProps, mapActionCreators)(AdjustStock)

