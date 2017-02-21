import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

import Form from 'components/Form';
import DataTable from 'components/DataTable'
import {getSpecValue} from 'common/utils'

import {Row, Col} from 'hen';

//入库类型
const STOCKTYPE = [
   { value: '手动添加', title: "手动添加" },
   { value: '店铺回退', title: "店铺回退" },
   { value: '调整入库', title: "调整入库" }
];

class storageMgt extends Component {

    constructor(){
        super();
        this.state = {
            
        }
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
            title: '商品名称',
            dataIndex: 'title'
        }, {
            key: '3',
            title: '商品类目',
            dataIndex: 'categoryName'
        }, {
            key: '4',
            title: '品牌',
            dataIndex: 'brandName'
        }, {
            key: '5',
            title: '规格',
            dataIndex: 'specOneValue',
            render(val, row){
                return getSpecValue(row)
            }
        }, {
            key: '6',
            title: '市场价',
            dataIndex: 'marketPrice'
        },{
            key: '7',
            title: '采购价',
            dataIndex: 'purchasePrice'
        }, {
            key: '8',
            title: '销售价',
            dataIndex: 'price'
        },{
            key: '9',
            title: '入库数量',
            dataIndex: 'incoming'
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
        const {item, ...other} = context.props;
        config.formItems = [{
            label: "入库类型：",
            name: "stockType",
            required: true,
            hasFeedback: true,
            rules: [{ required: true, message: '请选择入库类型' }],
            select: {
                optionValue: STOCKTYPE,
                placeholder: "请选择入库类型"
            }
        }, {
            label: "入库说明：",
            name: "remark",
            required: true,
            rules: [{ required: true, message: '不打算写点什么吗' }],
            input: {
                type: "textarea",
                placeholder: "入库说明"
            }
        }, {
            labelCol: { span: 2 },
            label: "待入库商品：",
            //name: 'proList',
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
            recordType: null,
            remark: null,
            proList: null
        };
        
        if (item) {    
            config.initValue = item;            
        }
        
        return config;
    }

    render() {
        const {formOptions} = this.props;
        return (
            <div>
                <Form horizontal items={this._getFormItems()} onSubmit={formOptions.handleSubmit} buttonOption = {formOptions.buttonOption} />
            </div>
        );
    }

}

storageMgt.proptype = {
loading: React.PropTypes.bool,
params: React.PropTypes.object
}

export default storageMgt ;

