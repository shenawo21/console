import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import DataTable from 'components/DataTable';
import Search from 'components/Search';
import {Row, Col, Button, Icon, Popconfirm, DatePicker} from 'hen';

class ReturnMoney extends Component {

    _getFormItems(){
    	let context = this;
        const {shopListItem} = context.props;
        let config = {
            formItems: [{
                label: "订单编号：",
                name: "tid",
                labelCol: {span: 8},
                span:7,
                input: {}
            },{
                label: "买家账号：",
                name: "buyerNick",
                labelCol: {span: 8},
                span:7,
                input: {}
            },{
                label: "店铺名称：",
                name: "shopName",
                labelCol: {span: 8},
                span:7,
                select: {
                    optionValue: shopListItem
                }
            },{
                label: "商品编码：",
                name: "skuId",
                labelCol: {span: 8},
                span:7,
                input: {}
            },{
                label: "产品名称：",
                name: "title",
                labelCol: {span: 6},
                span:9,
                input: {}
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
         // 测试数据
        const data = [
            {key:1,created:'2016年8月29日',skuId:'113444',title:'title2',price:'3',goodsNum:'3',totalFee:'3',totalFee:'3',refundNums:'3',refundFee:'3',description:'ceshi1'},
            {key:2,created:'2016年8月30日',skuId:'57626',title:'title',price:'5',goodsNum:'3',totalFee:'3',totalFee:'3',refundNums:'3',refundFee:'3',description:'ceshi3'},
            {key:3,created:'2016年8月31日',skuId:'14667',title:'title3',price:'7',goodsNum:'3',totalFee:'3',totalFee:'3',refundNums:'3',refundFee:'3',description:'ceshi6'},
        ] 
        return (
            <div>
 
                <Search  items={this._getFormItems()} onSubmit={formOptions.handleSubmit} onReset={formOptions.handleReset} />

                <DataTable bordered={true} columns={this._getColumns()}   expandedRowRender={record => <p>{record.description}</p>} dataSource={data}  ref='dt' />

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
