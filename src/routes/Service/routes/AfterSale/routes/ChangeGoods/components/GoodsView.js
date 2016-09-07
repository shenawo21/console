import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import Form from 'components/Form';
import { Button,InputNumber,DatePicker } from 'hen';
import DataTable from 'components/DataTable'
import {UploadImage} from 'components/FileLoader'

const RESON = [
            {value:'已发货，买家未举证',title:'已发货，买家未举证'},
            {value:'买家恶意申请退款',title:'买家恶意申请退款'}
        ]
 const COMPANY = [
            {value:'已发货，买家未举证',title:'已发货，买家未举证'},
            {value:'买家恶意申请退款',title:'买家恶意申请退款'}
        ]       
class InfoView extends Component {
     _getColumns(){
        const context = this;
        let columns = [{
            key: '0',
            title: '商品编码',
            dataIndex: 'outerId'
        }, {
            key: '1',
            title: '商品名称',
            dataIndex: 'title'
        }, {
            key: '2',
            title: '原价格',
            dataIndex: 'price'
        }, {
            key: '3',
            title: '数量',
            dataIndex: 'goodsNum'
        },{
            key: '4',
            title: '商品总价值',
            dataIndex: 'totalFee'
        },{
            key: '5',
            title: '优惠金额',
            dataIndex: 'discountFee'
        },{
            key: '6',
            title: '退货数量',
            dataIndex: 'refundNums',
            render(refundNums){
                return <div>
                            <InputNumber min={1} max={10} defaultValue={3}  />
                        </div>
            }
        },{
            key: '7',
            title: '换后商品编码',
            dataIndex: 'changeSkuCode',
            render(changeSkuCode) {
                return <div>
                            <a>点击选择</a>
                        </div>
            }
        }];
        
        return columns;
    }   
    _getFormItems(){
        let context = this;
        let config = {
            formItems: [{
                label: "换货原因：",
                name: "refundReason",
                select: {
                    placeholder:'请输入换货原因',
                    optionValue: RESON
                }
            },{
                label: "备注信息：",
                name: "sellerRemark",
                input: {
                    rows: '5',
                    type: "textarea",
                    placeholder: "请输入备注信息",
                }
            },{
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
                label:'包裹面单号：',
                name:'refundReason',
                input:{}
            },{
                label:'快递公司：',
                name:'logisticsCompany',
                select: {
                    placeholder:'请选择快递公司',
                    optionValue: COMPANY
                }
            },{
                label:'包裹投递时间：',
                name:'sendTime',
                custom(getCustomFieldProps, FormContext){
                    return <div>
                            <DatePicker format="yyyy-MM-dd HH:mm:ss" {...getCustomFieldProps('sendTime') } showTime={true}/>
                        </div>}
            }],
            initValue: {
                cwRefuseReason : null,
                optRemark: null,
                businessLicense : null
            }
        }


        return config;
    }
    
    render() {
        const {result, handleSubmit} = this.props;
        const dataSource = [
            {
                outerId: '1',
                title: 'yyy',
                price: '22',
                goodsNum: '西湖区湖底公园1号',
                totalFee:'hh',
                discountFee:'cc',
                tGoodsNum:'aa',
                refundFee:'e'
                }
             ]
        const buttonOption = {
            buttons : [
                {
                    key : 'review',
                    name :'确认无误，通知仓库退货入库',
                    type : 'primary',
                },
                {
                    key : 'refuse',
                    name : '重置',
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
                <DataTable ref='theTable' columns={this._getColumns() } dataSource={dataSource} ></DataTable>
                <br /><br />    
                <Form horizontal items={this._getFormItems()} onSubmit={handleSubmit}  buttonOption={buttonOption} />
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
                </ul> : 
                <Form horizontal items={this._getFormItems()} onSubmit={handleSubmit}  buttonOption={buttonOption} />} */}
            </div>
        )
    }
}

InfoView.propTypes = {       
    loading : React.PropTypes.bool
}

export default InfoView;
