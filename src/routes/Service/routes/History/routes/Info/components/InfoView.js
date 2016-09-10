import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import Form from 'components/Form';
import DataTable from 'components/DataTable'
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
            photoList : []
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
            dataIndex: 'skuId'
        }, {
            key: '2',
            title: '退货数量',
            dataIndex: 'goodNum'
        }, {
            key: '3',
            title: '实际数量',
            dataIndex: 'realAmount'
        }, {
            key: '4',
            title: '验收结果',
            dataIndex: 'checkResult'
        }];
        return columns;
    }

    _getFormItems(){
        let context = this;
        const {item, photoList, licenseImg, ...other} = context.props;
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
                    optionValue: STOCKTYPE,
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
                     return <DataTable bordered={true} size="small" columns={context._getColumns()} {...other} />
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
        return config;
    }
    
    render() {
        let {formOptions} = this.props;
        const buttonOption = {
            buttons : [
                {
                    key : 'back',   
                    name : '返回',
                    handle(){
                        history.go(-1);
                    }
                }
            ]
        }
        return (
            <div>
                <Form horizontal items={this._getFormItems()} buttonOption={buttonOption} />
            </div>
        )
    }
}

InfoView.propTypes = {       
    loading : React.PropTypes.bool
}

export default InfoView;
