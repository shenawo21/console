import React, {Component, PropTypes} from 'react';
import DataTable from 'components/DataTable';
import {Link} from 'react-router';
import Search from 'components/Search';
import {Row, Col, Button, Icon} from 'hen';

class Table extends Component {


    _getFormItems(){
        let config = {
            formItems: [{
                label: "商品名称：",
                name: "name",
                input: {}
            }, {
                label: "SPU：",
                name: "multiple_spuId",
                input: {}
            }],
            initValue: {
                name: null,
                multiple_spuId: null,
                categoryId: null
            }
        }

        return config;
    }

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

    quickButton(quickOptions){
        return <Row>
                <Col span='3'>
                    <Button onClick={quickOptions.doUp} ><Icon type="arrow-up" />批量上架</Button>
                </Col>
                <Col span='3'>
                    <Button onClick={quickOptions.doDown} ><Icon type="arrow-down" />批量下架</Button>
                </Col>
        </Row>
    }

    render() {
        const {formOptions, quickOptions, ...other} = this.props;

        return (
            <div>
                <Search items={this._getFormItems()} onSubmit={formOptions.handleSubmit} onReset={formOptions.handleReset}></Search>
                <DataTable bordered={true} columns={this._getColumns()} quickButton={this.quickButton(quickOptions)} {...other} />
            </div>
        )
    }
}


Table.propTypes = {
    dataSource : React.PropTypes.array.isRequired,
    action : React.PropTypes.func.isRequired,
    loading : React.PropTypes.bool,
    params : React.PropTypes.object,
    getQuickOptions: React.PropTypes.object,
    getFormOptions: React.PropTypes.object,

}

export default Table;
