import React, { PropTypes, Component} from 'react'
import { connect } from 'react-redux'

import Register from '../components/Register'
import List from '../components/List'
import Panel from 'components/Panel'
import { getRecordedList, delRegister, register } from '../modules/OfflineRegisterReducer'

import {Tabs} from 'hen';
const TabPane = Tabs.TabPane;

class offlineRegister extends Component {
  
    constructor(props) {
        super(props);
        
        this.getFormOptions = this.getFormOptions.bind(this);       
        
        this.state = {
            curKey: 0,
            params: {}   //表格需要的筛选参数
        }
    }

    /**
     * 删除该费用
     * @params id
     */
    _del(id){
        const { delRegister } = this.props;
        delRegister({id: id});
    }
    
     /**
     * (判断待验收/已验收)
     * @params id
     */
    _isStatus(key){
        const { getRecordedList, location} = this.props;
        let pageNumber = 1;
        if(key == 2){
            getRecordedList({pageNumber});
        }
    }

    componentDidMount() {
	
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
             * (表单提交)
             * 
             * @param value (description)
             */
            handleSubmit(value) {
                const { register } = context.props;
                register({
                    ...value
                })
            },

            /**
             * (筛选表格提交)
             * 
             * @param value (description)
             */
            handleSubmitTab(value) {
                const {params} = context.state;
                context.setState({
                    params: {
                    ...params,
                    ...value
                    } 
                })
            },

            /**
             * (表单重置)
             */
            handleReset() {

            }
        }
    }

    /**
     * 通过 rowSelection 对象表明需要行选择
     * 
     * @returns (description)
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
        const { getRecordedList } = this.props;
        if(key == 2) { 
            getRecordedList();
        }
        this.setState({
            curKey : key - 1
        })
        
    }

    render() {
        const {params} = this.state;        
        const {items, getRecordedList, totalItems, loading} = this.props;
        const tableOptions = {
            dataSource : items,                         //加载组件时，表格从容器里获取初始值
            action : getRecordedList,                   //表格翻页时触发的action
            pagination : {                              //表格页码陪着，如果为false，则不展示页码
                total : totalItems                      //数据总数
            },  
            loading,                                    //表格加载数据状态
            params,                                     //表格检索数据参数
            del: this._del.bind(this),                  //删除该费用
        }       
	
        const formOptions = {
            ...this.getFormOptions()
        }
        
        return <Panel title="">
                    <Tabs defaultActiveKey="1" onChange={this.callback.bind(this)}>
                        <TabPane tab="登记" key="1"><Register formOptions={formOptions} /></TabPane>
                        <TabPane tab="登记记录" key="2"><List formOptions={formOptions} tableOptions={tableOptions} /></TabPane>
                    </Tabs>
                </Panel>
    }
}


offlineRegister.propTypes = {    
    getRecordedList: React.PropTypes.func,    
    delRegister: React.PropTypes.func,
    register: React.PropTypes.func,
    items: React.PropTypes.array.isRequired,
    totalItems: React.PropTypes.number.isRequired,    
    loading: React.PropTypes.bool
}

const mapActionCreators = {
    getRecordedList, 
    delRegister, 
    register
}

const mapStateToProps = (state) => {
    const {result, delResult, registerResult, loading} = state.offlineRegister;
    
    const {items = [], totalItems = 0} = result || {};
    return { items, delResult, registerResult, totalItems, loading };
    
}

export default connect(mapStateToProps, mapActionCreators)(offlineRegister)

