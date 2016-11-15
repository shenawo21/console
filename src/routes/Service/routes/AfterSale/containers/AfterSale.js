import React, { PropTypes, Component} from 'react'
import { connect } from 'react-redux'
import ReturnGoods from '../components/ReturnGoods'
import ReturnMoney from '../components/ReturnMoney'
import Panel from 'components/Panel'
import {message} from 'hen';
import { getRefund, getChangeGoods,getShopList,getSearch,getEndRefund,getOut} from '../modules/AfterSaleReducer'

import {Tabs } from 'hen';
const TabPane = Tabs.TabPane;

const TYPES = [{type : '退款'},{type : '退换货'}];

class OddQuery extends Component {
  
    constructor(props) {
        super(props);
        this.getFormOptions = this.getFormOptions.bind(this);
        this.handleOk = this.handleOk.bind(this);  
        this.confirm = this.confirm.bind(this);
        this.getOut = this.getOut.bind(this);      
        this.state = {
            curKey: 0,
            visible: false,
            params: {
                type: TYPES[0].type
            }   //表格需要的筛选参数
        }
    }
    

    componentDidMount() {
        const {getRefund, getChangeGoods, getShopList, location } = this.props;
        const {query} = location;
        let pageNumber = query.p ? Number(query.p) : 1;
        getRefund({
            type: TYPES[0].type,
            pageNumber: pageNumber
        });
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

        const {location,router} = this.context.props

        router.replace({...location, query : { p: 1 }});

        this.setState({
            params: {
                type: TYPES[key-1].type
            }, 
            curKey : key - 1
        })   
    }
    // 结束/拒绝退款
    confirm(id,refresh){
        const {getEndRefund} = this.props
        getEndRefund({refundId:id})
        refresh()
    }
    // 换货出库
    getOut (tid,id,refresh) {
        const {getOut} = this.props
        getOut({tid:tid,refundId:id}).then(res => {
            if (res.status == 1 ) {
                refresh()
            }
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
                        <TabPane tab="订单退款" key="1"><ReturnMoney shopListItem={shopListItem}  {...formOptions} {...tableOptions} confirm={this.confirm} /></TabPane>
                        <TabPane tab="退换货" key="2"><ReturnGoods shopListItem={shopListItem}  {...formOptions} {...tableOptions} visible = {visible} handleOk = {this.handleOk} getOut = {this.getOut}  /></TabPane>
                    </Tabs>
                </Panel>
    }
}

OddQuery.contextTypes = {
    props: React.PropTypes.object.isRequired,
    router: React.PropTypes.object.isRequired
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
    getSearch,
    getEndRefund,
    getOut
}


const mapStateToProps = (state) => {
    //debugger
    const {result, changegoodsList, shoplist, loading} = state.aftersale;
    const {items = [], totalItems = 0} = result || {};

    return {items, changegoodsList, shoplist, totalItems, loading };
}

export default connect(mapStateToProps, mapActionCreators)(OddQuery)

