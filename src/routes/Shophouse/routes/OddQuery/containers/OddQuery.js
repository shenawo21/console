import React, { PropTypes, Component} from 'react'
import { connect } from 'react-redux'
import OddQueryView from '../components/OddQueryView'
import Panel from 'components/Panel'
import { storageQueryList, outgoQueryList } from '../modules/OddQueryReducer'

class OddQuery extends Component {
  
    constructor(props) {
        super(props);
        
        this.getFormOptions = this.getFormOptions.bind(this);
        
        
        this.state = {
            oddStatus: true,
            params: {}   //表格需要的筛选参数
        }
    }
    
     /**
     * (判断出库/入库)
     * @params id
     */
    _isQueryStatus(key){
        const _this = this;
        const {storageQueryList, outgoQueryList, location} = this.props;
        const {query} = location;
        let pageNumber = query.p ? Number(query.p) : 1;
        if(key == 1){
            outgoQueryList({ pageNumber });
            _this.setState({ oddStatus: true });
        }else{
            storageQueryList({ pageNumber });
            _this.setState({ oddStatus: false });
        }
    }

    componentDidMount() {
        const {storageQueryList, outgoQueryList, location} = this.props;
        const {query} = location;
        let pageNumber = query.p ? Number(query.p) : 1;
        outgoQueryList({ pageNumber });
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
        const {params, oddStatus} = this.state;
        
        const {items, storageQueryList, outgoQueryList, totalItems, loading} = this.props;
        const tableOptions = {
            dataSource : items,                         //加载组件时，表格从容器里获取初始值
            action : oddStatus ? outgoQueryList : storageQueryList,                  //表格翻页时触发的action
            pagination : {                              //表格页码陪着，如果为false，则不展示页码
                total : totalItems                      //数据总数
            },  
            loading,                                    //表格加载数据状态
            params,                                     //表格检索数据参数
            isStatus: this._isQueryStatus.bind(this)        //判断出库/入库
            //rowSelection : this.handleRowSelection()    //需要checkbox时填写
        }
        
        
        const formOptions = {
            'formOptions' : this.getFormOptions()
        }
        
        return <Panel title=""><OddQueryView {...tableOptions} {...formOptions} /></Panel>
    }
}


OddQuery.propTypes = {
    
    storageQueryList: React.PropTypes.func,
    outgoQueryList: React.PropTypes.func,
    items: React.PropTypes.array.isRequired,
    totalItems: React.PropTypes.number.isRequired,
    
    loading: React.PropTypes.bool
}

const mapActionCreators = {
    storageQueryList,
    outgoQueryList
}


const mapStateToProps = (state) => {
    const {result, loading} = state.oddQuery;
    
    const {items = [], totalItems = 0} = result || {};
    return { items, totalItems, loading };
    
}

export default connect(mapStateToProps, mapActionCreators)(OddQuery)

