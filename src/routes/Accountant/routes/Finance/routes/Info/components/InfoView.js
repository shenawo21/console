import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import Form from 'components/Form';
import { Button,Modal } from 'hen';
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
                required: true,
                select: {
                    placeholder: "请输入拒绝退款原因",
		            optionValue: RESON,
                    disabled: isRequired
                }
            },{
                label: "拒绝退款说明：",
                name: "cwRefuseRemark",
                required: true,
                wrapperCol: {span: 10},
                input: {
                    rows: '5',
                    type: "textarea",
                    placeholder: "请输入拒绝退款说明",
                    disabled: isRequired
                }
            }, {
                label: "拒绝退款凭证：",
                name: "cwRefuseProof",
                required: true,
                custom(getCustomFieldProps) {
                    upConfig.fileList = photoList;
                    return <UploadImage title="拒绝退款凭证" className='upload-list-inline upload-fixed'
                            upConfig={{...upConfig, onChangeFileList:photoImg}}
                            {...getCustomFieldProps('cwRefuseProof')} />
                }
            },{
                label: "财务退款说明：",
                name: "cwRemark",
                required: true,
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
    _getFormIModal(){
        let config = {
            formItems: [{
                label: "请输入验证码：",
                name: "msgCode",
                wrapperCol: { span: 15 },
                labelCol: { span: 7},
                input: {
                    placeholder: "请输入收到的验证码",
                }
            }],
            initValue: {
                msgCode : null,
            }
        }

        return config;
        
    }
    render() {
        let {formOptions, result, isRequired,visible,handleOk} = this.props;
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
                <Modal title="输入验证码"
                    visible={visible} closable = {false}
                    onOk={()=>{
                        this.refs.form && this.refs.form.validateFields((errors, values) => {
                            if (!!errors) {
                                return;
                            }
                            handleOk(values,this.refs.form);
                        });
                    }}
                    onCancel={formOptions.handleCancel} >
                    <Form horizontal items={this._getFormIModal()} button={<span></span>} ref='form' />
            </Modal>    
            </div>
        )
    }
}

InfoView.propTypes = {       
    loading : React.PropTypes.bool
}

export default InfoView;
