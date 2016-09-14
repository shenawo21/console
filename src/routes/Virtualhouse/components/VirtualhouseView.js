import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

import DataTable from 'components/DataTable';

import Search from 'components/Search';
import {DownLoader} from 'components/FileLoader'
import {Row, Col, Button, Icon, Popconfirm, Modal} from 'hen';
import {getSpecValue} from 'common/utils'

class virtualView extends Component {

    //获取单条已出库存信息
    getAssignedStock(row){
        const context = this;
        const id = row.skuId;
        const { handleModal } = context.props.tableOptions;
        handleModal.showModal(id);
    }
    
    _getFormItems(){
        let context = this;
        const {cateList} = context.props;
        let config = {
            formItems: [{
                label: "商品名称：",
                name: "title",
                input: {
                    placeholder: "请输入商品名称"
                }
            }, {
                label: "SPU：",
                name: "spuId",
                input: {
                    placeholder: "请输入SPU",
                    type: 'number'
                }
            }, {
                label: "SKU：",
                name: "skuId",
                input: {
                    placeholder: "请输入SKU",
                    type: 'number'
                }
            },{
                label: "商品类目：",
                name: "categoryCode",
                wrapperCol: {span: 15},
                cascader: {
                    options: cateList,
                    placeholder: "请选择所属类目",
                    changeOnSelect: true
                }
            }],
            initValue: {
                title: null,
                spuId : null,
                skuId: null,
                categoryCode : null
            }
        }
        return config;
    }


    _getColumns(){
        const context = this;
        
        let columns = [{
            key: '0',
            title: '平台SPU',
            dataIndex: 'spuId'
        }, {
            key: '1',
            title: '平台SKU',
            dataIndex: 'skuId'
        }, {
            key: '2',
            title: '商品名称',
            dataIndex: 'title'
        }, {
            key: '3',
            title: '商品类目',
            dataIndex: 'categoryName'
        }, {
            key: '4',
            title: '规格',
            dataIndex: 'specOneValue',
            render(val, row){
                return getSpecValue(row)
            }
        }, {
            key: '5',
            title: '价格',
            dataIndex: 'price'
        }, {
            key: '6',
            title: '已出库存',
            dataIndex: 'assignedStock',
            render(value, row){
                return <a href="javascript:;" onClick={context.getAssignedStock.bind(context, row)} >{value}</a>
            }
        }, {
            key: '7',
            title: '剩余可分配库存',
            dataIndex: 'stock'
        }];
        return columns;
    }    

    _getStockColumns(){
        const context = this;
        let columns = [{
            key: '0',
            title: '店铺名称',
            dataIndex: 'shopName'
        }, {
            key: '1',
            title: '分配库存数',
            dataIndex: 'stock'
        }, {
            key: '2',
            title: '分配时间',
            dataIndex: 'createTime'
        }];
        return columns;
    }
        
    // 按钮
    quickButton(quickOptions){
        const context = this;
        const {selectList} = context.props;
        const disabled = selectList && selectList.length ? false: true;
        let params = {
            skuId: selectList || []
        }
        return <Row>
                <Col span="3">
                    <DownLoader title='批量导出' disabled={disabled} url="/api-productService.exportFile" params={params} />
                </Col>
                <Col span='2'>
                    <Link className="ant-btn ant-btn-primary" to={`/virtualhouse/storageMgt`}>入库</Link>
                </Col>
                <Col span='2'>
                    <Link className="ant-btn ant-btn-primary" to={`/virtualhouse/outgoMgt`}>出库</Link>
                </Col>
        </Row>
    }
    

    render() {
        const {formOptions, quickOptions, visible, tableOptions, stockTableOptions} = this.props;
        let {handleModal, ...other} = tableOptions;
        return (
            <div>
                <Search  items={this._getFormItems()} onSubmit={formOptions.handleSubmit} onReset={formOptions.handleReset} />

                <DataTable bordered={true} columns={this._getColumns()} quickButton={this.quickButton(quickOptions)} {...other} ref='dt' />

                <Modal title="已出库明细" visible={visible} onOk={handleModal.handleOk} onCancel={handleModal.handleCancel}>
                    <DataTable bordered={true} columns={this._getStockColumns()} {...stockTableOptions} />
                </Modal>
               

            </div>
        )
    }
}


virtualView.propTypes = {
    tableOptions: React.PropTypes.shape({
      dataSource: React.PropTypes.array,
      action: React.PropTypes.func,
      loading : React.PropTypes.bool
    }),
    stockTableOptions: React.PropTypes.shape({
      dataSource: React.PropTypes.array,
      loading : React.PropTypes.bool
    })
}


export default virtualView;
