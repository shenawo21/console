import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

import DataTable from 'components/DataTable';
import {Row, Col, Button} from 'hen';

class Logistics extends Component {
    
    _getColumns(){
        const context = this;
        let columns = [{
            key: '0',
            title: '物流公司',
            dataIndex: ''
        }, {
            key: '1',
            title: '联系人',
            dataIndex: ''
        }, {
            key: '2',
            title: '联系方式',
            dataIndex: ''
        }, {
            key: '3',
            title: '备注',
            dataIndex: ''
        },{ 
            key: '4',
            title: '操作',
            dataIndex: '',
            render(id,row){
                return <span><Link to={`/logistics/edit/${id}`}>编辑</Link> 
                    <Popconfirm title="确定要删除这个地址吗？" onConfirm={context.deletedAccount.bind(context,id)}>
                        <Button type="link">删除</Button>
                    </Popconfirm>
                </span>
            }
        }];
        return columns;
    }
    
    delLogistics(id){

    }


    quickButton(quickOptions){
        return <Row>
                <Col span='2'>
                    <Button><Link to={`/logistics/edit`}>添加物流公司</Link></Button>
                </Col>
        </Row>
    }

    render() {
        const {quickOptions, tableOptions} = this.props;
        
        return (
            <div>
                <DataTable bordered={true} columns={this._getColumns()} quickButton={this.quickButton(quickOptions)} {...tableOptions} />
            </div>
        )
    }
}


Logistics.propTypes = {
    dataSource : React.PropTypes.array.isRequired,
    loading : React.PropTypes.bool
}


export default Logistics;
