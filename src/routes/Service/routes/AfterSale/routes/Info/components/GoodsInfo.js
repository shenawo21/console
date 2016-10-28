import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import Form from 'components/Form';
import { Button } from 'hen';
import DataTable from 'components/DataTable'
import {UploadImage} from 'components/FileLoader'
import showBigPic from 'components/BigPic'
import RefundView from 'routes/Service/routes/RefundView';

class GoodsInfo extends Component {
    constructor(props) {
        super(props);        
        this.state = {
            sellerName:'',
            sellerPost:'',
            sellerPhone:'',
            fullAddress:'',
            photoList : []
        }
    }     
    _getFormItems(){
        let context = this;
        const {isDel,addressList,addressLlist,result,photoList, photoImg,defaultAddress} = context.props;
        let addressObj = defaultAddress && defaultAddress[0]
        let detailAddress = addressObj && (addressObj.receiverState + addressObj.receiverCity + addressObj.receiverDistrict + addressObj.receiverAddress)
        let name = result && result.shop ? result.shop.name : ''
        let upConfig = {
            listType: 'picture',
            showUploadList: true,
            onlyFile: true
        }
        let config = {
            formItems: [{
                label: "商品价值承担：",
                name: "valueBearType",
                wrapperCol: { span: 8 },
                // rules: [{
                //     validator(rule, value, callback) {
                //         if (!value) {
                //             callback(new Error('请选择商品价值承担'));
                //         } else {
                //             callback();
                //         }
                //     }
                // }],
                radio: {
                        radioValue: [
                            { value: name, title: name },
                            { value: "买家", title: '买家' },
                            { value: "快递公司", title: '快递公司' },
                            { value: "服务商", title: '服务商' }
                        ],
                    }
            },{
                label: "邮费承担：",
                name: "postBearType",
                wrapperCol:{span:8},
                //  rules: [{
                //     validator(rule, value, callback) {
                //         if (!value) {
                //             callback(new Error('请选择邮费承担'));
                //         } else {
                //             callback();
                //         }
                //     }
                // }],
                radio: {
                        radioValue: [
                            { value: name, title: name },
                            { value: "买家", title: '买家' },
                            { value: "快递公司", title: '快递公司' },
                            { value: "服务商", title: '服务商' }
                        ],
                    }
            },{
                label: "退货地址：",
                name: "shortName",
                // rules: [{
                //     validator(rule, value, callback) {
                //         if (!value) {
                //             callback(new Error('请选择退货地址'));
                //         } else {
                //             callback();
                //         }
                //     }
                // }],
                select: {
                    placeholder:'请选择退货地址',
                    optionValue: addressList,
                    onSelect(value, option) { 
                        let curItem = addressLlist && addressLlist.filter(function (item, index) {
                            return item.id == value
                        })
                        context.setState({
                            sellerName:curItem[0].name,
                            sellerPost:curItem[0].postCode ? curItem[0].postCode : '',
                            sellerPhone:curItem[0].phone,
                            fullAddress:curItem[0].receiverState + curItem[0].receiverCity + curItem[0].receiverDistrict + curItem[0].receiverAddress,
                        })
                    }
                }
            },{
                label: "卖家姓名：",
                name: "sellerName",
                input: {
                    disabled: true,
                    value:context.state.sellerName || addressObj && addressObj.name
                }
            },,{
                label: "详细地址：",
                name: "fullAddress",
                input: {
                    disabled: true,
                    value:context.state.fullAddress || detailAddress 
                }
            },{
                label: "邮编：",
                name: "sellerPost",
                input: {
                    disabled: true,
                     value:context.state.sellerPost || addressObj && addressObj.postCode
                }
            },{
                label: "座机号：",
                name: "sellerTel",
                input: {
                    disabled: true,
                }
            },{
                label: "手机号：",
                name: "sellerPhone",
                input: {
                    disabled: true,
                    value:context.state.sellerPhone || addressObj && addressObj.phone
                }
            },{
                label: "卖家留言：",
                name: "sellerRemark",
                required: true,
                rules: [{
                    validator(rule, value, callback) {
                        if (!value) {
                            callback(new Error('请输入卖家留言！'));
                        } else {
                            callback();
                        }
                    }
                }],
                input: {
                    rows: '5',
                    type: "textarea",
                    placeholder: "请输入留言内容",
                }
            }],
            initValue: {
                valueBearType : null,
                postBearType: null,
                shortName:null || addressObj && addressObj.shortName,
                fullAddress :null,
                sellerName:null,
                sellerPost:null,
                sellerTel:null,
                sellerPhone:null,
                sellerRemark:null
            }
        }
        if (isDel == true) {
            const obj = {
                label: "拒绝退货凭证：",
                name: "cwRefuseProof",
                required: true,
                custom(getCustomFieldProps) {
                    upConfig.fileList = photoList;
                    return <UploadImage title="拒绝退货凭证" className='upload-list-inline upload-fixed'
                            upConfig={{...upConfig, onChangeFileList:photoImg}}
                            {...getCustomFieldProps('cwRefuseProof')} /> 
                    
                }
             }
             config.formItems.push(obj) 
        }
        return config;
    }
    showBig (item) {
        showBigPic({imgSrc:item})
    }
    render() {
        const {result, addressLlist, handleGoodSubmit} = this.props;
        const refundComment = result.refundComment || {}
        const url = refundComment.picUrls
        const src = url && url.split(',')
        const ArryStatus = [
            {name:'申请退款金额:',status:result.totalFee || ''},
            {name:'退款原因:',status:result.reason || ''},
            {name:'退货说明:',status:refundComment.content || ''},
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
                <RefundView title = '客户退货申请详情' result = {result} ArryStatus = {ArryStatus} src = {src} showBig = {this.showBig.bind(this)} />

                <h3 className = 'titleName'>退货申请处理</h3>
                { ((result.processStatus == 'PROCESS' || result.processStatus == 'DENY' || result.processStatus == 'SUCCESS') && result.feedbackStatus !== null) ? 
                <ul className = 'form-talbe'>
                    {result.valueBearType ? <li><b>商品价值承担:</b><span>{result.valueBearType}</span></li> : '' }
                    {result.postBearType ? <li><b>邮费承担:</b><span>{result.postBearType}</span></li> : '' }
                    {result.fullAddress ? <li><b>详细地址:</b><span>{result.fullAddress}</span></li> : '' }
                    {result.sellerName ? <li><b>卖家姓名:</b><span>{result.sellerName}</span></li> : '' }
                    {result.sellerTel ? <li><b>卖家座机号:</b><span>{result.sellerTel}</span></li> : '' }
                    {result.sellerPhone ? <li><b>卖家手机号:</b><span>{result.sellerPhone}</span></li> : '' }
                    {result.sellerRemark ? <li><b>卖家留言:</b><span>{result.sellerRemark}</span></li> : '' }
                    <li><b>&nbsp;</b><Button type="ghost" onClick = {(() => history.go(-1))}>返回</Button></li>
                </ul> : 
                <Form horizontal items={this._getFormItems()} onSubmit={handleGoodSubmit}  buttonOption={buttonOption} />}
            </div>
        )
    }
}

GoodsInfo.propTypes = {       
    loading : React.PropTypes.bool
}

export default GoodsInfo;
