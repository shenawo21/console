import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

import DataTable from 'components/DataTable';

import classes from './Collapse.less'

class product extends Component {

    _getColumns(){
        const context = this;
        let columns = [{
            key: '0',
            title: 'SPU',
            dataIndex: 'enterpriseCode'
        }, {
            key: '1',
            title: 'SKU',
            dataIndex: 'account'
        }, {
            key: '2',
            title: '所属店铺',
            dataIndex: 'name'
        }, {
            key: '3',
            title: '商品名称',
            dataIndex: 'enabled'
        }, {
            key: '4',
            title: '商品类目',
            dataIndex: 'email'
        }, {
            key: '5',
            title: '规格',
            dataIndex: 'mobile'
        }, {
            key: '6',
            title: '市场价',
            dataIndex: 'registerTime'
        }, {
            key: '7',
            title: '建议销售价',
            dataIndex: 'price'
        }, {
            key: '8',
            title: '待同步库存',
            dataIndex: 'registerTime'
        }, {
            key: '9',
            title: '状态',
            dataIndex: 'createPerson'
        }];
        
        return columns;
    }

    render() {
        const {formOptions, ...other} = this.props;

        return (
            <div>

                <div className={classes.collapse}>
                    <div className={classes.collapseItem}>
                        <div className={classes.collapseHeader}>
                            <i className="anticon anticon-right fr"></i>
                            <button className="ant-btn ant-btn-normal fr">回退</button>
                            <button className="ant-btn ant-btn-normal fr">导出</button>
                            <button className="ant-btn ant-btn-normal fr">对比更新</button>
                            <ul className={classes.tit}>
                                <li className={classes.titList}>待对比商品：1</li>
                                <li className={classes.titList}>对比失败：1</li>
                                <li>出库时间：2016-07-21  10:30:11</li>
                            </ul>
                        </div>
                        <div className={classes.collapseContent}>
                            <div className={classes.collapseContentBox}>
                                <DataTable bordered={true} columns={this._getColumns()} {...other} pagination={false} ref='dt' />
                            </div>
                        </div>
                    </div>
                    <div className={classes.collapseItem}>
                        <div className={classes.collapseHeader}>
                            <i className="anticon anticon-right fr"></i>
                            <button className="ant-btn ant-btn-normal fr">回退</button>
                            <button className="ant-btn ant-btn-normal fr">导出</button>
                            <button className="ant-btn ant-btn-normal fr">对比更新</button>
                            <ul className={classes.tit}>
                                <li className={classes.titList}>待对比商品：1</li>
                                <li className={classes.titList}>对比失败：1</li>
                                <li>出库时间：2016-07-21  10:30:11</li>
                            </ul>
                        </div>
                        <div className={classes.collapseContent}>
                            <div className={classes.collapseContentBox}>
                                <DataTable bordered={true} columns={this._getColumns()} {...other} pagination={false} ref='dt' />
                            </div>
                        </div>
                    </div>
                    <div className={classes.collapseItem}>
                        <div className={classes.collapseHeader}>
                            <i className="anticon anticon-right fr"></i>
                            <button className="ant-btn ant-btn-normal fr">回退</button>
                            <button className="ant-btn ant-btn-normal fr">导出</button>
                            <button className="ant-btn ant-btn-normal fr">对比更新</button>
                            <ul className={classes.tit}>
                                <li className={classes.titList}>待对比商品：1</li>
                                <li className={classes.titList}>对比失败：1</li>
                                <li>出库时间：2016-07-21  10:30:11</li>
                            </ul>
                        </div>
                        <div className={classes.collapseContent}>
                            <div className={classes.collapseContentBox}>
                                <DataTable bordered={true} columns={this._getColumns()} {...other} pagination={false} ref='dt' />
                            </div>
                        </div>
                    </div>
                </div>

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
