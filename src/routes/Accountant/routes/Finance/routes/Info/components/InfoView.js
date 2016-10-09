import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import Form from 'components/Form';
import { Button } from 'hen';
import DataTable from 'components/DataTable'
import {UploadImage} from 'components/FileLoader'
import RefundView from '../../RefundView';
const RESON = [
            {value:'已发货，买家未举证',title:'已发货，买家未举证'},
            {value:'买家恶意申请退款',title:'买家恶意申请退款'}
        ]
class InfoView extends Component {
    
    constructor() {
        super();
        this.state = {
            photoList : []
        }
    }
        
    _getFormItems(){
        let context = this;
        const {isRequired, photoList, photoImg } = context.props;

        let upConfig = {
            listType: 'picture',
            showUploadList: true,
            onlyFile: true
        };
        let config = {
            formItems: [{
                label: "拒绝退款原因：",
                name: "cwRefuseReason",
                select: {
                    placeholder: "请输入商品名称",
		            optionValue: RESON,
                    disabled: isRequired
                }
            },{
                label: "拒绝退款说明：",
                name: "cwRefuseRemark",
                wrapperCol: {span: 10},
                input: {
                    rows: '5',
                    type: "textarea",
                    placeholder: "请输入审核描述",
                    disabled: isRequired
                }
            }, {
                label: "拒绝退款凭证：",
                name: "cwRefuseProof",
                custom(getCustomFieldProps) {
                    upConfig.fileList = photoList;
                    return <UploadImage title="拒绝退款凭证" className='upload-list-inline upload-fixed'
                            upConfig={{...upConfig, onChangeFileList:photoImg}}
                            {...getCustomFieldProps('cwRefuseProof')} />
                }
            },{
                label: "财务退款说明：",
                name: "cwRemark",
                className: 'border-top',
                wrapperCol: {span: 10},
                input: {
                    rows: '5',
                    type: "textarea",
                    placeholder: "请输入财务退款说明",
                    disabled: isRequired
                }
            }],
            initValue: {
                cwRefuseReason : null,
                cwRefuseRemark: null,
                cwRefuseProof: null,
                cwRemark : null
            }
        }
        return config;
    }
    
    render() {
        let {formOptions, result, isRequired} = this.props;
	    const refundComment = result && result.refundComment ? result.refundComment : {}
        const Goodsstatus = result.afterSaleType == 'REFUND_MONEY' ? '等待退款' : '等待退货'
        const url = refundComment.picUrls || ''
        const src = url && url.split(',')
        const ArryStatus = [
            {name:'订单状态:', status:Goodsstatus},
            {name:'退款说明:', status:refundComment.content}
        ]
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
                <RefundView title='客户退款申请' result={result} ArryStatus={ArryStatus} src={src} />

                <h3 className = 'titleName'>退款审批</h3>
                <Form horizontal items={this._getFormItems()} onSubmit={formOptions.handleSubmit}
                    onRest={formOptions.handleReset} buttonOption={isRequired ? buttonBack : buttonOption} />
            </div>
        )
    }
}

InfoView.propTypes = {       
    loading : React.PropTypes.bool
}

export default InfoView;
