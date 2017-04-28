import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import Form from 'components/Form';
import { Button } from 'hen';
import DataTable from 'components/DataTable'
import Image from 'components/Image'
import showBigPic from 'components/BigPic'
import {UploadImage} from 'components/FileLoader'
import RefundView from 'routes/Service/routes/RefundView';
const getImageUrl = Image.getImageUrl;

class GoodsInfo extends Component {
    constructor(props) {
        super(props);        
        this.state = {
            sellerName:'',
            sellerPost:'',
            sellerPhone:'',
            fullAddress:''
        }
    }     
    _getFormEnd() {
        let context = this;
        let config = {
            formItems: [{
                label: "结束退货备注：",
                name: "endRemark",
                input: {
                    rows: '5',
                    type: "textarea",
                    placeholder: "请输入留言内容",
                }
            }],
            initValue: {
                endRemark:null
            }
        }
        return config;
    }
    _getFormNotice() {
        let context = this;
        let config = {
            formItems: [{
                label: "备注：",
                name: "optRemark",
                input: {
                    rows: '5',
                    type: "textarea",
                    placeholder: "请输入留言内容"
                }
            }],
            initValue: {
                optRemark:null
            }
        }
        return config;
    }
    showBigPhoto (item) {
        let src =  getImageUrl({name : item})
        showBigPic({imgSrc:src})
    }
    showBig (item) {
        showBigPic({imgSrc:item})
    }
    render() {
        const {result, items, handleSubmit,NoticehandleSubmit} = this.props;
        // 买家退款申请留言和凭证
        const refundComment = result.refundComment || {}
        // 仓库验货信息
        const checkInfo = result.checkInfo || {}
        const returnUrl = checkInfo.checkPics || ''
        const returnSrc = returnUrl && returnUrl.split(',')
        const url = refundComment.picUrls
        const src = url && url.split(',')
        const ArryStatus = [
            {name:'申请退款金额:',status:result.refundFee},
            {name:'退货原因:',status:result.reason},
            {nameInfo:'退货说明:',statusInfo:refundComment.content},
        ]
        const EndbuttonOption = {
            buttons : [
                {
                    key : 'review',
                    name :'结束退货',
                    type : 'primary',
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
        const NoticebuttonOption = {
            buttons : [
                {
                    key : 'notice',
                    name :'通知财务退款',
                    type : 'primary',
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
        return (
            <div>
                <RefundView title = '客户退货申请详情' result = {result} ArryStatus = {ArryStatus} src = {src} showBig = {this.showBig.bind(this)} />
                <h3 className = 'titleName'>退货申请处理</h3>
                <ul className = 'form-talbe'>
                    {result.valueBearType ? <li><b>商品价值承担:</b><span>{result.valueBearType}</span></li> : '' }
                    {result.postBearType ? <li><b>邮费承担:</b><span>{result.postBearType}</span></li> : '' }
                    {result.fullAddress ? <li><b>详细地址:</b><span>{result.fullAddress}</span></li> : '' }
                    {result.sellerName ? <li><b>卖家姓名:</b><span>{result.sellerName}</span></li> : '' }
                    {result.sellerTel ? <li><b>卖家座机号:</b><span>{result.sellerTel}</span></li> : '' }
                    {result.sellerPhone ? <li><b>卖家手机号:</b><span>{result.sellerPhone}</span></li> : '' }
                    {result.sellerRemark ? <li><b>卖家留言:</b><span>{result.sellerRemark}</span></li> : '' }
                </ul>
                <h3 className = 'titleName'>仓库反馈</h3>
                 <ul className = 'form-talbe'>
                    {checkInfo.buyerPackageCode ? <li><b>退货快递单号:</b><span>{checkInfo.buyerPackageCode}</span></li> : '' }
                    {checkInfo.checkResult ? <li><b>货物结果:</b><span>{checkInfo.checkResult}</span></li> : '' }
                    {checkInfo.remark ? <li><b>仓库验收备注:</b><span>{checkInfo.remark}</span></li> : '' }
                    {returnSrc ? <li><b>验货凭证:</b><span>
                      {
                        returnSrc && returnSrc.map((item, index)=>{
                            return  <Image src={item} width= '80' style={{marginRight:10}} onClick={this.showBigPhoto.bind(this,item)} /> 
                         })
                     }
                    </span></li> : '' }

                </ul>
                { result.processStatus == 'PROCESS' && result.feedbackStatus !== null && result.refundResult !== null ? 
                    <Form horizontal items={this._getFormEnd()} onSubmit={handleSubmit}  buttonOption={EndbuttonOption} /> :
                    <Form horizontal items={this._getFormNotice()} onSubmit={NoticehandleSubmit }  buttonOption={NoticebuttonOption} />

                }
                
            </div>
        )
    }
}

GoodsInfo.propTypes = {       
    loading : React.PropTypes.bool
}

export default GoodsInfo;
