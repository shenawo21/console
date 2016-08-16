import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

import DataTable from 'components/DataTable';

import Search from 'components/Search';

import {Row, Col, Button, Icon, Popconfirm} from 'hen';

//所属店铺
const STATUS = [
   { value: false, title: "不可用" },
   { value: true, title: "可用" }
];

class shop extends Component {

    _getFormItems(){
        let config = {
            formItems: [{
                label: "所属店铺：",
                name: "shopName",
                input: {
                    placeholder: "请选择所属店铺",
                    optionValue: STATUS
                }
            }, {
                label: "商品名称：",
                name: "name",
                select: {
                    placeholder: "请输入商品名称"
                }
            },{
                label: "商品类目：",
                name: "enabled",
                select: {
                    placeholder: "请选择商品类目",
                    optionValue: STATUS
                }
            }],
            initValue: {
                name: null,
                nick : null
            }
        }
        return config;
    }


    _getColumns(){
        const context = this;
        let columns = [{
            key: '0',
            title: 'SPU',
            dataIndex: 'spuId'
        }, {
            key: '1',
            title: 'SKU',
            dataIndex: 'skuId'
        }, {
            key: '2',
            title: '所属店铺',
            dataIndex: 'shopName'
        }, {
            key: '3',
            title: '商品名称',
            dataIndex: 'title'
        }, {
            key: '4',
            title: '商品类目',
            dataIndex: 'categoryName'
        }, {
            key: '5',
            title: '品牌',
            dataIndex: 'brandId'
        }, {
            key: '6',
            title: '规格',
            dataIndex: 'specOneValue'
        }, {
            key: '7',
            title: '市场价',
            dataIndex: 'marketPrice'
        }, {
            key: '8',
            title: '销售价',
            dataIndex: 'price'
        }, {
            key: '9',
            title: '在售库存',
            dataIndex: 'stock'
        }];
        
        return columns;
    }

    render() {
        const {formOptions, ...other} = this.props;
        
        return (
            <div>
                <div style={{marginBottom:20}}>
                    <Row>
                        <Col span='2'>
                            <Link className="ant-btn ant-btn-normal" to={`/shophouse/adjustPrice`}>价格调整</Link>
                        </Col>
                        <Col span='2'>
                            <Link className="ant-btn ant-btn-normal" to={`/shophouse/outgoManual`}>手动出库</Link>
                        </Col>
                    </Row>
                </div>
                <Search  items={this._getFormItems()} onSubmit={formOptions.handleSubmit} onReset={formOptions.handleReset} />


                <DataTable bordered={true} columns={this._getColumns()} {...other} ref='dt' />

            </div>
        )
    }
}


shop.propTypes = {

    // dataSource : React.PropTypes.array.isRequired,
    // action : React.PropTypes.func.isRequired,

    // loading : React.PropTypes.bool,
    // params : React.PropTypes.object
}


export default shop;
