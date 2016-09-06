import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import Form from 'components/Form';
import { Button } from 'hen';
import DataTable from 'components/DataTable'
import {UploadImage} from 'components/FileLoader'
import RefundView from 'routes/Service/routes/RefundView';

class GoodsInfo extends Component {
        
    _getFormItems(){
        let context = this;
        const {isDel} = context.props;
        console.log(isDel,'11')
        let config = {
            formItems: [{
                label: "商品价值承担：",
                name: "valueBearType",
                required: true,
                rules:[{required: true, message: '请选择商品价值承担'}],
                radio: {
                        radioValue: [
                            { value: "屈臣氏淘宝旗舰店", title: '屈臣氏淘宝旗舰店' },
                            { value: "买家", title: '买家' },
                            { value: "快递公司", title: '快递公司' },
                            { value: "服务商", title: '服务商' }
                        ],
                    }
            },{
                label: "邮费承担：",
                name: "postBearType",
                required: true,
                rules:[{required: true, message: '请选择邮费承担'}],
                radio: {
                        radioValue: [
                            { value: "屈臣氏淘宝旗舰店", title: '屈臣氏淘宝旗舰店' },
                            { value: "买家", title: '买家' },
                            { value: "快递公司", title: '快递公司' },
                            { value: "服务商", title: '服务商' }
                        ],
                    }
            },{
                label: "退货地址：",
                name: "fullAddress",
                required: true,
                rules:[{required: true, message: '请输入退货地址'}],
                // select: {
                //     placeholder:'请选择拒绝退款原因',
                //     optionValue: ''
                // }
                input: {
                }
            },{
                label: "卖家姓名：",
                name: "sellerName",
                required: true,
                rules:[{required: true, message: '请输入卖家姓名'}],
                input: {
                }
            },{
                label: "邮编：",
                name: "sellerPost",
                input: {}
            },{
                label: "座机号：",
                name: "sellerTel",
                input: {}
            },{
                label: "手机号：",
                name: "sellerPhone",
                required: true,
                rules:[{required: true, message: '请输入手机号码'}],
                input: {}
            },{
                label: "卖家留言",
                name: "sellerRemark",
                wrapperCol: {span: 10},
                rules:[{required: true, message: '请输入手机号码'}],
                input: {
                    rows: '5',
                    type: "textarea",
                    placeholder: "请输入留言内容",
                }
            }],
            initValue: {
                valueBearType : null,
                postBearType: null,
                fullAddress : null,
                sellerName:null,
                sellerPost:null,
                sellerTel:null,
                sellerPhone:null,
                sellerRemark:null
            }
        }
        if (isDel == true) {
            console.log('qqqqqqqqq')
             config.formItems.splice(1, 7);
        }
        return config;
    }
    
    render() {
        const {result, handleGoodSubmit} = this.props;
        const refundComment = result.refundComment || {}
        const url = refundComment.picUrls
        const src = url && url.split(',')
        const ArryStatus = [
            {name:'申请退款金额:',status:result.refundFee},
            {name:'退货原因:',status:result.cwRefuseReason},
            {name:'退货说明:',status:refundComment.content},
        ]
        const buttonOption = {
            buttons : [
                {
                    key : 'review',
                    name :'同意退货，通知仓库退货入库',
                    type : 'primary',
                },
                {
                    key : 'refuse',
                    name : '拒绝退货',
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
                <RefundView title = '客户退货申请详情' result = {result} ArryStatus = {ArryStatus} src = {src} />

                <h3 className = 'titleName'>退货申请处理</h3>
                {/**{result.processStatus = 'PROCESS' ? 
                <ul className = 'form-talbe'>
                    <li><b>退款审批说明:</b><span>{result.optRemark}</span></li>
                    <li><b>发货凭证:</b><span>
                    </span></li>
                    <li><b>&nbsp;</b><Button type="ghost" onClick = {(() => history.go(-1))}>返回</Button></li>
                </ul> : 
                result.processStatus = 'DENY' ? 
                <ul className = 'form-talbe'>
                    <li><b>拒绝退款原因:</b><span>{result.cwRefuseReason}</span></li>
                    <li><b>发货凭证:</b><span>
                    </span></li>
                    <li><b>&nbsp;</b><Button type="ghost" onClick = {(() => history.go(-1))}>返回</Button></li>
                </ul> :  */}
                <Form horizontal items={this._getFormItems()} onSubmit={handleGoodSubmit}  buttonOption={buttonOption} /> 
            </div>
        )
    }
}

GoodsInfo.propTypes = {       
    loading : React.PropTypes.bool
}

export default GoodsInfo;
