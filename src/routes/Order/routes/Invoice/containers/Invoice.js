import React, { PropTypes, Component} from 'react'
import { connect } from 'react-redux'
import ForInvoiceView from '../components/ForInvoice'
import InvoiceView from '../components/Invoice'
import Panel from 'components/Panel'
import { queryList, forQueryList, deleteItem, getShopList} from '../modules/InvoiceReducer'
import { getTimeStamp } from 'common/utils';
import { Tabs, Modal,message } from 'hen';
const TabPane = Tabs.TabPane;

class Invoice extends Component {
  
    constructor(props) {
        super(props);
        this.getFormOptions = this.getFormOptions.bind(this);
        this.getFormOptionsFor = this.getFormOptionsFor.bind(this);
        this.getQuickOptions = this.getQuickOptions.bind(this);
        this.state = {
            params: {},
            paramsFor: {},
            selectList: [],
            tData: []        
        }
    }
    /**
   * 单个发货
   * @param {row.shoppId,row.outSid}
   */
    isGive(row) {
      const context = this;
      const {deleteItem} = context.props;
      deleteItem({
        sendGoods: [{
          shoppId: row.shoppId,
          outSid: row.outSid
        }]
      })
    }

    /**
     * 批量发货
     * @param {row.shoppId,row.outSid}
     */
    isGiveM() {
      const context = this;
      const {deleteItem} = context.props;
      const {selectList} = this.state;
      deleteItem({sendGoods: selectList});
      context.setState({
        selectList: []
      })
    }

    componentDidMount() {
        const {queryList, getShopList, location } = this.props;
        const {query} = location;
        let pageNumber = query.p ? Number(query.p) : 1;
        queryList({pageNumber});
        //获取店铺列表
        getShopList();
    }

