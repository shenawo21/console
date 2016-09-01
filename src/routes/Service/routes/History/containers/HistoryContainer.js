import React, { PropTypes, Component} from 'react'
import { connect } from 'react-redux'
import HistoryView from '../components/HistoryView'
import Panel from 'components/Panel'
import { getRefund,getShopList } from '../modules/history'

import {Tabs } from 'hen';

class HistoryList extends Component {
  
    constructor(props) {
        super(props);
        this.getFormOptions = this.getFormOptions.bind(this);               
        this.state = {
            params: {}   //表格需要的筛选参数
        }
    }
    

    componentDidMount() {
        const {getRefund, getShopList, location } = this.props;
        const {query} = location;
        let pageNumber = query.p ? Number(query.p) : 1;
        getRefund();
        //获取店铺列表
        getShopList();
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
                  const {pageNumber, ...other} = value;
                  let condition = {condition:{...other}}
                  context.setState({
                      params: {
                      ...condition,
                      pageNumber
		            } 
                  })
              },
          }
      }
    render() {
        const {params} = this.state;
        const {items, getRefund, shoplist, totalItems, loading} = this.props;
        const tableOptions = {
            dataSource : items,                         //加载组件时，表格从容器里获取初始值
            action : getRefund,                  //表格翻页时触发的action
            pagination : {                              //表格页码陪着，如果为false，则不展示页码
                total : totalItems                      //数据总数
            },  
            loading,                                    //表格加载数据状态
            params,                                     //表格检索数据参数
        }
        
        /**
         * 店铺列表
         * @param lists
         * @returns {*}
         */
        let shopListItem = [];
        if (shoplist) {
            shopListItem = shoplist.map(c=> {
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
            'formOptions' : this.getFormOptions()
        }
        return <Panel title="">
                    <HistoryView {...tableOptions} {...formOptions} shopListItem={shopListItem} />
                </Panel>
    }
}


HistoryList.propTypes = {   
    // oddQueryList: React.PropTypes.func,
    // items: React.PropTypes.array.isRequired,
    // getShopList: React.PropTypes.func,
    // priceCateList: React.PropTypes.func,
    // totalItems: React.PropTypes.number.isRequired,
    
    // loading: React.PropTypes.bool
}

const mapActionCreators = {
    getRefund, 
    getShopList
}


const mapStateToProps = (state) => {
    const {result, shoplist, loading} = state.aftersale;
    const {items = [], totalItems = 0} = result || {};
    return {items, shoplist, totalItems, loading };
    
}

export default connect(mapStateToProps, mapActionCreators)(HistoryList)

