import React, {Component, PropTypes} from 'react';

import Form from 'components/Form';
import DataTable from 'components/DataTable'

import { Input, Select, Button, Popconfirm } from 'hen';
import {Link} from 'react-router';
import Search from 'components/Search';

class outgoMgt extends Component {

  constructor() {
    super();
    this.state = {

    }
  }

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
            },{
                label: "商品品牌：",
                name: "name5",
                input: {}
            }],
            initValue: {
                name1: null,
                name2 : null,
                name3: null,
                name4 : null,
                name5: null
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
            title: '品牌',
            dataIndex: '字段4'
        }, {
            key: '5',
            title: '规格',
            dataIndex: '字段5'
        }, {
            key: '6',
            title: '销售价',
            dataIndex: '字段6'
        }, {
            key: '7',
            title: '剩余可分配库存',
            dataIndex: '字段7'
        }];
        return columns;
    }

    _getColumnsModify(){
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
            title: '品牌',
            dataIndex: '字段4'
        }, {
            key: '5',
            title: '销售价',
            dataIndex: '字段5'
        }, {
            key: '6',
            title: '建议销售价',
            dataIndex: '字段6',
            render(id, row){
                return <input type="text" value="999"/>
            } 
        }, {
            key: '7',
            title: '剩余可分配库存',
            dataIndex: '字段7'
        }, {
            key: '8',
            title: '出库库存',
            dataIndex: '字段6',
            render(id, row){
                return <input type="text" value="999"/>
            } 
        }, {
            key: '9',
            title: '操作',
            dataIndex: 'id',
            render(id, row){
                return <span>
                    <Popconfirm title="确定要删除这个帐号吗？" onConfirm={context.deletedRole.bind(context,id)}>
                        <Button type="link">删除</Button>
                    </Popconfirm>
                </span>
            } 
        }];
        return columns;
    }

    
  render() {
    const {formOptions, item, ...other} = this.props;
        return (
            <div>
                <div className="ant-form-item">
                    <label className="ant-form-item-required">出库类型：</label>
                    <Select defaultValue="1" style={{ width: 200 }}>
                        <Option value="1">调拨出库</Option>
                    </Select>
                </div>
                <div className="ant-form-item">
                    <label className="ant-form-item-required">待出库店铺：</label>
                    <Select defaultValue="1" style={{ width: 200 }}>
                        <Option value="1">乐购天猫旗舰店</Option>
                    </Select>
                </div>
                <div className="ant-form-item">
                    <label className="ant-form-item-required">出库说明：</label>
                    <Input type="textarea" id="control-textarea" style={{ width: 500 }} rows="3" />
                </div>
                <h3 className="tit-table">选择商品分配库存设置价格</h3>
                <Search  items={this._getFormItems()} onSubmit={formOptions.handleSubmit} onReset={formOptions.handleReset} />

                
                <DataTable bordered={true} columns={this._getColumns()}  {...other} />
                <h3 className="tit-table">分配库存设置价格</h3>

                <DataTable bordered={true} columns={this._getColumnsModify()}  {...other} />
                
                <div className="ant-form-item-control ">
                    <Button type="normal">取消</Button>
                    <span>&nbsp;&nbsp;&nbsp;</span>
                    <Button type="primary">确认</Button>
                </div>
            </div>
        );
  }

}

outgoMgt.proptype = {

  loading: React.PropTypes.bool,
  params: React.PropTypes.object

}

export default outgoMgt;

