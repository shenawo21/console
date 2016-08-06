import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

import DataTable from 'components/DataTable';

import {Row, Col, Button} from 'hen';
import Search from 'components/Search';


class AdjustStock extends Component {
    
    _getFormItems(){
        let config = {
            formItems: [{
                label: "商品名称：",
                name: "name1",
                input: {}
            },{
                label: "SPU：",
                name: "name2",
                input: {}
            },{
                label: "SKU：",
                name: "name3",
                input: {}
            },{
                label: "商品类目：",
                name: "name4",
                select: {}
            }],
            initValue: {
                name1: null,
                name2 : null
            }
        }
        return config;
    }
    
    
    _getColumns(){
        const context = this;
        let columns = [{
            key: '0',
            title: 'spu编码',
            dataIndex: '字段0'
        }, {
            key: '1',
            title: 'sku编码',
            dataIndex: '字段1'
        }, {
            key: '2',
            title: '商品名称',
            dataIndex: '字段2'
        }, {
            key: '3',
            title: '商品类目',
            dataIndex: '字段3'
        }, {
            key: '4',
            title: '规格',
            dataIndex: '字段4'
        }, {
            key: '5',
            title: '库存',
            dataIndex: '字段5'
        }];
        return columns;
    }
    
    
    render() {
        const {formOptions, ...other} = this.props;
        
        return (
            <div>
                <label>＊选择待调整的库存商品</label>
                <Search  items={this._getFormItems()} onSubmit={formOptions.handleSubmit} onReset={formOptions.handleReset} />
            
                
                <DataTable bordered={true} columns={this._getColumns()}  {...other} />

                <label>＊增加库存列表</label>

                <DataTable bordered={true} columns={this._getColumns()}  {...other} />
                <Row>
                    <Col span='2'>
                        <Button>取消</Button>
                    </Col>
                    <Col span='2'>
                        <Button type="primary">确认</Button>
                    </Col>
                </Row>
            </div>
        )
    }
}


AdjustStock.propTypes = {
    
    dataSource : React.PropTypes.array.isRequired,
    action : React.PropTypes.func.isRequired,
    
    loading : React.PropTypes.bool,
    params : React.PropTypes.object
}


export default AdjustStock;
