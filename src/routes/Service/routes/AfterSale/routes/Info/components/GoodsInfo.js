import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import Form from 'components/Form';
import { Button } from 'hen';
import DataTable from 'components/DataTable'
import {UploadImage} from 'components/FileLoader'
import RefundView from 'routes/Service/routes/RefundView';

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
    _getFormItems(){
        let context = this;
        const {isDel,addressList,items} = context.props;
        let config = {
            formItems: [{
                label: "商品价值承担：",
                name: "valueBearType",
                rules: [{
                    validator(rule, value, callback) {
                        if (!value) {
                            callback(new Error('请选择商品价值承担'));
                        } else {
                            callback();
                        }
                    }
                }],
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
                 rules: [{
                    validator(rule, value, callback) {
                        if (!value) {
                            callback(new Error('请选择邮费承担'));
                        } else {
                            callback();
                        }
                    }
                }],
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
                name: "shortName",
                rules: [{
                    validator(rule, value, callback) {
                        if (!value) {
                            callback(new Error('请选择退货地址'));
                        } else {
                            callback();
                        }
                    }
                }],
                select: {
                    placeholder:'请选择退货地址',
                    optionValue: addressList,
                    onSelect(value, option) { 
                        let curItem = items && items.filter(function (item, index) {
                            return item.id == value
                        })
                        context.setState({
                            sellerName:curItem[0].name,
                            sellerPost:curItem[0].postCode ? curItem[0].postCode : '',
                            sellerPhone:curItem[0].phone,
                            fullAddress:curItem[0].receiverState + curItem[0].receiverCity + curItem[0].receiverDistrict ,
                        })
                    }
                }
            },{
                label: "卖家姓名：",
                name: "sellerName",
                // rules: [{
                //     validator(rule, value, callback) {
                //         if (!value) {
                //             callback(new Error('请输入卖家姓名'));
                //         } else {
                //             callback();
                //         }
                //     }
                // }],
                input: {
                    value:context.state.sellerName || ''
                }
            },,{
                label: "详细地址：",
                name: "fullAddress",
                // rules: [{
                //     validator(rule, value, callback) {
                //         if (!value) {
                //             callback(new Error('请输入详细地址'));
                //         } else {
                //             callback();
                //         }
                //     }
                // }],
                input: {
                    value:context.state.fullAddress || ''
                }
            },{
                label: "邮编：",
                name: "sellerPost",
                input: {
                     value:context.state.sellerPost || ''
                }
            },{
                label: "座机号：",
                name: "sellerTel",
                input: {

                }
            },{
                label: "手机号：",
                name: "sellerPhone",
                // rules: [{
                //     validator(rule, value, callback) {
                //         if (!value) {
                //             callback(new Error('请输入手机号'));
                //         } else {
                //             callback();
                //         }
                //     }
                // }],
                input: {
                    value:context.state.sellerPhone || ''
                }
            },{
                label: "卖家留言：",
                name: "sellerRemark",
                input: {
                    rows: '5',
                    type: "textarea",
                    placeholder: "请输入留言内容",
                }
            }],
            initValue: {
                valueBearType : null,
                postBearType: null,
                shortName:null,
                fullAddress :null,
                sellerName:null,
                sellerPost:null,
                sellerTel:null,
                sellerPhone:null,
                sellerRemark:null
            }
        }
        if (isDel == true) {
             config.formItems.splice(1, 7);
        }
        return config;
    }
    
    render() {
        const {result, items, handleGoodSubmit} = this.props;
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
                { (result.processStatus == 'PROCESS' || result.processStatus == 'DENY') ? 
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
