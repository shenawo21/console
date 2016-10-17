import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import Form from 'components/Form';
import DataTable from 'components/DataTable'
import Image from 'components/Image'
import {Input, Select,InputNumber} from 'hen'
import {UploadImage} from 'components/FileLoader'

//验收结果
const STOCKTYPE = [
   { value: 'S001 - 运输途中损坏', title: "S001 - 运输途中损坏" },
   { value: 'S002 - 完整（可重售）', title: "S002 - 完整（可重售）" },
   { value: 'S003 - 完整（不可重售）', title: "S003 - 完整（不可重售）" },
   { value: 'S004 -返回商品与请求商品不符', title: "S004 -返回商品与请求商品不符" }
];

class InfoView extends Component {
    
    constructor() {
        super();
        this.state = {
            goodList: [],
            photoList : []
        }
    }
        
    _getColumns(){
        const context = this;
        const {params} = context.props;
        let isable = params.skuid == 1 ? true : false;
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
            render(value, row){
                return <span>
                            <InputNumber min = {1} max = {9999999} size="large" placeholder="请输入实际数量" style={{ width: 120 }} disabled={isable} onChange={(e) => {
                                let {goodList} = context.state, stock = { refundId: row.refundId, title: row.title, outerSkuId: row.outerSkuId, num: row.num}, selectItems = [], checkResult = ''
                                goodList.forEach((val) => {
                                        if(val.outerSkuId !== row.outerSkuId){
                                            selectItems.push(val)
                                        }else{
                                            checkResult = val.checkResult
                                        }
                                    })
                                    stock.realAmount = e
                                    stock.checkResult = checkResult
                                    selectItems.push(stock)
                                    context.setState({
                                        goodList: selectItems
                                    })
                            }} defaultValue = {value}/> 
                        </span>
            }
        }, {
            key: '4',
            title: '验收结果',
            dataIndex: 'checkResult',
            render(value, row){
                return <span>
                            <Select searchPlaceholder="请选择验收结果" style={{ width: 300 }} disabled={isable} onChange={(e) => {
                                let {goodList} = context.state, stock = { refundId: row.refundId, title: row.title, outerSkuId: row.outerSkuId, num: row.num}, selectItems = [], realAmount = '';
                                    goodList.forEach((val) => {
                                        if(val.skuId !== row.skuId){
                                            selectItems.push(val)
                                        }else{
                                            realAmount = val.realAmount
                                        }
                                    })
                                    stock.checkResult = e
                                    
                                    stock.realAmount = realAmount
                                    selectItems.push(stock)
                                    context.setState({
                                        goodList: selectItems
                                    })
                            }} defaultValue = {value}>
                                <Option value="S001 - 运输途中损坏1">S001 - 运输途中损坏</Option>
                                <Option value="S002 - 完整（可重售）">S002 - 完整（可重售）</Option>
                                <Option value="S003 - 完整（不可重售）">S003 - 完整（不可重售）</Option>
                                <Option value="S004 -返回商品与请求商品不符">S004 -返回商品与请求商品不符</Option>
                            </Select>
                        </span>
            }
        }];

        return columns;
    }

    _getFormItems(){
        let context = this;
        const {item,viewResult, photoList, photoImg, tableOptions, logiListItem, params, ...other} = context.props;
        let upConfig = {
            listType: 'picture',
            showUploadList: true,
            onlyFile: true
        };
        let isable = params.skuid == 1 ? true : false;
        let config = {
            formItems: [{
                label: "快递公司：",
                name: "logisticsCode",
                required: true,
                rules: [{ required: true, message: '请选择快递公司' }],
                select: {
                    optionValue: logiListItem,
                    placeholder: "请选择快递公司",
                    disabled: isable
                }
            },{
                label: "退货快递单号：",
                name: "buyerPackageCode",
                required: true,
                rules: [{ required: true, message: '请输入快递单号' }],
                input: {
                    placeholder: "请输入退货快递单号",
                    disabled: isable
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
                    disabled: isable
                }
            }, {
                label: "验货凭证：",
                name: "checkPics",
                custom(getCustomFieldProps) {
                    upConfig.fileList = photoList;
                    if (params.skuid == 1) {
                        const url = viewResult && viewResult.checkPics
                        const src = url && url.split(',')
                        console.log(src,'src')
                         {
                            src && src.map((item, index)=>{
                            return <Image src={item} width= '80' style={{marginRight:10}} />
                            })
                        }
                    } else {
                        return <UploadImage title="验货凭证" className='upload-list-inline upload-fixed'
                            upConfig={{...upConfig, onChangeFileList:photoImg}}
                            {...getCustomFieldProps('checkPics')} />
                    }
                    
                }
            }],
            initValue: {
                logisticsCode : null,
                buyerPackageCode: null,
                goodList : null,
                remark: null,
                checkPics: null
            }
        }
        // const obj = {
        //         label: "验货凭证：",
        //         name: "checkPics",
        //         render(value) {
        //             debugger
        //            return <Image src={value} width= '80' style={{marginRight:10}} />
        //         }
        //    }
        if (params.skuid == 1 && viewResult) {
            // config.formItems.splice(4, 1);
            // config.formItems.push(obj)
            config.initValue = viewResult
        } else {
            if (item) {
                for (let i in config.initValue) {
                if(i == 'logisticsCode'){
                    config.initValue[i] = item.companyName;
                    } else if(i == 'buyerPackageCode') {
                        config.initValue[i] = item.sid;
                    } else {
                        config.initValue = item
                    } 
                }
                      
            }
        }
        
        return config;
    }
    
    render() {
        let {formOptions, params} = this.props;
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
                      onRest={formOptions.handleReset} buttonOption={ params.skuid == 1? buttonBack:buttonOption } />
            </div>
        )
    }
}

InfoView.propTypes = {       
    loading : React.PropTypes.bool
}

export default InfoView;
