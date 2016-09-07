import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import { Button, Modal, Icon, Popconfirm, Row, Col} from 'hen';
import Form from 'components/Form';
import DataTable from 'components/DataTable';
import Search from 'components/Search';
class Usermanage extends Component {
    constructor(props) {
        super(props)
        this.onDels = this.onDels.bind(this);
    }


    _getFormIModal(){

        let context = this;
        const {shopListItem,addresslist,addressItem} = context.props;
        let config = {
            formItems: [ {
                label: "选择店铺：",
                name: "shopId",
                wrapperCol: { span: 10 },
                labelCol: { span: 5},
                rules: [{
                    validator(rule, value, callback) {
                        if (!value) {
                            callback(new Error('请选择店铺'));
                        } else {
                            callback();
                        }
                    }
                }],
                select: {
                    placeholder: "请选择店铺",
                    optionValue: shopListItem
                }
               },{
                label: "退货地址：",
                name: "address",
                wrapperCol: { span: 10 },
                labelCol: { span: 5},
                rules: [{
                    validator(rule, value, callback) {
                        if (!value) {
                            callback(new Error('请选择退货地址'));
                        } else {
                            callback();
                        }
                    }
                }],
                cascader: {
                    options: addresslist,
                    placeholder: "请输入退货地址",
                    changeOnSelect: false,
                }
            },{
                label: "详细地址：",
                name: "receiverAddress",
                wrapperCol: { span: 10 },
                labelCol: { span: 5},
                rules: [{
                    validator(rule, value, callback) {
                        if (!value) {
                            callback(new Error('请输入详细地址'));
                        } else {
                            callback();
                        }
                    }
                }],
                input: {
                    placeholder: "请输入详细地址",
                }
            },{
                label: "联系人：",
                name: "name",
                wrapperCol: { span: 10 },
                labelCol: { span: 5},
                rules: [{
                    validator(rule, value, callback) {
                        if (!value) {
                            callback(new Error('请输入联系人'));
                        } else {
                            callback();
                        }
                    }
                }],
                input: {
                    placeholder: "请输入联系人"
                }
            },{
                label: "联系电话：",
                name: "phone",
                wrapperCol: { span: 10 },
                labelCol: { span: 5},
                rules: [{
                    validator(rule, value, callback) {
                        if (!value) {
                            callback(new Error('请输入联系电话'));
                        } else {
                            if (!/^1[34578][0-9]\d{8}$/g.test(value)) {
                                    callback('请输入正确的手机号码');
                            } else {
                                callback();
                            }
                        }
                    }
                }],
                input: {
                    placeholder: "请输入联系电话"
                }
            },{
                label: "邮编：",
                name: "postCode",
                wrapperCol: { span: 10 },
                labelCol: { span: 5},
                input: {
                }
            },{
                label: "设为默认：",
                name: "defaults",
                wrapperCol: { span: 10 },
                labelCol: { span: 5},
                checkbox: { }
            }],
            initValue: {
                shopId : null,
                address:null,
                receiverAddress: null,
                name : null,
                phone: null,
                postCode : null,
                defaults: null,
            }
        }
        if (addressItem && addressItem.id) {
            let address = []
            address[0] = addressItem.receiverState
            address[1] = addressItem.receiverCity ? addressItem.receiverCity : ''
            address[2] = addressItem.receiverDistrict ? addressItem.receiverDistrict : ' '
            
            const newitem = {...addressItem, address}
            if (newitem) {
                for (let i in config.initValue) {
                    const targetValue = newitem[i];
                    config.initValue[i] = targetValue;
                }              
            }
        }   
        // const { getFieldProps } = this.props.form;

        return config;
        
    }

    _getFormItems() {
        let context = this;
        const {shopListItem} = context.props;
        let config = {
            formItems: [
               {
                label: "店铺名称：",
                name: "shopId",
                select: {
                    optionValue: shopListItem
                }
               }],
            initValue: {
                shopId: ''
            }
        }

        return config;
    }

