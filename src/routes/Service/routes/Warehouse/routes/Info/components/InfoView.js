import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import Form from 'components/Form';
import DataTable from 'components/DataTable'
import {Input} from 'hen'
import {UploadImage} from 'components/FileLoader'


//快递公司
const STOCKTYPE = [
   { value: '韵达快递', title: "韵达快递" },
   { value: '顺丰快递', title: "顺丰快递" },
   { value: '圆通速递', title: "圆通速递" }
];

class InfoView extends Component {
    
    constructor() {
        super();
        this.state = {
            photoList : [],
            stockList: []
        }
    }
        
    _getColumns(){
        const context = this;
        let columns = [{
            key: '0',
            title: '商品名称',
            dataIndex: 'title'
        }, {
            key: '1',
            title: '商品编码',
            dataIndex: 'outerSkuId'
        }, {
            key: '2',
            title: '退货数量',
            dataIndex: 'num'
        }, {
            key: '3',
            title: '实际数量',
            dataIndex: 'realAmount',
            render(id, row){
                return <span>
                            <Input type="text" placeholder="请输入建议销售价" style={{ width: 120 }} onChange={(e) => {
                                let {stockList} = context.state, stock = { skuId: row.skuId}, selectItems = [], incoming = ''
                                stockList.forEach((val) => {
                                        if(val.skuId !== row.skuId){
                                            selectItems.push(val)
                                        }else{
                                            incoming = val.incoming
                                        }
                                    })
                                    stock.price = e.target.value
                                    stock.incoming = incoming
                                    selectItems.push(stock)
                                    context.setState({
                                        stockList: selectItems
                                    })
                            }} /> 
                        </span>
            }
        }, {
            key: '4',
            title: '验收结果',
            dataIndex: 'checkResult',
            render(id, row){
                return <span>
                            <Input type="text" placeholder="请输入出库库存数" style={{ width: 120 }}  onChange={(e) => {
                                let {stockList} = context.state, stock = { skuId: row.skuId}, selectItems = [], price = '';
                                    stockList.forEach((val) => {
                                        if(val.skuId !== row.skuId){
                                            selectItems.push(val)
                                        }else{
                                            price = val.price
                                        }
                                    })
                                    stock.incoming = e.target.value
                                    stock.price = price
                                    selectItems.push(stock)
                                    context.setState({
                                        stockList: selectItems
                                    })
                            }} />
                        </span>
            }
        }];

        return columns;
    }

    _getFormItems(){
        let context = this;
        const {item, photoList, licenseImg, tableOptions, logiListItem, ...other} = context.props;
        let upConfig = {
            listType: 'picture',
            showUploadList: true,
            onlyFile: true
        };
        let config = {
            formItems: [{
                label: "快递公司：",
                name: "stockType",
                required: true,
                rules: [{ required: true, message: '请选择快递公司' }],
                select: {
                    optionValue: logiListItem,
                    placeholder: "请选择快递公司"
                }
            },{
                label: "退货快递单号：",
                name: "title",
                required: true,
                rules: [{ required: true, message: '请输入快递单号' }],
                input: {
                    placeholder: "请输入商品名称"
                }
            },{
                label: "货物结果：",
                wrapperCol: { span: 24 },
                custom() {
                     return <DataTable bordered={true} size="small" columns={context._getColumns()} {...tableOptions} />
                }
            },{
                label: "备注：",
                name: "remark",
                wrapperCol: {span: 10},
                input: {
                    rows: '5',
                    type: "textarea",
                    placeholder: "请输入审核描述",
                }
            }, {
                label: "验货凭证：",
                name: "businessLicense",
                required: true,
                custom(getCustomFieldProps) {
                    upConfig.fileList = [];
                    return <UploadImage title="验货凭证" className='upload-list-inline upload-fixed'
                            upConfig={{...upConfig, onChangeFileList:licenseImg}}
                            {...getCustomFieldProps('businessLicense')} />
                }
            }],
            initValue: {
                title : null,
                shopId: null,
                categoryCode : null
            }
        }
        if (item) {    
            config.initValue = item;            
        }
        return config;
    }
    
    render() {
        let {formOptions} = this.props;
        /**
         * button 配置项
         * 
         */
        const buttonOption = {
            buttons : [
                {
                    key : 'review',
                    name :'提交验收结果',
                    type : 'primary'
                },
                {
                    key : 'reset',   //重置时，key为reset
                    name : '重置'
                },
                {
                    key : 'back',   
                    name : '返回',
                    handle(){
                        history.go(-1);
                    }
                }
            ]
        }
        const buttonBack = {
            buttons : [
                {
                    key : 'back',   
                    name : '关闭',
                    handle(){
                        history.go(-1);
                    }
                }
            ]
        }
        return (
            <div>
                <Form horizontal items={this._getFormItems()} onSubmit={formOptions.handleSubmit}
                    onRest={formOptions.handleReset} buttonOption={buttonOption} />
            </div>
        )
    }
}

InfoView.propTypes = {       
    loading : React.PropTypes.bool
}

export default InfoView;
