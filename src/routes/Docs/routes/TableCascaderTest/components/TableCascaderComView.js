import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

import TableCascader from 'components/TableCascader'
//是否可用
const STATUS = [
    { value: false, title: "不可用" },
    { value: true, title: "可用" }
];

class TableCascaderTest extends Component {
    constructor(props) {
        super(props)
        this.getData = this.getData.bind(this);
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
            }];
        return columns;
    }

    /**
     * 
     * 选中后，获取的数据
     * @param {any} items
     */
    getData(items) {
        console.log('items=======', items)
    }


    render() {
        let {formOptions, tableOptions} = this.props;

        tableOptions = {
            columns: this._getColumns(),
            ...tableOptions
        }

        let distTableOptions = {
            delFlag: true,
            columns: this._getColumnsDist()
        }

        formOptions = {
            items: this._getFormItems(),
            ...formOptions
        }

        let collapseOptions = {
            source : {
                titles:[{
                    name:1111
                }]
            },
            dist: {
                titles:[{
                    name:22222
                }]
            }
        }

        return (
            <div>
                <TableCascader uKey='adminId' formOptions={formOptions} tableOptions={tableOptions} distTableOptions={distTableOptions} getSelectItems={this.getData} collapseOptions={collapseOptions}></TableCascader>
            </div>
        )
    }
}

TableCascaderTest.propTypes = {

    // dataSource: React.PropTypes.array.isRequired,
    // action: React.PropTypes.func.isRequired,

    // loading: React.PropTypes.bool,
    // params: React.PropTypes.object
}


export default TableCascaderTest;
