import React, { PropTypes, Component} from 'react'
import { connect } from 'react-redux'

import ForCheck from '../components/ForCheck'
import Checked from '../components/Checked'

import Panel from 'components/Panel'
import { getNoCheckList, getCheckedList, getPlatList} from '../modules/WarehouseReducer'

import {Tabs } from 'hen';
const TabPane = Tabs.TabPane;

class Warehouse extends Component {
  
    constructor(props) {
        super(props);
        
        this.getFormOptions = this.getFormOptions.bind(this);       
        
        this.state = {
            curKey: 0,
            params: {}   //表格需要的筛选参数
        }
    }

    componentDidMount() {
        const { getNoCheckList, getPlatList, priceCateList, location} = this.props;
        const {query} = location;
        let pageNumber = query.p ? Number(query.p) : 1;
        getNoCheckList({pageNumber});
	
	    //获取平台列表
        getPlatList();
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
                const {params, curKey} = context.state;
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

    /**
     * 
     */
    handleRowSelection() {
        return {
            onSelect(record, selected, selectedRows) {
                console.log(record, selected, selectedRows);
            },
            onSelectAll(selected, selectedRows, changeRows) {
                console.log(selected, selectedRows, changeRows);
            },
        }
    }
    
    callback(key) {
        const {getNoCheckList, getCheckedList, location } = this.props;
        const {query} = location;
        let pageNumber = query.p ? Number(query.p) : 1;
        if(key == 2) { 
            getCheckedList({pageNumber});
        } else {
            getNoCheckList({pageNumber});
        }
        this.setState({
            curKey : key - 1,
            params: {}
        })
        
    }

    render() {
        const {params, curKey} = this.state;        
        const {items, getNoCheckList, getCheckedList, platlistResult, totalItems, loading} = this.props;

        const tableOptions = {
            dataSource : items,                         //加载组件时，表格从容器里获取初始值
            action : curKey==1 ? getCheckedList : getNoCheckList,        //表格翻页时触发的action
            pagination : {                              //表格页码陪着，如果为false，则不展示页码
                total : totalItems                      //数据总数
            },  
            loading,                                    //表格加载数据状态
            params,                                     //表格检索数据参数
            //rowSelection : this.handleRowSelection()    //需要checkbox时填写
        }
        
        /**
         * 平台列表
         * @param lists
         * @returns {*}
         */
        let platListItem = [];
        if (platlistResult) {
            platListItem = platlistResult.map(c=> {
                return {
                    value: c.channelCode,
                    title: c.name
            }
            });
        } else {
            platListItem = [{
                value: null,
                title: '正在加载中...'
            }]
        }
	
        const formOptions = {
            ...this.getFormOptions()
        }
        
        return <Panel title="">
                    <Tabs defaultActiveKey="1" onChange={this.callback.bind(this)}>
                        <TabPane tab="待验收" key="1"><ForCheck platListItem={platListItem} formOptions={formOptions} tableOptions={tableOptions} /></TabPane>
                        <TabPane tab="已验收" key="2"><Checked platListItem={platListItem} formOptions={formOptions} tableOptions={tableOptions} /></TabPane>
                    </Tabs>
                </Panel>
    }
}


Warehouse.propTypes = {    
    getNoCheckList: React.PropTypes.func,
    getCheckedList: React.PropTypes.func,    
    getPlatList: React.PropTypes.func,
    items: React.PropTypes.array,
    totalItems: React.PropTypes.number,    
    loading: React.PropTypes.bool
}

const mapActionCreators = {
    getNoCheckList,
    getCheckedList,
    getPlatList
}

const mapStateToProps = (state) => {
    const {result, platlistResult, loading} = state.Warehouse;    
    const {items = [], totalItems = 0} = result || {};
    return { items, platlistResult, totalItems, loading };
    
}

export default connect(mapStateToProps, mapActionCreators)(Warehouse)

