import React, { PropTypes, Component} from 'react'
import { connect } from 'react-redux'
import OddQueryView from '../components/OddQueryView'
import Panel from 'components/Panel'
import { oddQueryList, getShopList, priceCateList } from '../modules/OddQueryReducer'

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
        const { oddQueryList, location} = this.props;
        let pageNumber = 1;
        this.setState({
            params: {
                pageNumber : 1,
                recordType : key == 1 ? "总仓出库" : "总仓入库"
            }
        })
    }

    componentDidMount() {
        const { oddQueryList, getShopList, priceCateList, location} = this.props;
        const {query} = location;
        let pageNumber = query.p ? Number(query.p) : 1;
        oddQueryList({pageNumber});
         this.setState({
            params: {
                recordType : "总仓出库"
            }
        })
	
	//获取店铺列表
        getShopList();
        
        //获取分类列表
        priceCateList();
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
                const {params} = context.state;
                if(value.categoryCode){
                    value.categoryCode = value.categoryCode[value.categoryCode.length - 1] || '';
                }
                  context.setState({
                      params: {
		      	        ...params,
                        ...value
                      } 
                  })
              },

              /**
               * (筛选表单重置)
               */
              handleReset() {
                  const {params} = context.state;
                  context.setState({
                      params: {
		      	        ...params
                      } 
                  })
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
        
        const {items, oddQueryList, shopListResult, cateResult, totalItems, loading} = this.props;
        const tableOptions = {
            dataSource : items,                         //加载组件时，表格从容器里获取初始值
            action : oddQueryList,                  //表格翻页时触发的action
            pagination : {                              //表格页码陪着，如果为false，则不展示页码
                total : totalItems                      //数据总数
            },  
            loading,                                    //表格加载数据状态
            params,                                     //表格检索数据参数
            isStatus: this._isQueryStatus.bind(this)        //判断出库/入库
            //rowSelection : this.handleRowSelection()    //需要checkbox时填写
        }
        
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
        
        /**
         * 店铺列表
         * @param lists
         * @returns {*}
         */
        const shopLoop = (lists) => {
            return lists && lists.map(a => {
                return {
                    value: a.shopId,
                    title: a.name
                }
            })
        }
	
        const formOptions = {
            'formOptions' : this.getFormOptions()
        }
        
        return <Panel title=""><OddQueryView {...tableOptions} {...formOptions} shopList={shopLoop(shopListResult)} cateList={loop(cateResult)} /></Panel>
    }
}


OddQuery.propTypes = {
    
    oddQueryList: React.PropTypes.func,
    items: React.PropTypes.array.isRequired,
    getShopList: React.PropTypes.func,
    priceCateList: React.PropTypes.func,
    totalItems: React.PropTypes.number.isRequired,
    
    loading: React.PropTypes.bool
}

const mapActionCreators = {
    oddQueryList, 
    getShopList, 
    priceCateList
}


const mapStateToProps = (state) => {
    const {result, shopListResult, cateResult, loading} = state.oddQuery;
    
    const {items = [], totalItems = 0} = result || {};
    return { items, shopListResult, cateResult, totalItems, loading };
    
}

export default connect(mapStateToProps, mapActionCreators)(OddQuery)

