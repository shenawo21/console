import React, { PropTypes, Component} from 'react'
import { connect } from 'react-redux'
import LogisticsView from '../components/LogisticsView'
import Panel from 'components/Panel'
import {queryList, addItem, modifyItem, deleteItem} from '../modules/LogisticsReducer'

class Logistics extends Component {
  
    constructor(props) {
        super(props);
        this.getQuickOptions = this.getQuickOptions.bind(this);
        this.state = {}
    }
    
    componentDidMount() {
        const {queryList} = this.props;
        queryList();
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

    render() {
        const {params} = this.state;
        const {items, queryList, totalItems, loading} = this.props;
        const tableOptions = {
            dataSource : items,                         //加载组件时，表格从容器里获取初始值
            loading                                     //表格加载数据状态
        }
        return <Panel title=""><LogisticsView  tableOptions＝{tableOptions}  quickOptions={this.getQuickOptions()} /></Panel>
    }
}


Logistics.propTypes = {
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
    const {result, loading} = state.logistics;
    
    const {items = [], totalItems = 0} = result || {};
    return { items, totalItems, loading };
    
}

export default connect(mapStateToProps, mapActionCreators)(Logistics)

