import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

import DataTable from 'components/DataTable';
import { DatePicker, Col } from 'hen';
import Search from 'components/Search';

class SearchSpu extends Component {
    _getFormItems(){
        let config = {
            formItems: [{
                label: "spu：",
                name: "spuId",
                span: '8',
                input: {                    
                    placeholder: "请输入spu"
                }
            }, {
                label: "创建日期：",
                span: '16',
                custom(getCustomFieldProps, FormContext) {
                    return <div>
                        <Col span="8">
                            <DatePicker format="yyyy-MM-dd HH:mm:ss" {...getCustomFieldProps('createTimeStart') } showTime={true} />
                        </Col>
                        <Col span="1">
                            <p className="ant-form-split">-</p>
                        </Col>
                        <Col span="8">
                            <DatePicker format="yyyy-MM-dd HH:mm:ss"  {...getCustomFieldProps('createTimeEnd') } showTime={true}/>
                        </Col>
                    </div>
                }
            }, {
                label: "商品标题：",
                name: "title",
                span: '8',
                input: {
                    placeholder: "请输入商品标题"
                }
            }],
            initValue: {
                spuId: null,
                createTimeStart: null,
                createTimeEnd: null,
                title: null
            }
        }
        return config;
    }


    _getColumns(){
        const context = this;
        let columns = [{
            key: '0',
            title: 'spu',
            dataIndex: 'spuId'
        }, {
            key: '1',
            title: '商品标题',
            dataIndex: 'title'
        }, {
            key: '2',
            title: '创建日期',
            dataIndex: 'createTime'
        }];
        return columns;
    }
    

    render() {
        const {tableFormOptions, tableOptions} = this.props;
        return (
            <div>
                <Search  items={this._getFormItems()}  onSubmit={tableFormOptions.handleSubmit} onReset={tableFormOptions.handleReset}/>
                <DataTable bordered={true} columns={this._getColumns()} {...tableOptions} />
            </div>
        )
    }
}


SearchSpu.propTypes = {

    // dataSource : React.PropTypes.array.isRequired,
    // action : React.PropTypes.func.isRequired,

    loading : React.PropTypes.bool,
    params : React.PropTypes.object
}


export default SearchSpu;
