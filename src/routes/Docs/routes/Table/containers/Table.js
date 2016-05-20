
import React, { PropTypes, Component} from 'react'
import { connect } from 'react-redux'
import TableView from '../components/Table'
import Panel from 'components/Panel'
import {queryItemList} from '../modules/table'

class Table extends Component {
    constructor(props) {
        super(props);
        this.getFormOptions = this.getFormOptions.bind(this);
        this.getQuickOptions = this.getQuickOptions.bind(this);
        this.state = {
            params: {}   //表格需要的筛选参数
        }
    }
    
    componentDidMount() {
        const {queryItemList, location} = this.props;
        const {query} = location;
        let pageNumber = query.p ? Number(query.p) : 1;
        queryItemList({ pageNumber });
    }


    /**
     * (表格功能配置项)
     * 
     * @returns (description)
     */
    getFormOptions() {
        const context = this;
        const {loading} = this.props;
        return {
            /**
             * (筛选表单提交)
             * 
             * @param value (description)
             */
            handleSubmit(value) {
                context.setState({
                    params: value
                })
            },

            /**
             * (筛选表单重置)
             */
            handleReset() {
            },
            loading    //若表单提交需要状态
        }
    }
    
    /**
     * (表格头部快捷按钮配功能置项)
     * 
     * @returns (description)
     */
    getQuickOptions(){
        const context = this;
        const {queryItemList} = this.props;
        return {
            /**
             * (description)
             * 
             * (description)
             */
            doUp() {
               console.log('批量上架', context);
            }
        }
    }
    
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

    render() {
        const {items, queryItemList, totalItems, loading} = this.props;
        const {params} = this.state;
        
        const tableOptions = {
            dataSource : items,                         //加载组件时，表格从容器里获取初始值
            action : queryItemList,                     //表格翻页时触发的action
            pagination : {                              //表格页码陪着，如果为false，则不展示页码
                total : totalItems                      //数据总数
            },  
            loading,                                    //表格加载数据状态
            params,                                     //表格检索数据参数
            rowSelection : this.handleRowSelection()    //需要checkbox时填写
        }

        return <Panel title=""><TableView {...tableOptions} formOptions={this.getFormOptions()} quickOptions={this.getQuickOptions()} /></Panel>
    }
}


Table.propTypes = {
    items: React.PropTypes.array.isRequired,
    queryItemList: React.PropTypes.func.isRequired,
    totalItems: React.PropTypes.number.isRequired,
    loading: React.PropTypes.bool
}

const mapActionCreators = {
    queryItemList
}


const mapStateToProps = (state) => {
    const {result, loading} = state.table;
    const {items = [], totalItems = 0} = result.data || {};
    return { items, totalItems, loading };
}

export default connect(mapStateToProps, mapActionCreators)(Table)
