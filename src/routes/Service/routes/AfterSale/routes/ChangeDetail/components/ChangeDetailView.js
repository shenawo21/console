import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import Form from 'components/Form';
import { Button } from 'hen';
import DataTable from 'components/DataTable'
import {UploadImage} from 'components/FileLoader'
import Image from 'components/Image'
import RefundView from 'routes/Service/routes/RefundView';

class GoodsInfo extends Component {
   
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
    render() {
        const {result, items, handleSubmit} = this.props;
        // 买家退款申请留言和凭证
        const refundComment = result.refundComment || {}
        // 仓库验货信息
        const checkInfo = result.checkInfo || {}
        const returnUrl = checkInfo.checkPics || ''
        const returnSrc = returnUrl && returnUrl.split(',')

        const url = refundComment.picUrls
        const src = url && url.split(',')
        const ArryStatus = [
            {name:'换货原因:',status:result.reason},
            {name:'备注信息:',status:result.description},
        ]
        const EndbuttonOption = {
            buttons : [
                {
                    key : 'review',
                    name :'结束换货',
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
                <RefundView title = '结束商品换货' result = {result} ArryStatus = {ArryStatus} src = {src} />
                <h3 className = 'titleName'>换货申请处理</h3>
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
                            return  <Image src={item} width= '80' style={{marginRight:10}} /> 
                         })
                     }
                    </span></li> : '' }

                </ul>
                { result.processStatus == 'PROCESS' && result.feedbackStatus == 'ACCEPT' ? 
                    <Form horizontal items={this._getFormEnd()} onSubmit={handleSubmit}  buttonOption={EndbuttonOption} /> : 
                        <Button type="ghost" style = {{marginLeft:40}} onClick = {(() => history.go(-1))}>返回</Button>
                }
                
            </div>
        )
    }
}

GoodsInfo.propTypes = {       
    loading : React.PropTypes.bool
}

export default GoodsInfo;
