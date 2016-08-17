import React, { PropTypes, Component} from 'react'
import { connect } from 'react-redux'
import VirtualhouseView from '../components/VirtualhouseView'
import Panel from 'components/Panel'
import { virhoustQueryList, getShopStocks } from '../modules/virtualhouseReducer'

class Virtualhouse extends Component {
  
    constructor(props) {
        super(props);
        
        this.getFormOptions = this.getFormOptions.bind(this);

        // this.handleModal = this.handleModal.bind(this);    
        
        this.getQuickOptions = this.getQuickOptions.bind(this);
        
        this.state = {
            params: {},   //表格需要的筛选参数
            stockParams: {},
            selectList: [],
            visible: false
        }
    }    
    
    componentDidMount() {
        
        const {virhoustQueryList, location} = this.props;
        const {query} = location;
        let pageNumber = query.p ? Number(query.p) : 1;
        virhoustQueryList({ pageNumber });       
        
        
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
            
        }
    }
    
    
    
    handleRowSelection() {
        return {
            onSelect : (record, selected, selectedRows) => {
                let selectList = selectedRows.map(c => c.skuId);                
                this.setState({selectList:selectList});
            },
            onSelectAll : (selected, selectedRows, changeRows) => {
                let selectList = selectedRows.map(c => c.skuId);
                this.setState({selectList});
            },
        }
    }

    handleModal() {
        return {
            showModal : (id) => {
                console.log(id,'this');
                const { getShopStocks } = this.props;
                getShopStocks({skuId: id});
                this.setState({
                    visible: true,
                });
            },
            handleOk : () => {
                console.log('点击了确定');
                this.setState({
                    visible: false,
                });
            },
            handleCancel : (e) => {
                console.log(e);
                this.setState({
                    visible: false,
                });
            }
        }
    }
    
    render() {
        const {params, stockParams, selectList, visible} = this.state;
        
        const {items, stockItems, virhoustQueryList, getShopStocks, totalItems, loading} = this.props;
        console.log(stockItems,'stockItems');
        const tableOptions = {
            dataSource : items,                         //加载组件时，表格从容器里获取初始值
            action : virhoustQueryList,                 //表格翻页时触发的action
            pagination : {                              //表格页码陪着，如果为false，则不展示页码
                total : totalItems                      //数据总数
            },  
            loading,                                    //表格加载数据状态
            params,                                     //表格检索数据参数            
            rowSelection : this.handleRowSelection(),    //需要checkbox时填写
            'handleModal' : this.handleModal()
        }
        const stockTableOptions = {
            dataSource : stockItems,                    //加载组件时，表格从容器里获取初始值
            //action : getShopStocks,                     //表格翻页时触发的action
            loading                                    //表格加载数据状态
        }        
        
        const formOptions = {
            'formOptions' : this.getFormOptions()
        }
        
        return <Panel title=""><VirtualhouseView tableOptions={tableOptions} stockTableOptions={stockTableOptions} {...formOptions} quickOptions={this.getQuickOptions()} 
                                                 selectList={selectList} visible={visible} /></Panel>
    }
}

Virtualhouse.propTypes = {    
    virhoustQueryList: React.PropTypes.func,
    getShopStocks: React.PropTypes.func,    
    items: React.PropTypes.array.isRequired,
    stockItems: React.PropTypes.array.isRequired,
    totalItems: React.PropTypes.number.isRequired,    
    loading: React.PropTypes.bool
}

const mapActionCreators = {
    virhoustQueryList,
    getShopStocks
}


const mapStateToProps = (state) => {
    const {result, stockResult, loading} = state.virtualhouse;
    
    const {items = [], stockItems = [], totalItems = 0} = result || {};
    return { items, stockItems: stockResult, totalItems, loading };

    //return {'result': result, 'roleListResult' : roleListResult, loading, jump};
    
}

export default connect(mapStateToProps, mapActionCreators)(Virtualhouse)

