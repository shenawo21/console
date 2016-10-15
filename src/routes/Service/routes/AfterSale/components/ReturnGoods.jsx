import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import DataTable from 'components/DataTable';
import Search from 'components/Search';
import {Row, Col, Button, Icon, Popconfirm, DatePicker,Table,Modal} from 'hen';
import Form from 'components/Form';

class ReturnGoods extends Component {
    _getFormIModal(){
        let config = {
            formItems: [{
                label: "请输入订单号进行查询：",
                name: "tid",
                wrapperCol: { span: 15 },
                labelCol: { span: 7},
                input: {
                    placeholder: "请输入订单号进行查询",
                }
            }],
            initValue: {
                tid : null,
            }
        }

        return config;
        
    }
    _getFormItems(){
    	let context = this;
        const {shopListItem} = context.props;
        let config = {
            formItems: [{
                label: "订单编号：",
                name: "tid",
                labelCol: {span: 8},
                span:7,
                input: {}
            },{
                label: "买家账号：",
                name: "buyerNick",
                labelCol: {span: 8},
                span:7,
                input: {}
            },{
                label: "店铺名称：",
                name: "shopId",
                labelCol: {span: 8},
                span:7,
                select: {
                    optionValue: shopListItem
                }
            },{
                label: "商品编码：",
                name: "outerSkuId",
                labelCol: {span: 8},
                span:7,
                input: {}
            },{
                label: "产品名称：",
                name: "title",
                labelCol: {span: 6},
                span:9,
                input: {}
            }],
            initValue: {
                tid: null,
                buyerNick: null,
                shopName: null,
                outerSkuId: null,
                title: null,
            }
        }
        return config;
    }

    _getColumns(){
        const context = this;
        let columns = [{
            key: '0',
            title: '订单编号',
            dataIndex: 'tid'
        }, {
            key: '1',
            title: '成交时间',
            dataIndex: 'tradesCreated'
        }, {
            key: '2',
            title: '买家账号',
            dataIndex: 'buyerNick'
        }, {
            key: '3',
            title: '店铺名称',
            dataIndex: 'shopName'
        }, {
            key: '4',
            title: '售后类型',
            dataIndex: 'afterSaleType',
            render(type) {
                switch(type) {
                    case 'REFUND_MONEY':
                        return '退款'
                    case 'REFUND_GOODS':
                        return '退货'
                    case 'CHANGE_GOODS':
                        return '换货'        
                }
            }
        }, {
            key: '5',
            title: '操作',
            dataIndex: 'tid',
            render(id, row) {
                return <span><Link to={`/service/aftersale/goodsdetail/${id}`}>订单详情</Link></span>
            }
        }];
        
        return columns;
    }

    shouldComponentUpdate(nextProps) {
        if (nextProps.params.type == '退款') {
            return false
        }
        return true
    }