	  componentWillReceiveProps(nextProps, preProps) {
        this.setState({
          tData: nextProps.items
        })
        if (nextProps.dResult) {
          message.info('发货结果：' + nextProps.dResult.success + '条成功' + ',' + nextProps.dResult.fail + '条失败', 1);
          /*Modal.info({
            title: '发货结果',
            content: <div>
              <p>成功：{nextProps.dResult.success} 条</p>
              <p>失败：{nextProps.dResult.fail} 条</p>
            </div>
          });*/
        }
        if (nextProps.isRefresh) {
          setTimeout(()=> {
            this.context.router.push('/order/invoice')
          }, 800);
        }
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
             * @param value (description)
             */
            handleSubmit(value) {              
                const csTime = getTimeStamp(value.createStartTime), ceTime = getTimeStamp(value.createEndTime),
                rsTime = getTimeStamp(value.reviewStartTime), reTime = getTimeStamp(value.reviewEndTime)
                if (( csTime > ceTime) || (rsTime > reTime)) {
                  message.error('开始时间不能晚于结束时间！');
                  return false
                } else {
                  context.setState({
                    params: value,
                    selectList: []
                  })
                }
            },
        /**
         * (筛选表单重置)
         */
          handleReset() {
    
          }   
        }
    }
    /**
     * (表格功能配置项)
     * 
     * @returns (description)
     */
    getFormOptionsFor() {
        const context = this;
        return {
            /**
             * (筛选表单提交)
             * @param value (description)
             */
            handleSubmit(value) {
                const csTime = getTimeStamp(value.createStartTime), ceTime = getTimeStamp(value.createEndTime),
                rsTime = getTimeStamp(value.reviewStartTime), reTime = getTimeStamp(value.reviewEndTime)
                if (( csTime > ceTime) || (rsTime > reTime)) {
                  message.error('开始时间不能晚于结束时间！');
                  return false
                } else {
                  context.setState({
                    paramsFor: value
                  })
                }
            },
        /**
         * (筛选表单重置)
         */
          handleReset() {
    
          }   
        }
    }
    /**
     * 快捷菜单
     */
    getQuickOptions() {
      return {
        /**
         *
         * (description)
         */
        doUp() {
          console.log('');
        },
      }
    }
    handleRowSelection() {
      return {
        onSelect: (record, selected, selectedRows) => {
          let selectList = selectedRows.map(c => {
            return {
              shoppId: c.shoppId,
              outSid: c.outSid
            }
          });
          this.setState({selectList});
        },
        onSelectAll: (selected, selectedRows, changeRows) => {
          let selectList = selectedRows.map(c => {
            return {
              shoppId: c.shoppId,
              outSid: c.outSid
            }
          });
          this.setState({selectList});
        }
      }
    }
    callback(key) {
        const { queryList, forQueryList } = this.props;
        if(key == 2) { 
            forQueryList();
        } else {
            queryList();
        }

        const {location,router} = this.context.props
        router.replace({...location, query : { p: 1 }});

        this.setState({
            curKey : key - 1
        })   
    }
    render() {
        const {params, paramsFor, selectList, tData} = this.state;
        const {items, queryList, forQueryList, shoplist, totalItems, loading} = this.props;
        const tableOptions = {
            dataSource : tData,                         //加载组件时，表格从容器里获取初始值
            action : queryList,                         //表格翻页时触发的action
            pagination : {                              //表格页码配置，如果为false，则不展示页码
                total : totalItems                      //数据总数
            },  
            loading,                                    //表格加载数据状态
            params,                                     //表格检索数据参数
            rowSelection: this.handleRowSelection(),    //需要checkbox时填写
            isGive: this.isGive.bind(this),
            isGiveM: this.isGiveM.bind(this)
        }
	
	      const tableOptionsFor = {
            dataSource : items,                         //加载组件时，表格从容器里获取初始值
            action : forQueryList,                      //表格翻页时触发的action
            pagination : {                              //表格页码陪着，如果为false，则不展示页码
                total : totalItems                      //数据总数
            },  
            loading,                                    //表格加载数据状态
            params: paramsFor,                          //表格检索数据参数
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
            ...this.getFormOptions()
        }
        const getFormOptionsFor = {
          ...this.getFormOptionsFor()
        }
	    //<InvoiceView {...tableOptions} {...formOptions} shopList={shopList} tData={tData} hasSelected={selectList.length > 0} selectList={selectList} quickOptions={this.getQuickOptions()}/>
        return <Panel title="">
                    <Tabs defaultActiveKey="1" onChange={this.callback.bind(this)}>
                        <TabPane tab="打单发货" key="1"><ForInvoiceView shopListItem={shopListItem} formOptions={formOptions} tableOptions={tableOptions} tData={tData} hasSelected={selectList.length > 0}
                                                                           selectList={selectList}
                                                                           quickOptions={this.getQuickOptions()}
                                                                           downParam={params} /></TabPane>
                        <TabPane tab="已打单发货" key="2"><InvoiceView shopListItem={shopListItem} getFormOptionsFor={getFormOptionsFor} tableOptionsFor={tableOptionsFor} /></TabPane>
                    </Tabs>
                </Panel>
    }
}

Invoice.contextTypes = {
    props: React.PropTypes.object.isRequired,
    router: React.PropTypes.object.isRequired
};

Invoice.propTypes = {
  queryList: React.PropTypes.func,
  forQueryList: React.PropTypes.func,
  deleteItem: React.PropTypes.func,
  getShopList: React.PropTypes.func,  
  items: React.PropTypes.array.isRequired,
  totalItems: React.PropTypes.number.isRequired,
  loading: React.PropTypes.bool
}

const mapActionCreators = {
  queryList,
  forQueryList,
  deleteItem,
  getShopList
}

const mapStateToProps = (state) => {
  const {result, loading, shoplist, dResult, isRefresh} = state.invoice;
  const {items = [], totalItems = 0} = result || {};
  return {items, totalItems, loading, shoplist, dResult, isRefresh};
}

export default connect(mapStateToProps, mapActionCreators)(Invoice)

