import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import DataTable from 'components/DataTable';
import Search from 'components/Search';
import {Row, Col, Button, Icon, Popconfirm, DatePicker} from 'hen';

//店铺名称
const STORENAME = [
   { value: 'all', title: "全部" },
   { value: 'taobao', title: "淘宝" },
   { value: 'tianmao', title: "天猫" },
   { value: 'jingdong', title: "京东" }
];

class ReturnMoney extends Component {

    _getFormItems(){
    	let context = this;
        const {cateList} = context.props;
        let config = {
            formItems: [{
                label: "订单编号：",
                name: "tid",
                labelCol: {span: 8},
                span:7,
                input: {
                    placeholder: "请输入出库单号"
                }
            },{
                label: "买家账号：",
                name: "buyerNick",
                labelCol: {span: 8},
                span:7,
                input: {
                    placeholder: "请输入出库单号"
                }
            },{
                label: "店铺名称：",
                name: "shopName",
                labelCol: {span: 8},
                span:7,
                select: {
                    optionValue: STORENAME
                }
            },{
                label: "商品编码：",
                name: "skuId",
                labelCol: {span: 8},
                span:7,
                input: {
                    placeholder: "请输入商品编码"
                }
            },{
                label: "产品名称：",
                name: "title",
                labelCol: {span: 6},
                span:9,
                input: {
                    placeholder: "请输入产品名称"
                }
            }],
            initValue: {
                tid: null,
                buyerNick: null,
                shopName: 'all',
                skuId: null,
                title: null,
            }
        }
        return config;
    }

    _getColumns(){
        const {isAdmin} = this.props;
        const context = this;
        let columns = [{
            key: '1',
            title: '申请发起时间',
            dataIndex: 'created'
        },{
            key: '2',
            title: '商品编码',
            dataIndex: 'skuId'
        }, {
            key: '3',
            title: '产品名称',
            dataIndex: 'title'
        }, {
            key: '4',
            title: '原价格',
            dataIndex: 'price'
        }, {
            key: '5',
            title: '数量',
            dataIndex: 'goodsNum'
        }, {
            key: '6',
            title: '商品总价值',
            dataIndex: 'totalFee'
        }, {
            key: '7',
            title: '退货数量',
            dataIndex: 'refundNums'
        }, {
            key: '8',
            title: '退货金额',
            dataIndex: 'refundFee'
        }, {
            key: '9',
            title: '操作',
            render(id,row) {
                return <div><Link to={`/service/aftersale/info/${row.id}`}>订单退款</Link></div>
            }
        }];
        
        return columns;
    }    
       

    render() {
        const {formOptions, ...other} = this.props;
        
        return (
            <div>
 
                <Search  items={this._getFormItems()} onSubmit={formOptions.handleSubmit} onReset={formOptions.handleReset} />

                <DataTable bordered={true} columns={this._getColumns()} expandedRowRender={record => <p>{record.skuId}</p>}  {...other} ref='dt' />

            </div>
        )
    }
}


ReturnMoney.propTypes = {
    // dataSource : React.PropTypes.array.isRequired,
    // action : React.PropTypes.func.isRequired,
    // loading : React.PropTypes.bool,
    // params : React.PropTypes.object
}


export default ReturnMoney;
