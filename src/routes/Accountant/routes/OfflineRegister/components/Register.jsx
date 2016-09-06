import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import Form from 'components/Form';

import {DatePicker} from 'hen';

//登记类型
const TYPE = [
   { value: '商品退款', title: "商品退款" },
   { value: '邮费补偿', title: "邮费补偿" }
];

class ForCheck extends Component {

    _getFormItems(){
        let config = {
            formItems: [{
                label: "登记类型：",
                name: "type",
                required: true,
                rules: [{ required: true, message: '请选择登记类型' }],
                select: {
                    optionValue: TYPE,
                    placeholder: "请选择登记类型"
                }
            },{
                label: "转出金额：",
                name: "outFee",
                required: true,
                rules: [{ required: true, message: '请输入转出金额' }],
                input: {
                    placeholder: "请输入转出金额"
                }
            },{
                label: "转出时间：",
                name: "outTimeTemp",
                rules: [
                    { required: true, type: 'date', message: '请选择转出时间' },
                    {
                        validator(rule, value, callback) {
                            console.log(rule, new Date(value).getTime(), callback);
                            callback();
                        }
                    }
                ],
                datepicker: {
                    disabled : false,
                    format: "yyyy-MM-dd HH:mm:ss",
                    showTime: true
                }
            },{
                label: "订单编号：",
                name: "orderId",
                rules: [{ required: true, message: '请输入订单编号' }],
                input: {
                    placeholder: "请输入订单编号",
                }
            }, {
                label: "商品编码：",
                name: "spuCode",
                rules: [{ required: true, message: '请输入商品编码' }],
                input: {
                    placeholder: "请输入商品编码",
                }
            }, {
                label: "产品名称：",
                name: "spuName",
                rules: [{ required: true, message: '请输入产品名称' }],
                input: {
                    placeholder: "请输入产品名称",
                }
            }, {
                label: "买家账号：",
                name: "buyerAccount",
                rules: [{ required: true, message: '请输入买家账号' }],
                input: {
                    placeholder: "请输入买家账号",
                }
            }],
            initValue: {
                type : null,
                outFee: null,
                outTime : null,
                orderId : null,
                spuCode : null,
                spuName : null,
                buyerAccount : null
            }
        }
        return config;
    }
    render() {
        const {formOptions} = this.props;

        return (
            <div>
                <Form horizontal items={this._getFormItems()} onSubmit={formOptions.handleSubmit}
                    onRest={formOptions.handleReset} />
            </div>
        )
    }
}


ForCheck.propTypes = {

    // dataSource : React.PropTypes.array.isRequired,
    // action : React.PropTypes.func.isRequired,

    // loading : React.PropTypes.bool,
    // params : React.PropTypes.object
}


export default ForCheck;
