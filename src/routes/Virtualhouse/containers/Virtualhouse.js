import React, { PropTypes, Component} from 'react'
import { connect } from 'react-redux'
import VirtualhouseView from '../components/VirtualhouseView'
import Panel from 'components/Panel'
import { virhoustQueryList, getShopStocks, virCateList,delProduct} from '../modules/virtualhouseReducer'

class Virtualhouse extends Component {
  
    constructor(props) {
        super(props);
        
        this.getFormOptions = this.getFormOptions.bind(this);  
        this.delSubmit = this.delSubmit.bind(this);
        this.getQuickOptions = this.getQuickOptions.bind(this);
        
        this.state = {
            params: {},   //表格需要的筛选参数
            stockParams: {},
            selectList: [],
            visible: false
        }
    }    
    
    componentDidMount() {
        
        const {virhoustQueryList, virCateList, location} = this.props;
        const {query} = location;
        let pageNumber = query.p ? Number(query.p) : 1;
        /**
         * 虚拟总仓列表
         */
        virhoustQueryList({ pageNumber });
        /**
         * 商品类目列表
         */
        virCateList();
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
                  const {selectList} = context.state;
                  if(value.categoryCode){ value.categoryCode = value.categoryCode[value.categoryCode.length - 1]}
                  context.setState({
                      params: value,
                      selectList: []
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
                const { getShopStocks } = this.props;
                getShopStocks({skuId: id});
                this.setState({
                    visible: true,
                });
            },
            handleOk : () => {
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
    delSubmit (id,status,refresh) {
        const context = this
        const {delProduct,virhoustQueryList} = context.props
        let delStatus = status == 0 ? 1 : 0
         delProduct({skuId:id,delStatus:delStatus}).then((res) => {
             if (res && res.status == 1) {
                 refresh()
             }
         })
    }
    render() {
        const {params, stockParams, selectList, visible} = this.state;        
        const {items, stockItems, virhoustQueryList, getShopStocks, cateResult, totalItems, loading} = this.props;
        let downParam = {...params};
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
            ...this.getFormOptions()
        }
        
        return <Panel title=""><VirtualhouseView ref = 'theTable' tableOptions={tableOptions} stockTableOptions={stockTableOptions} formOptions={formOptions} downParam={downParam} quickOptions={this.getQuickOptions()} 
                                                 selectList={selectList} visible={visible} cateList={loop(cateResult)} delSubmit = {this.delSubmit}/></Panel>
    }
}

Virtualhouse.propTypes = {    
    virhoustQueryList: React.PropTypes.func,
    getShopStocks: React.PropTypes.func,
    virCateList: React.PropTypes.func,
    items: React.PropTypes.array.isRequired,
    stockItems: React.PropTypes.array,
    totalItems: React.PropTypes.number.isRequired,    
    loading: React.PropTypes.bool
}

const mapActionCreators = {
    virhoustQueryList,
    getShopStocks,
    virCateList,
    delProduct,
}


const mapStateToProps = (state) => {

    const {result, stockResult, cateResult, loading} = state.virtualhouse;    
    const {items = [], totalItems = 0} = result || {};
    const { stockItems = [] } = stockResult || {};
    return { items, stockItems: stockResult, cateResult, totalItems, loading };
    
}

export default connect(mapStateToProps, mapActionCreators)(Virtualhouse)

