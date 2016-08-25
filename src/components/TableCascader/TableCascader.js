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
    getSelectedItems(curItems, selectedRows) {
        const {tableOptions, uKey} = this.props
        let { dataSource } = tableOptions, items = [], flag = null, unSelectedNum = null
        let {selectedItemsKeys} = this.state;

        if (curItems.length) {
            if (selectedRows.length) {
                //选中元素
                selectedRows.forEach((item) => {
                    flag = curItems.some((val, index) => {
                        return val[uKey] === item[uKey]
                    })
                    !flag && items.push(item)
                })
                if (selectedItemsKeys.length < selectedRows.length) {
                    //合并选中元素
                    curItems = curItems.concat(items);
                } else {
                    //获取取消元素在dataSource的下标
                    selectedItemsKeys.forEach((val) => {
                        selectedRows.some((item, index) => {
                            if (dataSource[val][uKey] !== item[uKey]) {
                                unSelectedNum = val
                                return false
                            }
                        })
                    })
                    //删除状态中取消的元素
                    curItems.every((item, index) => {
                        if (dataSource[unSelectedNum][uKey] === item[uKey]) {
                            curItems.splice(index, 1)
                            return false
                        }
                        return true
                    })
                }
            } else {
                //没有选中元素时，根据dataSource删除状态中元素
                dataSource.forEach((val) => {
                    curItems.every((item, index) => {
                        if (val[uKey] === item[uKey]) {
                            curItems.splice(index, 1)
                            return false
                        }
                        return true
                    })
                })
            }
            items = curItems
        } else {
            items = selectedRows;
        }
        this.setState({
            sourceItems: items,
            ...this.getItems(items)
        });
}

/**
 *  删除时，重新设置源选中数据
 */
removeItems(curItem){
    const {sourceItems} = this.state;
    const {uKey} = this.props;
    sourceItems.every((item, index) => {
        if (item[uKey] === curItem[uKey]) {
            sourceItems.splice(index, 1)
            return false
        }
        return true
    })
    this.setState(this.getItems(sourceItems))
}

componentWillReceiveProps(nextProps) {
    const {tableOptions} = nextProps;
    if ((tableOptions && (tableOptions.dataSource !== this.props.tableOptions.dataSource))) {
        let {sourceItems} = this.state;
        this.setState(this.getItems(sourceItems, nextProps))
    }
}

getItems(sourceItems, nextProps) {
    let selectItemKey = []
    const {tableOptions, getSelectItems, uKey} = nextProps || this.props
    const {dataSource} = tableOptions
    if (sourceItems) {
        sourceItems.forEach((val) => {
            dataSource.every((item, index) => {
                if (item[uKey] === val[uKey]) {
                    selectItemKey.push(index)
                    return false
                }
                return true
            })
        })
    }
    //getSelectItems传递当前选中的数据给view层
    getSelectItems(sourceItems)
    return {
        selectedItems: sourceItems,
        selectedItemsKeys: selectItemKey
    }
}

/**
 * 目标表格需要del列时，通过delFlag标识配置
 */
_getColumns(){
    let {distTableOptions, uKey} = this.props
    let {delFlag, columns} = distTableOptions
    const context = this;
    if (delFlag) {
        return columns.concat([{
            key: columns.length,
            title: '操作',
            dataIndex: uKey,
            render(val, row) {
                return <a onClick={context.removeItems.bind(context, row) }>删除</a>
            }
        }])
    } else {
        return columns
    }
}

render() {
    let {formOptions, tableOptions, collapseOptions} = this.props;
    const {selectedItems, selectedItemsKeys, sourceItems} = this.state;

    tableOptions = {
        rowSelection: this.handleRowSelection(),
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
                <DataTable bordered={true} columns={this._getColumns() } dataSource={selectedItems} />
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