    _getSubColumns() {
        const {isAdmin} = this.props;
        const context = this;
        let columns = [{
            key: '1',
            title: '申请发起时间',
            dataIndex: 'created'
        },{
            key: '2',
            title: '商品编码',
            dataIndex: 'outerSkuId'
        }, {
            key: '3',
            title: '产品名称',
            dataIndex: 'title'
        }, {
            key: '4',
            title: '原价格',
            dataIndex: 'price'
        }, {
            key: '5',
            title: '数量',
            dataIndex: 'num'
        }, {
            key: '6',
            title: '商品总价值',
            render(id,row) {
                return row.price * row.num
            }
        }, {
            key: '7',
            title: '退货数量',
            dataIndex: 'tGoodsNum'
        }, {
            key: '8',
            title: '退货金额',
            render(id,row) {
                return row.price * row.tGoodsNum
            }
        },{
            key: '9',
            title: '处理状态',
            dataIndex: 'processStatus',
            render(type){
                switch(type) {
                    case 'INIT':
                        return '待处理'
                    case 'PROCESS':
                        return '处理中'
                   case 'SUCCESS':
                        return '处理成功'
                    case 'FAIL':
                        return '处理失败'          
                }
            }
        },{
            key: '10',
            title: '仓库反馈',
            dataIndex: 'feedbackStatus',
            render(type) {
                switch(type) {
                    case 'ACCEPT':
                        return '允许入库'
                    case 'DENY':
                        return '拒绝入库'    
                }
            }
        },{
            key: '11',
            title: '仓库反馈时间',
            dataIndex: 'feedbackTime'
        }, {
            key: '12',
            title: '操作  /  备注',
            render(id,row) {
                console.log(row,'row')
                const changeOut = () => {
                    context.OnchangeOut(row.tid,row.refundId)
                }              
                if (row.afterSaleType == 'REFUND_GOODS') {
                        if (row.processStatus == 'INIT') {
                            return <div><Link to={`/service/aftersale/applyGoods/${row.refundId}`}>处理申请</Link></div>
                        } 
                         else if (row.processStatus == 'PROCESS' && row.feedbackStatus == 'ACCEPT' && row.refundResult == null ) {
                            return <div>
                                <Link to={`/service/aftersale/endGoods/${row.refundId}`}>通知财务退款</Link>                                    
                            </div>
                        } else if (row.processStatus == 'PROCESS' && row.feedbackStatus == 'ACCEPT' && row.refundResult == 'ACCEPT') {
                            return <div>
                                <Link to={`/service/aftersale/endGoods/${row.refundId}`}>结束退货</Link>                                   
                            </div>
                        } else if (row.processStatus == 'PROCESS' && row.feedbackStatus == 'ACCEPT' && row.refundResult == 'INIT') {
                            return <div>
                               <Link to={`/service/aftersale/applyGoods/${row.refundId}`}>退货详情</Link><em style = {{padding:'0 8px'}}></em> <span>已通知财务退款</span>                                 
                            </div>
                        } else if (row.processStatus == 'PROCESS' && row.feedbackStatus == 'DENY' || row.processStatus == 'PROCESS' && row.feedbackStatus == 'ACCEPT' && row.refundResult == 'DENY') {
                            return <div>
                                <Link to={`/service/aftersale/endGoods/${row.refundId}`}>拒绝退货</Link>                                   
                            </div>
                        } else {
                            return <Link to={`/service/aftersale/applyGoods/${row.refundId}`}>退货详情</Link>
                        }
                    } else if (row.afterSaleType == 'CHANGE_GOODS') {
                         if(row.processStatus == 'PROCESS' && row.feedbackStatus == 'ACCEPT'){
                             return <Popconfirm title="确定要换货出库？" onConfirm={changeOut} >
                                <a href="javascript:;">换货出库</a>
                            </Popconfirm>
                         } else if(row.processStatus == 'PROCESS' && row.feedbackStatus !== null) {
                            return <div><Link to={`/service/aftersale/changedetail/${row.refundId}`}>结束换货</Link></div>
                         } else if(row.processStatus == 'PROCESS' && row.feedbackStatus == null) {
                              return <div>
                                 <Link to={`/service/aftersale/changedetail/${row.refundId}`}>换货详情</Link><em style = {{padding:'0 8px'}}></em> <span>仓库未验收</span>                                 
                            </div>
                         }else {
                            return <div>
                                    <Link to={`/service/aftersale/changedetail/${row.refundId}`}>换货详情</Link>
                                </div>
                        }
                        
                    }
            }
        }];
        
        return columns;
    }    
    OnchangeOut(tid,id) {
        const {getOut} = this.props
        getOut(tid,id)
    }    
    render() {
        const {formOptions,dataSource,...other,visible,handleOk} = this.props;
        dataSource && dataSource.forEach((val, index)=>{
            val.key = index
            val.refundApplyList && val.refundApplyList.forEach((val, index) => {
                val.key = index
            })
        })
        return (
            <div>
                <Row>
                    <Col span = '22'>
                        <Search  items={this._getFormItems()} onSubmit={formOptions.handleSubmit} onReset={formOptions.handleReset} />
                    </Col>
                    <Col ><Button type="primary" style = {{marginTop:20}} onClick = {(e) =>{formOptions.search(this.refs.form)}}>查询订单</Button></Col>
                </Row>
                <Modal title="查询订单"
                visible={visible}
                onOk={()=>{
                       this.refs.form && this.refs.form.validateFields((errors, values) => {
                        if (!!errors) {
                            return;
                        }
                        handleOk(values,this.refs.form);
                    });
                }}
                onCancel={formOptions.handleCancel} >
                <Form horizontal items={this._getFormIModal()} button={<span></span>} ref='form' />
            </Modal>     
               <DataTable _uKey='skuId' bordered={true} columns={this._getColumns()} 
                           expandedRowRender={record => <Table size="small" bordered={true}  columns={this._getSubColumns()} dataSource={record.refundApplyList} pagination={false} />} 
                           dataSource={dataSource} {...other}  />

            </div>
        )
    }
}


ReturnGoods.propTypes = {
    // dataSource : React.PropTypes.array.isRequired,
    // action : React.PropTypes.func.isRequired,
    // loading : React.PropTypes.bool,
    // params : React.PropTypes.object
}


export default ReturnGoods;
