import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import DataTable from 'components/DataTable';
import Search from 'components/Search';
import {Table} from 'hen';

//登记类型
const REGISTERTYPE = [
   { value: '商品退款', title: "商品退款" },
   { value: '邮费补偿', title: "邮费补偿" }
];

class Checked extends Component {

    _getFormItems(){
    	let context = this;
        const {cateList} = context.props;
        let config = {
            formItems: [{
                label: "订单编号：",
                name: "orderId",
                input: {
                    placeholder: "请输入出库单号"
                }
            },{
                label: "买家账号：",
                name: "buyerAccount",
                input: {
                    placeholder: "请输入出库单号"
                }
            },{
                label: "登记类型：",
                name: "type",
                select: {
                    optionValue: REGISTERTYPE,
                    placeholder: "请选择登记类型"
                }
            },{
                label: "商品编码：",
                name: "spuCode",
                input: {
                    placeholder: "请输入产品名称"
                }
            },{
                label: "产品名称：",
                name: "spuName",
                input: {
                    placeholder: "请输入产品名称"
                }
            }],
            initValue: {
                orderId: null,
                buyerAccount: null,
                type: null,
                spuCode: null,
                spuName: null,
            }
        }
        return config;
    }

    _getColumns(){
        const context = this;
        let columns = [{
            key: '0',
            title: '登记时间',
            dataIndex: 'createdAt'
        }, {
            key: '1',
            title: '转出时间',
            dataIndex: 'outTime'
        }, {
            key: '2',
            title: '登记类型',
            dataIndex: 'type'
        }, {
            key: '3',
            title: '转出金额',
            dataIndex: 'outFee'
        }, {
            key: '4',
            title: '订单编号',
            dataIndex: 'orderId'
        }, {
            key: '5',
            title: '商品编码',
            dataIndex: 'spuCode'
        }, {
            key: '6',
            title: '产品名称',
            dataIndex: 'spuName'
        }, {
            key: '7',
            title: '买家账号',
            dataIndex: 'buyerAccount'
        }, {
            key: '8',
            title: '操作',
            dataIndex: 'orderId',
            render(id, row) {
                return <span>
                    <Popconfirm title="确定要删除这个帐号吗？" onConfirm={context.deleted.bind(context,id)}>
                        <Button type="link">删除</Button>
                    </Popconfirm>
                </span>
            }
        }];
        
        return columns;
    }

    /**
     * 删除该记录
     * @params id
     */
    deleted(id) {
        const {del} = this.props
        del(id)
        this.refs && this.refs.dt.refresh();
    }

    render() {
        const {formOptions, tableOption, ...other} = this.props;
        return (
            <div> 
                <Search  items={this._getFormItems()} onSubmit={formOptions.handleSubmitTab} onReset={formOptions.handleReset} />

                <DataTable bordered={true} columns={this._getColumns()} {...tableOption} ref='dt' />
            </div>
        )
    }
}


Checked.propTypes = {
    // dataSource : React.PropTypes.array.isRequired,
    // action : React.PropTypes.func.isRequired,
    // loading : React.PropTypes.bool,
    // params : React.PropTypes.object
}


export default Checked;
