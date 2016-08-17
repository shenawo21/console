import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

import DataTable from 'components/DataTable';
import Search from 'components/Search';
import Collapse from 'components/Collapse';
import concat from 'lodash/concat';


class TableCascader extends Component {

    constructor(props) {
        super(props)
        this.state = {
            sourceItems: null,      //select选取的source数据
            selectedItems: [],      //级联表格显示的数据
            selectedItemsKeys: [],  //选中的状态
        }
    }
    /**
     *  选择表格元素
     * 
     * @returns
     */
    handleRowSelection() {
        const context = this;
        let curItems = this.state.sourceItems || {};
        return {
            onSelect(record, selected, selectedRows) {
                context.getSelectedItems(curItems, selectedRows)
            },
            onSelectAll(selected, selectedRows, changeRows) {
                context.getSelectedItems(curItems, selectedRows)
            }
        }
    }

    /**
     * 设置目标表格数据，及源表格选中状态
     * 
     * @param {any} curItems
     * @param {any} selectedRows
     */
    getSelectedItems(curItems, selectedRows){
        const {tableOptions} = this.props
        let {pagination} = tableOptions
        let num = pagination.current;
        curItems[num] = selectedRows;
        !curItems[num].length && delete curItems[num]
        this.setState({
            sourceItems : curItems,
            ...this.getItems(curItems)
        });
    }
    
    /**
     *  删除时，重新设置源选中数据
     */
    removeItems(pageNumber, curItem){
        const {sourceItems} = this.state;
        const {uKey} = this.props;
        sourceItems[pageNumber].forEach((item, index) => {
            if (item[uKey] == curItem[uKey]) {
                sourceItems[pageNumber].splice(index, 1)
                return false
            }
        })
        !sourceItems[pageNumber].length && delete sourceItems[pageNumber]
        this.setState(this.getItems(sourceItems))
    }

    delItem(index, row){
        let num = index.split('_');
        this.removeItems && this.removeItems(num[0], row)
    }

    componentWillReceiveProps(nextProps) {
        const {tableOptions} = nextProps;
        if ((tableOptions && (tableOptions.dataSource !== this.props.tableOptions.dataSource))) {
            let {sourceItems} = this.state;
            this.setState(this.getItems(sourceItems, nextProps))
        }
    }

    getItems(sourceItems, nextProps) {
        let selectItem = [], selectItemKey = []
        const {tableOptions, getSelectItems, uKey} = nextProps || this.props
        const {dataSource, pagination} = tableOptions
        if (sourceItems) {
            Object.keys(sourceItems).forEach((num) => {
                if (pagination.current == num) {
                    if (sourceItems[num].length == dataSource.length) {
                        sourceItems[num].forEach((val, index) => {
                            selectItemKey.push(index)
                            val._sKey = num +'_'+ index
                        })
                    } else {
                        sourceItems[num].forEach((val) => {
                            dataSource.forEach((item, index) => {
                                if (item[uKey] == val[uKey]) {
                                    selectItemKey.push(index)
                                    val._sKey = num +'_'+ index
                                    return false
                                }
                            })
                        })
                    }
                }
                selectItem = sourceItems[num].length && concat(selectItem, sourceItems[num]);
            })
        }
        //getSelectItems传递当前选中的数据给view层
        getSelectItems(selectItem)
        return {
            selectedItems: selectItem,
            selectedItemsKeys: selectItemKey
        }
    }

    /**
     * 目标表格需要del列时，通过delFlag标识配置
     */
    _getColumns(){
        let {distTableOptions} = this.props
        let {delFlag, columns} = distTableOptions
        const context = this;
        if(delFlag){
            return columns.concat([{
                key: columns.length - 1,
                title: '操作',
                dataIndex: '_sKey',
                render(val, row){
                    return <a onClick={context.delItem.bind(context, val, row)}>删除</a>
                }
            }])
        }else{
            return columns
        }
    }

    render() {
        let {formOptions, tableOptions, collapseOptions} = this.props;
        const {selectedItems, selectedItemsKeys, sourceItems} = this.state;

        tableOptions = {
            rowSelection : this.handleRowSelection(),
            selectedItemsKeys,
            ...tableOptions
        }
        return (
            <div>
                <Collapse {...collapseOptions.source}>
                    <Search  items={formOptions.items } onSubmit={formOptions.handleSubmit} onReset={formOptions.handleReset} />
                    <DataTable bordered={true} {...tableOptions} />
                </Collapse>
                
                <Collapse {...collapseOptions.dist}>
                    <DataTable bordered={true} columns={this._getColumns()} dataSource={selectedItems} />
                </Collapse>
            </div>
        )
    }

    componentWillUnmount(){
        this.setState({
            sourceItems: null,
            ...this.getItems()
        })
    }
}

TableCascader.propTypes = {
    tableOptions: React.PropTypes.object.isRequired,
    distTableOptions: React.PropTypes.object.isRequired,
    formOptions: React.PropTypes.object
}

export default TableCascader;
