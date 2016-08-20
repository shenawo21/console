import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

import Collapse from 'components/Collapse';
import DataTable from 'components/DataTable';

class product extends Component {

    _getColumns(){
        const context = this;
        let columns = [{
            key: '0',
            title: 'SPU',
            dataIndex: 'spuId'
        }, {
            key: '1',
            title: 'SKU',
            dataIndex: 'skuId'
        }, {
            key: '2',
            title: '所属店铺',
            dataIndex: 'shopName'
        }, {
            key: '3',
            title: '商品名称',
            dataIndex: 'title'
        }, {
            key: '4',
            title: '商品类目',
            dataIndex: 'categoryName'
        }, {
            key: '5',
            title: '规格',
            dataIndex: 'specOneValue'
        }, {
            key: '6',
            title: '市场价',
            dataIndex: 'marketPrice'
        }, {
            key: '7',
            title: '建议销售价',
            dataIndex: 'price'
        }, {
            key: '8',
            title: '待同步库存',
            dataIndex: 'stock'
        }, {
            key: '9',
            title: '状态',
            dataIndex: 'status'
        }];
        
        return columns;
    }

    render() {
        const {formOptions, tableOptionsPro, ...other} = this.props;
        console.log(this);

        const tableOptions = {
            columns: this._getColumns(),
            ...tableOptionsPro
        }

        let collapseOptions = {
            source : {
                titles:[{
                    name: '待对比商品'
                },{
                    name: '比对失败'
                },{
                    name: '出库时间'
                }],
                btns:[{
                    name: '退回'
                },{
                    name: '导出'
                },{
                    name: '比对更新'
                }],
                hasArrow: true
            }
        }           
            

        return (
            <div>

                <Collapse {...collapseOptions.source}>
                    <DataTable bordered={true} {...tableOptions} />
                </Collapse>

            </div>
        )
    }
}


product.propTypes = {

    // dataSource : React.PropTypes.array.isRequired,
    // action : React.PropTypes.func.isRequired,

    // loading : React.PropTypes.bool,
    // params : React.PropTypes.object
}


export default product;
