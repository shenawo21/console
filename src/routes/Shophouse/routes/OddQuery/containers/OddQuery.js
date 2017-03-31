import React, { PropTypes, Component} from 'react'
import { connect } from 'react-redux'
import StorageQueryView from '../components/StorageQuery'
import OutgoQueryView from '../components/OutgoQuery'

import Panel from 'components/Panel'

import { shopOddQueryList, getShopList, priceCateList,channelList} from '../modules/OddQueryReducer'

import {Tabs } from 'hen';
const TabPane = Tabs.TabPane;

const TYPES = [{recordType : '店铺出库'},{recordType : '店铺入库'}];

class OddQuery extends Component {
  
    constructor(props) {
        super(props);
        
        this.getFormOptions = this.getFormOptions.bind(this);       
        
        this.state = {
            curKey: 0,
            params: {}   //表格需要的筛选参数
        }
    }
    

    componentDidMount() {
        const { shopOddQueryList, getShopList, priceCateList, location,channelList} = this.props;
        const {query} = location;
        let pageNumber = query.p ? Number(query.p) : 1;
        shopOddQueryList(TYPES[0]);
	
	    //获取店铺列表
        getShopList();
        
        //获取分类列表
        priceCateList();
        // 所属渠道
        channelList();
    }
    
      /**
       * (表格功能配置项)
       * 
       * @returns (description)
       */
      getFormOptions() {
          const context = this;
          const {shopListResult} = context.props
          return {
              /**
               * (筛选表单提交)
               * 
               * @param value (description)
               */
              handleSubmit(value) {
                const {params, curKey} = context.state;
                if(value.categoryId){
                    value.categoryId = value.categoryId[value.categoryId.length - 1] || '';
                }
                const {pageNumber, ...other} = value;
                
                  context.setState({
                      params: {
		      	        ...other,
                        ...TYPES[curKey],
                        pageNumber
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
    /**
     * Tab切换(判断出库/入库)
     * @params key
     */
    callback(key) {
        const {shopOddQueryList} = this.props;
        if(key == 2) { 
            shopOddQueryList(TYPES[key-1]);
        } else {
            shopOddQueryList(TYPES[key-1]);
        }
        this.setState({
            curKey : key - 1
        })   
    }
    render() {
        const {params} = this.state;
        
        const {items, shopOddQueryList, shopListResult, cateResult, totalItems, loading,chResult} = this.props;
        const tableOptions = {
            dataSource : items,                         //加载组件时，表格从容器里获取初始值
            action : shopOddQueryList,               //表格翻页时触发的action
            pagination : {                              //表格页码陪着，如果为false，则不展示页码
                total : totalItems                      //数据总数
            },  
            loading,                                    //表格加载数据状态
            params,                                     //表格检索数据参数
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
        let cateArray = loop(cateResult);
        /**
         * 店铺列表
         * @param lists
         * @returns {*}
         * 
         * <OddQueryView {...tableOptions} {...formOptions} shopList={shopLoop(shopListResult)} cateList={loop(cateResult)} />
         */
	 
	    let shopListItem = [];
        if (shopListResult) {
            shopListItem = shopListResult.map(c=> {
                return {
                    value: c.shopId,
                    title: c.name
            }
            });
        } else {
            shopListItem = [{
                value: null,
                title: '正在加载中...'
            }]
        }
        /**
         * 所属渠道
         * @type {Array}
         */
        let chList = [];
        if (chResult) {
            chList = chResult.map(c=> {
                return {
                value: c.channelCode,
                title: c.name
                }
            });
        } else {
            chList = [{
                value: null,
                title: '正在加载中...'
            }]
        }
        const formOptions = {
            ...this.getFormOptions()
        }
        
        return <Panel title="">
                    <Tabs defaultActiveKey="1" onChange={this.callback.bind(this)}>
                        <TabPane tab="出库单查询" key="1"><OutgoQueryView formOptions={formOptions} tableOptions={tableOptions} shopList={shopListItem} chList={chList} /></TabPane>
                        <TabPane tab="入库单查询" key="2"><StorageQueryView formOptions={formOptions} tableOptions={tableOptions} cateList={cateArray} shopList={shopListItem} chList={chList} /></TabPane>
                    </Tabs>
                </Panel>
    }
}


OddQuery.propTypes = {
    
    shopOddQueryList: React.PropTypes.func,
    items: React.PropTypes.array.isRequired,
    getShopList: React.PropTypes.func,
    priceCateList: React.PropTypes.func,
    totalItems: React.PropTypes.number.isRequired,
    
    loading: React.PropTypes.bool
}

const mapActionCreators = {
    shopOddQueryList, 
    getShopList, 
    priceCateList,
    channelList,
}


const mapStateToProps = (state) => {
    const {result, shopListResult, cateResult, loading,chResult} = state.shopOddQuery;
    
    const {items = [], totalItems = 0} = result || {};
    return { items, shopListResult, cateResult, totalItems, loading,chResult };
    
}

export default connect(mapStateToProps, mapActionCreators)(OddQuery)

