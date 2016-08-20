import React, { PropTypes, Component} from 'react'
import { connect } from 'react-redux'
import AdjustPriceView from '../components/AdjustPriceView'
import Panel from 'components/Panel'
import {uptPrice, priceShopHouseList, getShopList, priceCateList} from '../modules/AdjustPriceReducer'

class AdjustPrice extends Component {
  
    constructor(props) {
        super(props);
        
        this.getFormOptions = this.getFormOptions.bind(this);      
        
        this.state = {
            params: {},   //表格需要的筛选参数
            pageSize: 5
        }
    }

    //获取分页页码
    getPageNumber(location) {
        const {query} = location;
        return query && query.p ? Number(query.p) : 1;
    }
    
    componentDidMount() {
        
        const {priceShopHouseList, getShopList, priceCateList, location} = this.props;
        const {pageSize} = this.state;
        let pageNumber = this.getPageNumber(location);
        priceShopHouseList({ pageNumber, pageSize });
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
          const {pageSize} = this.state;
          return {
              /**
               * (表单提交)
               * 
               * @param value (description)
               */
              handleSubmit(value) {
                  value.categoryCode = value.categoryCode && value.categoryCode[value.categoryCode.length - 1] || '';
                  context.setState({
                      pageSize,
                      params: value
                  })
              },

              /**
               * (表单重置)
               */
              handleReset() {
              }
          }
      }
    
    
    render() {
        const {params, selectedItems, pageSize} = this.state;
        
        const {items, priceShopHouseList, shopListResult, uptPrice, cateResult, totalItems, loading} = this.props;
	const tableOptions = {
            dataSource : items,                         //加载组件时，表格从容器里获取初始值
            action : priceShopHouseList,                         //表格翻页时触发的action
            pagination : {                              //表格页码陪着，如果为false，则不展示页码
                total : totalItems,                     //数据总数
                pageSize,
                current : this.getPageNumber(location)
            },
            loading,                                    //表格加载数据状态
            params                                      //表格检索数据参数
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
        
        return <Panel title="价格调整"><AdjustPriceView tableOptions={tableOptions} formOptions={formOptions} shopList={shopLoop(shopListResult)} cateList={loop(cateResult)} uptPrice={uptPrice} /></Panel>
    }
}


AdjustPrice.propTypes = {
    uptPrice: React.PropTypes.func,
    priceShopHouseList: React.PropTypes.func,
    getShopList: React.PropTypes.func,
    priceCateList: React.PropTypes.func,
    items: React.PropTypes.array,
    totalItems: React.PropTypes.number.isRequired,    
    loading: React.PropTypes.bool
}

const mapActionCreators = {
    uptPrice, 
    priceShopHouseList, 
    getShopList, 
    priceCateList
}


const mapStateToProps = (state) => {
    const {result, houseListResult, shopListResult, cateResult, loading} = state.adjustPrice;
    
    const {items = [], totalItems = 0} = houseListResult || {};
    return { items, totalItems, houseListResult, shopListResult, cateResult, result, loading };
    
}

export default connect(mapStateToProps, mapActionCreators)(AdjustPrice)

