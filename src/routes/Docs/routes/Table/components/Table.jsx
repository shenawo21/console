import React, {Component, PropTypes} from 'react';
import DataTable from 'components/DataTable';
import {Link} from 'react-router';

class Table extends Component {

    _getColumns(){
        const context = this;
        let columns = [{
            key: '0',
            title: '缩略图',
            dataIndex: 'image_group'
        }, {
            key: '1',
            title: '商品名称',
			width:200,
            dataIndex: 'name'
        }, {
            key: '2',
            title: '展示名称',
			width:200,
            dataIndex: 'display_name'
        }, {
            key: '3',
            title: '品牌',
            dataIndex: 'brand_name'
        }, {
            key: '4',
            title: '商品分类',
            dataIndex: 'category_name'
        }, {
            key: '5',
            title: 'SPU',
            dataIndex: 'spu_id'
        }, {
            key: '6',
            title: '所属渠道',
            dataIndex: 'channel_name'
        },{
            key: '7',
            title: '企业信息',
            dataIndex: 'e_short_name'
        }, {
            key: '8',
            title: '库存单位',
            dataIndex: 'stock_unit'
        }, {
            key: '9',
            title: '是否可用',
            dataIndex: 'status',
            render(status){
                return status ? <span>是</span> : <span>否</span>
            }
        },{
            dataIndex: 'spu_id',
            render(id,row){
                
                return <span><Link to='docs'>docs</Link></span>
            }
        }];
        return columns;
    }

    render() {
        const {total, ...other} = this.props;
        const pagination = {
            total,
            showQuickJumper : true
        }
        
        return (
            <div>
                <h1>131313133</h1>
                <DataTable bordered={true} pagination={pagination} params={{channelId : 0}} {...other} columns={this._getColumns()} />
            </div>
        )
    }
}


Table.propTypes = {
    
}

export default Table;