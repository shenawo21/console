import React, { PropTypes, Component} from 'react'
import { connect } from 'react-redux'
import ReturnGoods from '../components/ReturnGoods'
import ReturnMoney from '../components/ReturnMoney'
import Panel from 'components/Panel'
import {message} from 'hen';
import { getRefund, getChangeGoods,getShopList,getSearch } from '../modules/AfterSaleReducer'

import {Tabs } from 'hen';
const TabPane = Tabs.TabPane;

const TYPES = [{type : '退款'},{type : '退换货'}];

class OddQuery extends Component {
  
    constructor(props) {
        super(props);
        this.getFormOptions = this.getFormOptions.bind(this);
        this.handleOk = this.handleOk.bind(this);        
        this.state = {
            curKey: 0,
            visible: false,
            params: {}   //表格需要的筛选参数
        }
    }
    

    componentDidMount() {
        const {getRefund, getChangeGoods, getShopList, location } = this.props;
        const {query} = location;
        let pageNumber = query.p ? Number(query.p) : 1;
        getRefund(TYPES[0]);
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
               */
              handleSubmit(value) {
                  const {curKey} = context.state;
                  const {pageNumber, ...other} = value;
                  let condition = {condition:{...other}}
                  context.setState({
                      params: {
                      ...condition,
                      ...TYPES[curKey],
                      pageNumber
		            } 
                  })
              },
            search(formObj){
                formObj && formObj.resetFields()
                context.setState({
                    visible: true,
                })
            },
            handleCancel() {
                context.setState({
                    visible: false,
                });
            }   
          }
      }
    handleOk (values,fresh) {
        const {getSearch} = this.props
        const context = this;
        getSearch(values).then(function(res) {
            if (res && res.data) {
                setTimeout(() => {
                    let pathname = '/service/aftersale/orderChange/'+ values.tid;
                    context.context.router.replace(pathname);
                }, 100);
            } else {
                message.error('无查询结果')
               
            }
        })
    }  
    callback(key) {
        const {getRefund, getChangeGoods, getShopList } = this.props;
        if(key == 2) { 
            getRefund(TYPES[key-1]);
        } else {
            getRefund(TYPES[key-1]);
        }
        this.setState({
            curKey : key - 1
        })   
    }

    render() {
        const {params,visible} = this.state;
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
                    <Tabs defaultActiveKey="1" onChange={this.callback.bind(this)}>
                        <TabPane tab="订单退款" key="1"><ReturnMoney shopListItem={shopListItem}  {...formOptions} {...tableOptions} /></TabPane>
                        <TabPane tab="退换货" key="2"><ReturnGoods shopListItem={shopListItem}  {...formOptions} {...tableOptions} visible = {visible} handleOk = {this.handleOk}  /></TabPane>
                    </Tabs>
                </Panel>
    }
}
OddQuery.contextTypes = {
    router: React.PropTypes.object.isRequired,
};

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
    getShopList,
    getSearch
}


const mapStateToProps = (state) => {
    const {result, changegoodsList, shoplist, loading} = state.aftersale;
    const {items = [], totalItems = 0} = result || {};
    return {items, changegoodsList, shoplist, totalItems, loading };
    
}

export default connect(mapStateToProps, mapActionCreators)(OddQuery)

