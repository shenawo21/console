import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

import DataTable from 'components/DataTable';

import Search from 'components/Search';

class SearchSpu extends Component {
    _getFormItems(){
        let config = {
            formItems: [{
                label: "spu",
                name: "name",
                input: {
                }
            }, {
                label: "商品标题",
                name: "name",
                input: {
                }
            }, {
                label: "创建日期",
                name: "name",
                input: {
                }
            }],
            initValue: {
                
            }
        }
        return config;
    }


    _getColumns(){
        const context = this;
        let columns = [{
            key: '0',
            title: 'spu',
            dataIndex: 'spu'
        }, {
            key: '1',
            title: '商品标题',
            dataIndex: 'name'
        }, {
            key: '2',
            title: '创建日期',
            dataIndex: 'time'
        }];
        return columns;
    }
    

    render() {
        const {formOptions, ...other} = this.props;
        
        return (
            <div>
                <Search  items={this._getFormItems()} onSubmit={formOptions.handleSubmit} />
                <DataTable bordered={true} columns={this._getColumns()} {...other} />
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
