import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import Form from 'components/Form';
import { Button } from 'hen';
import DataTable from 'components/DataTable'
import Image from 'components/Image';
import showBigPic from 'components/BigPic'
import {UploadImage} from 'components/FileLoader'
import RefundView from 'routes/Service/routes/RefundView';
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
        const {isRequired, photoImg , photoList} = context.props;
        let upConfig = {
            listType: 'picture',
            showUploadList: true,
            onlyFile: true
        };
        let config = {
            formItems: [{
                label: "退款审批说明：",
                name: "optRemark",
                required: true,
                wrapperCol: {span: 10},
                input: {
                    rows: '5',
                    type: "textarea",
                    placeholder: "请输入审核描述",
                }
            }],
            initValue: {
                cwRefuseReason : null,
                optRemark: null,
                cwRefuseProof : null
            }
        }
        if (isRequired == true) {
            const obj = {
                label: "拒绝退款原因：",
                name: "cwRefuseReason",
                required: true,
                // rules: [{ required: true, message: '请选择拒绝退款原因' }],
                select: {
                    placeholder:'请选择拒绝退款原因',
                    optionValue: RESON
                }
            }
            const objfirst = {
                label: "拒绝凭证：",
                required: true,
                name: "cwRefuseProof",
                custom(getCustomFieldProps) {
                    upConfig.fileList = photoList;
                    return <UploadImage title="验货凭证" className='upload-list-inline upload-fixed'
                            upConfig={{...upConfig, onChangeFileList:photoImg}}
                            {...getCustomFieldProps('cwRefuseProof')} />
                }
            }
             config.formItems.unshift(objfirst,obj)
        }

        return config;
    }
    showBigPhoto (item) {
        let src = 'http://172.19.6.133:8898/file-service/image/product/base/' + item
        showBigPic({imgSrc:src})
    }
    showBig (item) {
        showBigPic({imgSrc:item})
    }
    render() {
        const {result, handleSubmit} = this.props;
        const refundComment = result.refundComment || {}
        const Goodsstatus = result.afterSaleType == 'REFUND_MONEY' ? '等待退款' : '等待退货'
        const url = refundComment.picUrls 
        const src = url && url.split(',')

        const returnUrl = result.cwRefuseProof 
        const returnSrc = returnUrl && returnUrl.split(',')

        const ArryStatus = [
            {name:'订单状态:',status:Goodsstatus || ''},
            {name:'退款说明:',status:result.description ? result.description : ''},
        ]
        const buttonOption = {
            buttons : [
                {
                    key : 'review',
                    name :'审核通过，通知财务退款',
                    type : 'primary',
                },
                // {
                //     key : 'refuse',
                //     name : '拒绝退款',
                // },
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
                <RefundView title ='客户退款申请' result = {result} ArryStatus = {ArryStatus} src = {src} showBig = {this.showBig.bind(this)} />
                <h3 className = 'titleName'>退款审批</h3>
                { ((result.processStatus == 'PROCESS' || result.processStatus == 'SUCCESS' || result.processStatus == 'DENY') && result.refundResult !== null ) ? 
                <ul className = 'form-talbe'>
                    {result.cwRefuseReason ? <li><b>拒绝退款原因:</b><span>{result.cwRefuseReason}</span></li> : '' }
                    {result.optRemark ? <li><b>退款审批说明:</b><span>{result.optRemark}</span></li> : '' }
                    {returnSrc ? <li><b>发货凭证:</b><span>
                      {
                        returnSrc && returnSrc.map((item, index)=>{
                            return  <Image src={item} width= '80' style={{marginRight:10}} onClick={this.showBigPhoto.bind(this,item)} /> 
                         })
                     }
                    </span></li> : '' }
                    <li><b>&nbsp;</b><Button type="ghost" onClick = {(() => history.go(-1))}>返回</Button></li>
                </ul> :                 
                <Form horizontal items={this._getFormItems()} onSubmit={handleSubmit}  buttonOption={buttonOption} />}
            </div>
        )
    }
}

InfoView.propTypes = {       
    loading : React.PropTypes.bool
}

export default InfoView;
