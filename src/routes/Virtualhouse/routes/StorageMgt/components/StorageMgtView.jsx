import React, {Component, PropTypes} from 'react';

import Form from 'components/Form';
import DataTable from 'components/DataTable'

import {Row, Col, Button, Icon} from 'hen';
import {Link} from 'react-router';


//入库类型
const STOCKTYPE = [
   { value: '新增商品', title: "新增商品" },
   { value: '调整库存', title: "调整库存" }
];

class storageMgt extends Component {

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
            title: 'SPU',
            dataIndex: 'enterpriseCode'
        }, {
            key: '1',
            title: 'SKU',
            dataIndex: 'account'
        }, {
            key: '2',
            title: '商品名称',
            dataIndex: 'name'
        }, {
            key: '3',
            title: '商品类目',
            dataIndex: 'enabled'
        }, {
            key: '4',
            title: '品牌',
            dataIndex: 'email'
        }, {
            key: '5',
            title: '规格',
            dataIndex: 'mobile'
        }, {
            key: '6',
            title: '市场价',
            dataIndex: 'registerTime'
        }, {
            key: '7',
            title: '销售价',
            dataIndex: 'createPerson'
        },{
            key: '8',
            title: '入口数量',
            dataIndex: 'aa'
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
                label: "入库类型：",
                name: "account",
                required: true,
                hasFeedback: true,
                rules: [{ required: true, message: '请选择入库类型' }],
                select: {
                    optionValue: STOCKTYPE,
                    placeholder: "请选择入库类型"
                }
            }, {
                label: "入库说明：",
                name: "textarea",
                required: true,
                rules: [{ required: true, message: '不打算写点什么吗' }],
                input: {
                    type: "textarea",
                    placeholder: "入库说明"
                }
            }, {
                labelCol: { span: 2 },
                label: "待入库商品：",
                custom() {
                    return <Row>
                                <Col span='8'>
                                    <Link className="ant-btn ant-btn-primary" to={`/virtualhouse/storageMgt/createProduct`}>新增商品</Link>
                                </Col>
                                <Col span='8'>
                                    <Link className="ant-btn ant-btn-primary" to={`/virtualhouse/storageMgt/adjustStock`}>调整库存</Link>
                                </Col>
                            </Row>
                }
            },
            {
                wrapperCol: { span: 24 },
                custom() {
                     return <DataTable bordered={true} columns={context._getColumns()} {...other} />
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

    render() {
        const {formOptions, item, ...other} = this.props;
        return (
            <div>
                <Form horizontal items={this._getFormItems()} onSubmit={formOptions.handleSubmit}
                    onRest={formOptions.handleReset} />
                
            </div>
        );
    }

}

storageMgt.proptype = {
loading: React.PropTypes.bool,
params: React.PropTypes.object

}

export default storageMgt;

