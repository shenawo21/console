import React, { PropTypes, Component} from 'react'
import { connect } from 'react-redux'
import StorageQueryView from '../components/StorageQuery'
import OutgoQueryView from '../components/OutgoQuery'
import Panel from 'components/Panel'

import { oddQueryList, getShopList, priceCateList } from '../modules/OddQueryReducer'

import {Tabs } from 'hen';
const TabPane = Tabs.TabPane;

const TYPES = [{recordType : '总仓出库'},{recordType : '总仓入库'}];

class OddQuery extends Component {
  
    constructor(props) {
        super(props);
        
        this.getFormOptions = this.getFormOptions.bind(this);       
        
        this.state = {
            curKey: 0,
            params: {
                recordType: TYPES[0].recordType
            }
        }
    }
    

    componentDidMount() {
        const { oddQueryList, getShopList, priceCateList, location} = this.props;
        const {query} = location;
        let pageNumber = query.p ? Number(query.p) : 1;
        oddQueryList({
             recordType: TYPES[0].recordType
        });	
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
                const {curKey} = context.state;
                if(value.categoryCode){
                    value.categoryCode = value.categoryCode[value.categoryCode.length - 1] || '';
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
        const {oddQueryList} = this.props;
        if(key == 2) { 
            oddQueryList(TYPES[key-1]);
        } else {
            oddQueryList(TYPES[key-1]);
        }
        const {location,router} = this.context.props

        router.replace({...location, query : { p: 1 }});
        this.setState({
            params: {
                recordType: TYPES[key-1].recordType
            },
            curKey : key - 1
        })   
    }
    render() {
        const {params,curKey} = this.state;
        
        const {items, oddQueryList, shopListResult, cateResult, totalItems, loading} = this.props;
        const tableOptions = {
            dataSource : items,                         //加载组件时，表格从容器里获取初始值
            action : oddQueryList,                      //表格翻页时触发的action
            pagination : {                              //表格页码陪着，如果为false，则不展示页码
                total : totalItems                      //数据总数
            },  
            loading,                                    //表格加载数据状态
            params,                                     //表格检索数据参数
            key: curKey==1 ? 1 : 2
        }
        
        /**
         * 类目列表
         * @param lists
         * @returns {*}
         */
        const loop = (cateResult) => {
            return cateResult && cateResult.map(a => {
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
	
        const formOptions = {
            ...this.getFormOptions()
        }
        
        return <Panel title="">
                    <Tabs defaultActiveKey="1" onChange={this.callback.bind(this)}>
                        <TabPane tab="出库单查询" key="1"><OutgoQueryView formOptions={formOptions} tableOptions={tableOptions} shopList={shopListItem} /></TabPane>
                        <TabPane tab="入库单查询" key="2"><StorageQueryView formOptions={formOptions} tableOptions={tableOptions} cateList={cateArray} /></TabPane>
                    </Tabs>
                </Panel>
    }
}
OddQuery.contextTypes = {
    props: React.PropTypes.object.isRequired,
    router: React.PropTypes.object.isRequired
};

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

