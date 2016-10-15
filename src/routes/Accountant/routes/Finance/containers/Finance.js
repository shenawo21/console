import React, { PropTypes, Component} from 'react'
import { connect } from 'react-redux'
import ForDeal from '../components/ForDeal'
import Deal from '../components/Deal'
import Panel from 'components/Panel'
import { getForRefund, getRefund, getShopList } from '../modules/FinanceReducer'

import {Tabs } from 'hen';
const TabPane = Tabs.TabPane;

class finance extends Component {
  
    constructor(props) {
        super(props);
        this.getFormOptions = this.getFormOptions.bind(this);               
        this.state = {
            curKey: 0,
            params: {}   //表格需要的筛选参数
        }
    }
    

    componentDidMount() {
        const {getForRefund, getShopList, location } = this.props;
        const {query} = location;
        let pageNumber = query.p ? Number(query.p) : 1;
        getForRefund({pageNumber});

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
                  context.setState({
                      params: {
                        ...value
                    } 
                  })
              },
          }
      }
    callback(key) {
        const {getForRefund, getRefund, location } = this.props;
        const {query} = location;
        let pageNumber = query.p ? Number(query.p) : 1;
        if(key == 2) { 
            getRefund({pageNumber});
        } else {
            getForRefund({pageNumber});
        }
        this.setState({
            curKey : key - 1
        })
        
    }
    render() {
        const {params, curKey} = this.state;
        const {items, getForRefund, getRefund, shopListResult, totalItems, loading} = this.props;
        const tableOptions = {
            dataSource : items,                         //加载组件时，表格从容器里获取初始值
            action : curKey == 1 ? getRefund : getForRefund,                         //表格翻页时触发的action
            pagination : {                              //表格页码陪着，如果为false，则不展示页码
                total : totalItems                      //数据总数
            },  
            loading,                                    //表格加载数据状态
            params                                      //表格检索数据参数
        }
        
        /**
         * 店铺列表
         * @param lists
         * @returns {*}
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
                        <TabPane tab="待处理" key="1"><ForDeal shopListItem={shopListItem} formOptions={formOptions} tableOptions={tableOptions} /></TabPane>
                        <TabPane tab="已处理" key="2"><Deal shopListItem={shopListItem}  formOptions={formOptions} tableOptions={tableOptions} /></TabPane>
                    </Tabs>
                </Panel>
    }
}


finance.propTypes = {   
     getForRefund: React.PropTypes.func,
     getRefund: React.PropTypes.func,
     getShopList: React.PropTypes.func,
     items: React.PropTypes.array,
     totalItems: React.PropTypes.number.isRequired,    
     loading: React.PropTypes.bool
}

const mapActionCreators = {
    getForRefund, 
    getRefund,
    getShopList
}


const mapStateToProps = (state) => {
    const {result, shopListResult, loading} = state.finance;
    const {items = [], totalItems = 0} = result || {};
    return {items, shopListResult, totalItems, loading };
    
}

export default connect(mapStateToProps, mapActionCreators)(finance)

