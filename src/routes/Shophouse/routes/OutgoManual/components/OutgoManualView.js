import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

import Form from 'components/Form';
import DataTable from 'components/DataTable';

import {Row, Col, Button, Input, Select} from 'hen';
import Search from 'components/Search';

class AdjustPrice extends Component {
    
    _getFormItems(){
        let config = {
            formItems: [{
                label: "所属店铺：",
                name: "name1",
                select: {}
            },{
                label: "商品名称：",
                name: "name2",
                input: {}
            },{
                label: "商品类目：",
                name: "name3",
                select: {}
            }],
            initValue: {
                name1: null,
                name2 : null,
                name3 : null
            }
        }
        return config;
    }
    
    
    _getColumns(){
        const context = this;
        let columns = [{
            key: '0',
            title: 'SPU编码',
            dataIndex: '字段0'
        }, {
            key: '1',
            title: 'SKU编码',
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
            title: '在售库存',
            dataIndex: '字段5'
        }];
        return columns;
    }
    
    _getColumnsModify(){
        const context = this;
        let columns = [{
            key: '0',
            title: 'SPU编码',
            dataIndex: '字段0'
        }, {
            key: '1',
            title: 'SKU编码',
            dataIndex: '字段1'
        }, {
            key: '2',
            title: '所属店铺',
            dataIndex: '字段2'
        }, {
            key: '3',
            title: '商品名称',
            dataIndex: '字段3'
        }, {
            key: '4',
            title: '在售库存',
            dataIndex: '字段4'
        }, {
            key: '5',
            title: '出库数量',
            dataIndex: '字段5',
            render(id, row){
                return <input type="text" value="999"/>
            }
        }, {
            key: '6',
            title: '库存',
            dataIndex: '字段5'
        }];
        return columns;
    }
    
    render() {
        const {formOptions, ...other} = this.props;
        
        return (
            <div>
                <div className="panel-head">
                    <h3 className="panel-title">手动出库</h3>
                </div>
                <div className="ant-form-item" style={{marginTop:20,marginBottom:0}}>
                    <label className="ant-form-item-required">出库类型：</label>
                    <Select defaultValue="1" style={{ width: 200 }}>
                        <Option value="1">调拨出库</Option>
                    </Select>
                </div>
                <h3 className="tit-table">选择商品</h3>
                <Search  items={this._getFormItems()} onSubmit={formOptions.handleSubmit} onReset={formOptions.handleReset} />
            
                
                <DataTable bordered={true} columns={this._getColumns()}  {...other} />

                <h3 className="tit-table">设置销售价格</h3>

                <DataTable bordered={true} columns={this._getColumnsModify()}  {...other} />
                <div className="ant-form-item">
                    <label className="ant-form-item-required">出库说明：</label>
                    <Input type="textarea" id="control-textarea" rows="3" />
                </div>
                <div className="ant-form-item-control ">
                    <Button type="normal">取消</Button>
                    <span>&nbsp;&nbsp;&nbsp;</span>
                    <Button type="primary">确认</Button>
                </div>
            </div>
        )
    }
}


AdjustPrice.propTypes = {
    
    dataSource : React.PropTypes.array.isRequired,
    action : React.PropTypes.func.isRequired,
    
    loading : React.PropTypes.bool,
    params : React.PropTypes.object
}


export default AdjustPrice;
