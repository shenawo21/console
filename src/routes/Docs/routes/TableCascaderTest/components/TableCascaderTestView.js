import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

import DataTable from 'components/DataTable';
import concat from 'lodash/concat'

import Search from 'components/Search';
//是否可用
const STATUS = [
    { value: false, title: "不可用" },
    { value: true, title: "可用" }
];

class TableCascaderTest extends Component {
    constructor(props) {
        super(props)
        this.state = {
            sourceItems: null,
            selectedItems: [],
            selectedItemsKeys: []
        }
    }

    _getFormItems() {
        let config = {
            formItems: [{
                label: "账号：",
                name: "account",
                input: {
                    placeholder: "请输入昵称"
                }
            }, {
                    label: "用户姓名：",
                    name: "name",
                    input: {
                        placeholder: "请输入用户姓名"
                    }
                }, {
                    label: "是否可用：",
                    name: "enabled",
                    select: {
                        placeholder: "请选择是否可用",
                        optionValue: STATUS
                    }
                }],
            initValue: {
                name: null,
                nick: null
            }
        }
        return config;
    }


    _getColumns() {
        let columns = [{
                key: '0',
                title: '企业编码',
                dataIndex: 'enterpriseCode'
            }, {
                key: '1',
                title: '帐号',
                dataIndex: 'account'
            }, {
                key: '2',
                title: '用户姓名',
                dataIndex: 'name'
            }, {
                key: '3',
                title: '是否可用',
                dataIndex: 'enabled',
                render(status) {
                    return status ? <span>可用</span> : <span>不可用</span>
                }
            }, {
                key: '4',
                title: '邮箱',
                dataIndex: 'email'
            }, {
                key: '5',
                title: '手机号码',
                dataIndex: 'mobile'
            }, {
                key: '6',
                title: '注册时间',
                dataIndex: 'registerTime'
            }, {
                key: '7',
                title: '创建人',
                dataIndex: 'createPerson'
            }];
        return columns;
    }

    _getColumnsDist() {
        const context = this;
        let columns = [{
                key: '0',
                title: '企业编码',
                dataIndex: 'enterpriseCode'
            }, {
                key: '1',
                title: '帐号',
                dataIndex: 'account'
            }, {
                key: '2',
                title: '用户姓名',
                dataIndex: 'name'
            }, {
                key: '6',
                title: '注册时间',
                dataIndex: 'registerTime'
            }, {
                key: '7',
                title: '操作',
                dataIndex: '_sKey',
                render(val, row){
                    return <a onClick={context.delItem.bind(context, val, row)}>删除</a>
                }
            }];
        return columns;
    }


    handleRowSelection() {
        const context = this;
        let curItems = this.state.sourceItems || {};
        return {
            onSelect(record, selected, selectedRows) {
                console.log('onselect',record);
                context.getSelectedItems(curItems, selectedRows)
            },
            onSelectAll(selected, selectedRows, changeRows) {
                context.getSelectedItems(curItems, selectedRows)
            }
        }
    }

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
    
    removeItems(pageNumber, curItem){
        const {sourceItems} = this.state;
        sourceItems[pageNumber].forEach((item, index) => {
            if (item.adminId == curItem.adminId) {
                sourceItems[pageNumber].splice(index, 1)
                return false
            }
        })
        !sourceItems[pageNumber].length && delete sourceItems[pageNumber]
        console.log(sourceItems);
        this.setState(this.getItems(sourceItems))
    }

    delItem(index, row){
        let num = index.split('_');
        this.removeItems && this.removeItems(num[0], row)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.tableOptions && (nextProps.tableOptions.dataSource !== this.props.tableOptions.dataSource)) {
            let {sourceItems} = this.state;
            this.setState(this.getItems(sourceItems, nextProps))
        }
    }

    getItems(sourceItems, nextProps) {
        let selectItem = [], selectItemKey = []
        const {tableOptions} = nextProps || this.props
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
                                if (item.adminId == val.adminId) {
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
        return {
            selectedItems: selectItem,
            selectedItemsKeys: selectItemKey
        }
    }

    componentWillUnmount(){
        this.setState({
            sourceItems: null,
            ...this.getItems()
        })
    }

    render() {
        let {formOptions, tableOptions} = this.props;
        const {selectedItems, selectedItemsKeys, sourceItems} = this.state;
        console.log('21212', selectedItemsKeys, selectedItems,sourceItems);

        tableOptions = {
            rowSelection : this.handleRowSelection(),    //需要checkbox时填写
            
            ...tableOptions
        }

        return (
            <div>
                <Search  items={this._getFormItems() } onSubmit={formOptions.handleSubmit} onReset={formOptions.handleReset} />
                <DataTable bordered={true} columns={this._getColumns()} selectedItemsKeys={selectedItemsKeys} {...tableOptions} ref='dts' />

                <DataTable bordered={true} columns={this._getColumnsDist() } dataSource={selectedItems} />

            </div>
        )
    }
}


TableCascaderTest.propTypes = {

    dataSource: React.PropTypes.array.isRequired,
    action: React.PropTypes.func.isRequired,

    loading: React.PropTypes.bool,
    params: React.PropTypes.object
}


export default TableCascaderTest;
