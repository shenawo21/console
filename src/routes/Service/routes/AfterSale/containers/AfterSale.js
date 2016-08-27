import React, { PropTypes, Component} from 'react'
import { connect } from 'react-redux'
import ReturnGoods from '../components/ReturnGoods'
import ReturnMoney from '../components/ReturnMoney'
import Panel from 'components/Panel'
import { getRefund, getChangeGoods,getShopList } from '../modules/AfterSaleReducer'

import {Tabs } from 'hen';
const TabPane = Tabs.TabPane;

class OddQuery extends Component {
  
    constructor(props) {
        super(props);
        this.getFormOptions = this.getFormOptions.bind(this);               
        this.state = {
            oddStatus: true,
            params: {}   //表格需要的筛选参数
        }
    }
    

    componentDidMount() {
        const {getRefund, getChangeGoods, getShopList, location } = this.props;
        const {query} = location;
        let pageNumber = query.p ? Number(query.p) : 1;
        getRefund();
        //获取店铺列表
        getShopList({type:'退款'});
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
                    // const {params} = context.state;
                    // if(value.categoryCode){
                    //     value.categoryCode = value.categoryCode[value.categoryCode.length - 1] || '';
                    // }
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
              }
          }
      }
    callback(key) {
        console.log(key,'key=====')
        
    }
    render() {
        const {params, oddStatus} = this.state;
        
        const {items, getRefund, shopListResult, cateResult, totalItems, loading} = this.props;
        const tableOptions = {
            dataSource : items,                         //加载组件时，表格从容器里获取初始值
            action : getRefund,                  //表格翻页时触发的action
            pagination : {                              //表格页码陪着，如果为false，则不展示页码
                total : totalItems                      //数据总数
            },  
            loading,                                    //表格加载数据状态
            params,                                     //表格检索数据参数
            isStatus: this._isQueryStatus.bind(this)        //判断退款/退换货
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
        
        return <Panel title="">
                    {/** <RefundView {...tableOptions} {...formOptions} shopList={shopLoop(shopListResult)} />*/}
                    <Tabs defaultActiveKey="1" onChange={this.callback.bind(this)}>
                        <TabPane tab="订单退款" key="1"><ReturnMoney {...formOptions} {...tableOptions} /></TabPane>
                        <TabPane tab="退换货" key="2"><ReturnGoods {...formOptions} {...tableOptions} /></TabPane>
                    </Tabs>
                </Panel>
    }
}


OddQuery.propTypes = {
    
    // oddQueryList: React.PropTypes.func,
    // items: React.PropTypes.array.isRequired,
    // getShopList: React.PropTypes.func,
    // priceCateList: React.PropTypes.func,
    // totalItems: React.PropTypes.number.isRequired,
    
    // loading: React.PropTypes.bool
}

const mapActionCreators = {
    getRefund, 
    getChangeGoods, 
    getShopList
}


const mapStateToProps = (state) => {
    console.log(state,'state=====')
    const {result, shopListResult, cateResult, loading} = state.aftersale;

    return { };
    
}

export default connect(mapStateToProps, mapActionCreators)(OddQuery)