    _getColumns() {
        const context = this;
        let columns = [
            {
                key: 'receiverAddress',
                title: '退货地址',
                dataIndex: 'receiverAddress'
            },
            {
                key: 'shopName',
                title: '所属店铺',
                dataIndex: 'shopName'
            },
            {
                key: 'name',
                title: '联系人',
                dataIndex: 'name'
            },
            {
                key: 'phone',
                title: '电话',
                dataIndex: 'phone'
            },
            {
                key: 'postCode',
                title: '邮编',
                dataIndex: 'postCode'
            },
            {
                key: 'defaults',
                title: '是否为默认地址',
                dataIndex: 'defaults',
                render(type) {
                    switch(type) {
                        case true:
                            return '是'
                        case false:
                            return '否'    
                    }
                }
            },
            {
                title: '操作',
                render(id, row) {
                    const dels = () => {
                        context.onDels(row.id);
                    }
                    const handEdit = () => {
                        context.onhandEdit(row.id);
                    }
                     const isdefaults = () => {
                        context.ondefaults(row.id);
                    }
                    return <span>
                        <a onClick={handEdit}>编辑</a>&nbsp; &nbsp; |&nbsp; &nbsp;
                        <Popconfirm title="确定要删除此条地址信息？" onConfirm={dels} >
                            <a href="javascript:;">删除</a>
                        </Popconfirm>&nbsp; &nbsp; |&nbsp; &nbsp;
                        {row.defaults == true ? <span>设为默认</span> :  
                            <Popconfirm title="确定要设为默认地址？" onConfirm={isdefaults} >
                                <a href="javascript:;">设为默认</a>
                            </Popconfirm>}
                        </span>
                }
            }];
        return columns;
        
    }
    onDels(id) {
        let {selectedRowId, handleDels} = this.props;
        const context = this;    
        if (typeof id != 'undefined') {
            selectedRowId = [id];
        }
        handleDels({ ids: selectedRowId }, function () {
            context.refs.theTable.refresh();  //刷新数据
        })
    }
    onhandEdit(id) {
        const {Edit} = this.props;
        Edit(id);
    }
    ondefaults(id,refresh) {
        const {setDefault} = this.props;
        setDefault(id, this.refs.theTable.refresh);
    }
    
    render() {
        const {selectedRowKeys,formOptions, onSelectChange,...other, dataSource, loading,handleOk,visible} = this.props;
        const context = this;
        const rowSelection = {
            selectedRowKeys,
            onChange: onSelectChange
        };
        const hasSelected = selectedRowKeys.length > 0;
        
        return <div>
            <Row>
                 <Col span='20'><Search onSubmit={formOptions.handleSubmit}  items={this._getFormItems() } /></Col>
                 <Col><Button onClick={(e)=>{
                     formOptions.showModal(this.refs.form)
                 }} type="primary" style = {{ marginBottom: 15, marginRight:10, float:'right' }}><Icon type="plus-circle"/>添加地址</Button></Col>
            </Row>    
            <Modal title="添加退货地址"
                visible={visible}
                onOk={()=>{
                       this.refs.form && this.refs.form.validateFields((errors, values) => {
                        if (!!errors) {
                            console.log('Errors in form!!!');
                            return;
                        }
                        handleOk(values,this.refs.form);
                    });
                }}
                onCancel={formOptions.handleCancel} >
                <Form horizontal items={this._getFormIModal()} button={<span></span>} ref='form' />
            </Modal>
            <DataTable {...other} ref='theTable' columns={this._getColumns() } rowSelection={rowSelection} ></DataTable>
            <Popconfirm  title="确定要删除此条地址信息？" onConfirm={this.onDels} >
                <Button type="primary" disabled = {!hasSelected} loading={loading} style={{ marginTop:-80 }}>删除</Button>
            </Popconfirm>
       
        </div>
    }
}

export default Usermanage