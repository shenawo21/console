import React, { PropTypes, Component} from 'react'
import { connect } from 'react-redux'
import ShophouseView from '../components/ShophouseView'
import Panel from 'components/Panel'
import { shopQueryList, compareList, comparePage, compareUpt, fallBack, getShopList, priceCateList } from '../modules/ShophouseReducer'

class Shophouse extends Component {
  
    constructor(props) {
        super(props);
        
        this.getFormOptions = this.getFormOptions.bind(this);        
        
        this.state = {
            oddStatus: true,
            params: {}   //表格需要的筛选参数
        }
    }
    
     /**
     * (判断仓库/商品对比)
     * @params id
     */
    _isQueryStatus(key){
        const _this = this;
        const {shopQueryList, compareList, location} = this.props;
        const {query} = location;
        let pageNumber = query.p ? Number(query.p) : 1;
        if(key == 1){
            shopQueryList({ pageNumber:1 });
            _this.setState({ oddStatus: true });
        }else{
	        compareList({pageSize:9999});
        }	
    }

    componentDidMount() {
        const {shopQueryList, compareList, getShopList, priceCateList, location} = this.props;
        const {query} = location;
        let pageNumber = query.p ? Number(query.p) : 1;
        shopQueryList({ pageNumber });
	
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
                  //类目查询取值问题
                  if(value.categoryCode){ value.categoryCode = value.categoryCode[value.categoryCode.length - 1]}
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
    
    render() {
        const {params, oddStatus} = this.state;
        
        const {items, compareItems, shopQueryList, compareList, comparePage, compareListResult, shopListResult, cateResult, totalItems, comparetotalItems, loading, compareUpt, fallBack} = this.props;
        const tableOptions = {
            dataSource : items,                         //加载组件时，表格从容器里获取初始值
            action : oddStatus ? shopQueryList : compareList,                  //表格翻页时触发的action
            pagination : {                              //表格页码陪着，如果为false，则不展示页码
                total : totalItems                      //数据总数
            },  
            loading,                                    //表格加载数据状态
            params,                                     //表格检索数据参数
            isStatus: this._isQueryStatus.bind(this)    //判断出库/入库
        }

        const tableOptionsPro = {
            loading,                                    //表格加载数据状态
            compareUpt,                                 
            fallBack                                    
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
            ...this.getFormOptions()
        }
        
        return <Panel title=""><ShophouseView tableOptions={tableOptions} tableOptionsPro={tableOptionsPro} formOptions={formOptions} shopList={shopLoop(shopListResult)} cateList={loop(cateResult)} compareListResult={compareListResult} compareList={compareList} /></Panel>
    }
}


Shophouse.propTypes = {
    shopQueryList: React.PropTypes.func,
    compareList: React.PropTypes.func,
    comparePage: React.PropTypes.func,
    getShopList: React.PropTypes.func,
    priceCateList: React.PropTypes.func,
    compareUpt: React.PropTypes.func,
    fallBack: React.PropTypes.func,
    items: React.PropTypes.array.isRequired,
    totalItems: React.PropTypes.number.isRequired,
    compareItems: React.PropTypes.array,
    comparetotalItems: React.PropTypes.number,
    loading: React.PropTypes.bool
}

const mapActionCreators = {    
    shopQueryList, 
    compareList,
    comparePage,
    getShopList, 
    priceCateList,
    compareUpt,
    fallBack
}


const mapStateToProps = (state) => {
    const {result, shopListResult, compareListResult, comparePageResult, cateResult, loading} = state.shophouse;
    const {items = [], totalItems = 0} = result || {};
    //const {compareItems = [], comparetotalItems = 0} = comparePageResult || {};
    return { items, shopListResult, compareListResult, comparePageResult, cateResult, totalItems, loading };
    
}

export default connect(mapStateToProps, mapActionCreators)(Shophouse)

