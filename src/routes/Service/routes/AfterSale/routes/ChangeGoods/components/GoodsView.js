import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import Form from 'components/Form';
import { Button,InputNumber,DatePicker,Modal,message} from 'hen';
import DataTable from 'components/DataTable'
import SearchSpu from "./SearchSpu"
import {UploadImage} from 'components/FileLoader'

const RESON = [
            {value:'R01-商品质量问题',title:'R01-商品质量问题'},
            {value:'R02-快递公司丢失',title:'R02-快递公司丢失'},
            {value:'R03-运输中商品损坏',title:'R03-运输中商品损坏'},
            {value:'R04-发货错误',title:'R04-发货错误'},
            {value:'R05-签收后坏货',title:'R05-签收后坏货'},
            {value:'R06-服务提供商问题',title:'R06-服务提供商问题'}

        ]     
class InfoView extends Component {
    constructor(props){
        super(props);

        this.showModal = this.showModal.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.onChange = this.onChange.bind(this);
        // this.changeSpecValue = this.changeSpecValue.bind(this)
        // this.setInputValue = this.setInputValue.bind(this);
        this.state = {
            visible : false,    //对话框是否显示
            selectItem : null,  //搜索选中元素
            numValue: '',       //退货数量
            // specDataList: [],   //选中的规格及值
            // rowList: [],         //sku列表
            // totalStock : 0,     //库存
            // salePrice : 0,      //
            // submitFlag : ''     //提交数据时,skuList价格或库存是否为空
        }
    }
     _getColumns(){
        const context = this;
        const {selectItem} = this.state
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
                            <InputNumber min={1} max={10}  onChange = {context.onChange} />
                        </div>
            }
        },{
            key: '7',
            title: '换后商品编码',
            dataIndex: 'changeSkuCode',
            render(changeSkuCode) {
                return <div>
                            {selectItem ?  <span>{context.state.selectItem.spuId}<a style = {{paddingLeft:10}} onClick = {context.showModal}>重新选择</a></span> : 
                                           <a onClick = {context.showModal}>点击选择</a> }
                           
                        </div>
            }
        }];
        
        return columns;
    }   
    _getFormItems(){
        let context = this;
        const {logisticList} = context.props
        let config = {
            formItems: [{
                label: "换货原因：",
                name: "reason",
                rules: [{
                    validator(rule, value, callback) {
                        if (!value) {
                            callback(new Error('请选择换货原因'));
                        } else {
                            callback();
                        }
                    }
                }],
                select: {
                    placeholder:'请输入换货原因',
                    optionValue: RESON
                }
            },{
                label: "备注信息：",
                name: "description",
                rules: [{
                    validator(rule, value, callback) {
                        if (!value) {
                            callback(new Error('请输入备注信息'));
                        } else {
                            callback();
                        }
                    }
                }],
                input: {
                    rows: '5',
                    type: "textarea",
                    placeholder: "请输入备注信息",
                }
            },{
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
                label:'换货运单号：',
                name:'sid',
                rules: [{
                    validator(rule, value, callback) {
                        if (!value) {
                            callback(new Error('请输入换货运单号'));
                        } else {
                            callback();
                        }
                    }
                }],
                input:{}
            },{
                label:'快递公司：',
                name:'companyName',
                rules: [{
                    validator(rule, value, callback) {
                        if (!value) {
                            callback(new Error('请选择快递公司'));
                        } else {
                            callback();
                        }
                    }
                }],
                select: {
                    placeholder:'请选择快递公司',
                    optionValue: logisticList
                }
            },{
                label:'包裹投递时间：',
                name:'goodReturnTime',
                rules: [{
                    validator(rule, value, callback) {
                        if (!value) {
                            callback(new Error('请输入包裹投递时间'));
                        } else {
                            callback();
                        }
                    }
                }],
                custom(getCustomFieldProps, FormContext){
                    return <div>
                            <DatePicker format="yyyy-MM-dd HH:mm:ss" {...getCustomFieldProps('goodReturnTime') } showTime={true}/>
                        </div>}
            }],
            initValue: {
                reason : null,
                description: null,
                valueBearType : null,
                postBearType:null,
                sid:null,
                companyName:null,
                goodReturnTime:null
            }
        }


        return config;
    }
    onChange(value) {
        const {arrResult} = this.props
        let {selectItem} = this.state
        if (selectItem && value) {
            if (Number(selectItem.total) < Number(value)) {
                 message.error('库存不足，请重新输入！')
            } else {
                if(Number(selectItem.marketPrice) * Number(value) > Number(arrResult[0].totalFee)) {
                    message.error('换后商品总价值大于原来商品总价值，请重新选择！')
                } else {
                    this.setState({numValue:value})
                } 
            }
        } else if (!selectItem ) {
            this.setState({numValue:value})
        }

    }
    showModal() {
        const {tableOptions} = this.props;
        const {action, pagination} = tableOptions
        this.setState({
            visible: true
        });
        action({pageNumber : pagination.current})
    }
    handleOk() {
        const searchSpuState = this.refs.searchList
        const {arrResult} = this.props
        let {numValue} = this.state
        let selectItem = null;
        if(searchSpuState.state){
            selectItem = searchSpuState.state.items
        }
        if (selectItem && numValue) {
            if (Number(selectItem.total) < Number(numValue)) {
                 message.error('库存不足，请重新选择！')
            } else {
                if(Number(selectItem.marketPrice) * Number(numValue) > arrResult[0].totalFee) {
                    message.error('换后商品总价值大于原来商品总价值，请重新选择！')
                } else {
                    this.setState({
                        selectItem,
                        visible: false
                    })
                } 
            }
        } else if (!numValue ) {
            this.setState({
                selectItem,
                visible: false
            })
        }

    }
    handleCancel(e) {
        this.setState({
            visible: false
        });
    }
    render() {
        const {arrResult,tableOptions,handleSubmit} = this.props;
        let { selectItem } = this.state;
        const buttonOption = {
            buttons : [
                {
                    key : 'review',
                    name :'确认无误，通知仓库退货入库',
                    type : 'primary',
                },
                // {
                //     key : 'refuse',
                //     name : '重置',
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
                <DataTable ref='theTable' columns={this._getColumns() } dataSource={arrResult} ></DataTable>
                <Modal visible={this.state.visible}
                    closable={false}
                    width={1020}
                    onOk={this.handleOk} onCancel={this.handleCancel}>
                    <SearchSpu tableOptions={tableOptions} selectItem={selectItem} ref='searchList' ></SearchSpu>
                </Modal>
                <br /><br />    
                <Form horizontal items={this._getFormItems()} onSubmit={handleSubmit}  buttonOption={buttonOption} ref='form' />
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
