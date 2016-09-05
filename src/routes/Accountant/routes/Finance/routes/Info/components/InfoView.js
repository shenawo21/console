import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import Form from 'components/Form';
import DataTable from 'components/DataTable'
import {UploadImage} from 'components/FileLoader'


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
            title: '商品编码',
            dataIndex: 'skuId'
        },{
            key: '1',
            title: '商品名称',
            dataIndex: 'title'
        },{
            key: '2',
            title: '原价格',
            dataIndex: 'price'
        }, {
            key: '3',
            title: '数量',
            dataIndex: 'refund_nums'
        }, {
            key: '4',
            title: '商品总价值',
            dataIndex: 'specOneValue'
        }, {
            key: '5',
            title: '优惠金额',
            dataIndex: 'specOneValue'
        }, {
            key: '4',
            title: '退货数量',
            dataIndex: 'specOneValue'
        }, {
            key: '4',
            title: '退货金额',
            dataIndex: 'specOneValue'
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
                label: "退货快递单号：",
                name: "title",
                required: true,
                rules: [{ required: true, message: '请输入快递单号' }],
                input: {
                    placeholder: "请输入商品名称"
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
        let {formOptions, params, ...other} = this.props;
        /**
         * 多个按钮配置如下：
         * 1、需要重置按钮时，key值为reset
         * 2、需要多个提交按钮时，key为必须，且在handleSubmit函数里面，根据key值进行区分操作,
         * 3、如果不配buttons参数，按钮默认为提交与重置
         */
        const buttonOption = {
            buttons : [
                {
                    key : 'review',
                    name :'通过',
                    type : 'primary'
                },
                {
                    key : 'refuse',
                    name : '拒绝',
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

        const buttonOptionS = {
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
                <h3 className = 'titleName'>客户退款申请</h3>
                <DataTable bordered={true} size="small" columns={this._getColumns()} {...other} />

                <h3 className = 'titleName'>退款审批</h3>
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
