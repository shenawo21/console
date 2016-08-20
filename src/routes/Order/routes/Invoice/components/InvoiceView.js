import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

import DataTable from 'components/DataTable';


import Search from 'components/Search';


import {Row, Col, Button, Icon} from 'hen';

class Invoice extends Component {
    
    _getFormItems(){
        let config = {
            formItems: [{
                label: "标题名1",
                name: "name1",
                input: {}
            },{
                label: "标题名2",
                name: "name2",
                select: {}
            }],
            initValue: {
                name1: null,
                name2 : null
            }
        }
        return config;
    }
    
    
    _getColumns(){
        const context = this;
        let columns = [{
            key: '0',
            title: '标题',
            dataIndex: '字段0'
        }, {
            key: '1',
            title: '标题1',
            dataIndex: '字段1'
        }, {
            key: '2',
            title: '标题2',
            dataIndex: '字段2'
        }, {
            key: '3',
            title: '标题3',
            dataIndex: '字段3'
        }, {
            key: '4',
            title: '标题4',
            dataIndex: '字段4'
        }, {
            key: '5',
            title: '标题5',
            dataIndex: '字段5'
        },{
            title: '操作',
            dataIndex: '字段6',
            render(id,row){
                return <span><Link to='#'>跳转</Link></span>
            }
        }];
        return columns;
    }
    
    
        quickButton(quickOptions){
            return <Row>
                    <Col span='2'>
                        <Button onClick={quickOptions.doUp} ><Icon type="" />快捷按钮</Button>
                    </Col>
            </Row>
        }
    
    render() {
        const {formOptions,quickOptions, ...other} = this.props;
        
        return (
            <div>
            
                <Search  items={this._getFormItems()} onSubmit={formOptions.handleSubmit} onReset={formOptions.handleReset} />
            
            
                <DataTable bordered={true} columns={this._getColumns()} quickButton={this.quickButton(quickOptions)} {...other} />
            
            </div>
        )
    }
}


Invoice.propTypes = {
    
    dataSource : React.PropTypes.array.isRequired,
    action : React.PropTypes.func.isRequired,
    
    loading : React.PropTypes.bool,
    params : React.PropTypes.object
}


export default Invoice;
