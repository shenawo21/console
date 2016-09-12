import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import DataTable from 'components/DataTable';
import Search from 'components/Search';
import {Row, Col, Button, Icon, Popconfirm, DatePicker,Table,Modal} from 'hen';
import Form from 'components/Form';

class Change extends Component {
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

    _getColumns(){
        const context = this;
        let columns = [{
            key: '0',
            title: '订单编号',
            dataIndex: 'tid'
        }, {
            key: '1',
            title: '成交时间',
            dataIndex: 'modified'
        }, {
            key: '2',
            title: '买家账号',
            dataIndex: 'buyerNick'
        }, {
            key: '3',
            title: '店铺名称',
            dataIndex: 'shopName'
        },{
            key: '5',
            title: '操作',
            dataIndex: 'tid',
            render(id, row) {
                return <span><Link to="/order/audit/detail/1">订单详情</Link></span>
            }
        }];
        
        return columns;
    }

    _getSubColumns() {
        const context = this;
        let columns = [{
            key: '0',
            title: '商品编码',
            dataIndex: 'outerSkuId'
        }, {
            key: '1',
            title: '产品名称',
            dataIndex: 'title'
        }, {
            key: '2',
            title: '原价格',
            dataIndex: 'price'
        }, {
            key: '3',
            title: '数量',
            dataIndex: 'num'
        }, {
            key: '4',
            title: '商品总价值',
            render(id,row) {
                return row.price * row.num
            }
        },{
            key: '5',
            title: '操作',
            render(id,row) {
                console.log(row,'row====')
                return  <div><Link to={`/service/aftersale/change/${row.oid}/${row.buyerNick}`}>换货登记</Link></div>               
            }
        }];
        
        return columns;
    }    
      

    render() {
        const {formOptions,tabelData,visible,handleOk} = this.props;
         tabelData && tabelData.forEach((val, index)=>{
            val.key = index
            val.tradesOrderList && val.tradesOrderList.forEach((value, index) => {
                value.key = index;
                value.buyerNick = val.buyerNick;
            })
        })
        console.log(tabelData,'tabelData');
        return (
            <div>
                <Row>
                    <Col span = '22'>
                    </Col>
                    <Col ><Button type="primary" style = {{marginBottom:10}} onClick = {(e) =>{formOptions.search(this.refs.form)}}>查询订单</Button></Col>
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
               <DataTable _uKey='tid' bordered={true} columns={this._getColumns()} 
                           expandedRowRender={record => <Table size="small" bordered={true}  columns={this._getSubColumns()} dataSource={record.tradesOrderList} pagination={false} />} 
                           dataSource={tabelData} />

            </div>
        )
    }
}

export default Change;
