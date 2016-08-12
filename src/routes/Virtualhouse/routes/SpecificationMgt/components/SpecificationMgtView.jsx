import React, {Component, PropTypes} from 'react';

import Form from 'components/Form';
import DataTable from 'components/DataTable'

import {Row, Col, Button, Icon, Alert, Cascader, Tabs } from 'hen';
import {Link} from 'react-router';
const TabPane = Tabs.TabPane;


const address = [{
  value: 'zhejiang',
  label: '浙江',
  children: [{
    value: 'hangzhou',
    label: '杭州',
    children: [{
      value: 'xihu',
      label: '西湖',
    }],
  }],
}, {
  value: 'jiangsu',
  label: '江苏',
  children: [{
    value: 'nanjing',
    label: '南京',
    children: [{
      value: 'zhonghuamen',
      label: '中华门',
    }],
  }],
}];


const quickButton = <Button>添加规格值</Button>;

class specificationMgt extends Component {

    constructor(){
        super();
        this.state = {
            
        }
    }

    _getColumns(){
        const {isAdmin} = this.props;
        const context = this;
        let columns = [{
            key: '0',
            title: '排序',
            dataIndex: 'enterpriseCode'
        }, {
            key: '1',
            title: '规格名称',
            dataIndex: 'account'
        }, {
            key: '2',
            title: '操作',
            dataIndex: 'name'
        }];
        
        return columns;
    }

    /**
     * (form表单生成配置)
     *
     * @returns (description)
     */
    _getFormItems() {
        let config = {}, context = this;
        const {item, formOptions, ...other} = context.props;
        config.formItems = [{
                wrapperCol: { span: 24 },
                custom() {
                     return 
                }
            }];

        config.initValue = {
            account: null,
            textarea: null,
            password: null
        };
        
        if (item) {    
            config.initValue = item;            
        }
        
        return config;
    }
    // 按钮
    quickButton(){ 
        return <Button>添加属性规格</Button>
    }

    render() {
        const {formOptions, item, ...other} = this.props;
        const note = <ol>
            <li>1、选择企业经营的商品类目，以读取平台绑定的商品类目及类目下的规格类型，如类目：“服装”；规格类型：“颜色”、“尺码”等。</li>
            <li>2、添加所属规格类型下的规格值，已有规格值可以删除；新增的规格值必须填写，否则该行数据不会被更新或者保存。</li>
            <li>3、可通过排序0-255改变规格值显示顺序。</li>
        </ol>
        function onChange(value) {
            console.log(value);
        }
        function callback(key) {
            console.log(key);
        }
        return (
            <div>
                <Alert message="操作提示：" description={note} type="info" closeText="不再提醒" />
                <form className="ant-form-horizontal">
                    <div className="ant-form-item">
                        <label className="ant-form-item-required">经营的商品类目：</label>
                        <Cascader options={address} onChange={onChange} placeholder="请选择" />
                    </div>
                    <Tabs defaultActiveKey="1" onChange={callback} tabBarExtraContent={quickButton}>
                        <TabPane tab="颜色" key="1">
                            <DataTable bordered={true} columns={this._getColumns()} {...other} />
                        </TabPane>
                        <TabPane tab="尺寸" key="2">
                            <DataTable bordered={true} columns={this._getColumns()} {...other} />
                        </TabPane>
                    </Tabs>                                   
                    <div className="ant-form-item-control ">
                        <Button type="primary">提交保存规格值</Button>
                    </div>
                </form>
                
                
            </div>
        );
    }

}

specificationMgt.proptype = {

loading: React.PropTypes.bool,
params: React.PropTypes.object

}

export default specificationMgt;

