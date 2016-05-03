import React, {Component, PropTypes} from 'react';
import { Table, Icon, message } from 'hen';
import history from 'common/history';
import fetch from 'common/apiClient';
import {isEqual} from 'common/utils';

/**
 * (description)
 * 
 * @class DataTable
 * @extends {Component}
 */
class DataTable extends Component {
    
    /**
     * Creates an instance of DataTable.
     * 
     * @param props (description)
     */
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: false,
            total: 0,
            current: 1,
            selectedRowKeys: []
        }
    }

    /**
     * (description)
     */
    refresh() {
        this.isMounted() && setTimeout(() => { this.requestData() }, 50);
    }

    /**
     * (description)
     * 
     * @returns (description)
     */
    getCurrentPage() {
        const {location} = this.context.props;
        const {p} = location.query;

        const {disablePush} = this.props;

        return disablePush ? this.state.current : Number(p) || 1
    }
    /**
     * (description)
     * 
     * @param param (description)
     * @param current (description)
     */
    requestData(param, current) {
        const {fetch, location} = this.context.props;
        const {url, params} = this.props;
        if (current) {
            params && params.pageNumber && delete params.pageNumber;
        }
        let data = Object.assign({
            pageNumber: current || this.getCurrentPage()
        }, param || params);

        this.setState({
            loading: true
        });

        fetch.post(url, data).then(res => {
            if (!this.ignoreLastFetch) {
                if (res.status === 1) {
                    let resData = res.data;
                    if (resData && !Array.isArray(resData)) {
                        resData = resData.items;
                    }
                    this.setState({
                        data: resData,
                        total: res.data.totalItems,
                        loading: false,
                        selectedRowKeys: []
                    });
                } else {
                    message.error(res.message);
                }
            }
        }, err => {
            message.error(err);
        })
    }

    componentDidMount() {
        this.setState({ current: this.getCurrentPage() })
        this.requestData();
    }

    componentWillUnmount() {

        this.ignoreLastFetch = true
    }


    /**
    * 是否接收到新的属性，来确定是否需要重新获取数据
    * @param  {any} nextProps
    */
    componentWillReceiveProps(nextProps) {
        if (!isEqual(nextProps.pagination, this.props.pagination) || !isEqual(nextProps.params, this.props.params)) {
            //if(!isEqual(nextProps,this.props)){
            if ((nextProps.params && nextProps.params.pageNumber)) {
                let pageNumber = nextProps.params.pageNumber;
                const {location} = this.context.props
                this.setState({
                    current: pageNumber
                });
                history.push({...location, query : { p: pageNumber }});
            }
            this.requestData(nextProps.params);
        }
    }

    /**
     * row key
     * @param  {any} record
     * @param  {any} index
     */
    _rowKey(record, index) {

        return index
    }

    /**
    * 当点击分页页码的时候触发
    * @param  {any} currentPage
    */
    _onPaginationChange(pagination, filters, sorter) {

        const {location} = this.context.props;

        const {current} = pagination;

        const {disablePush} = this.props;

        !disablePush && history.push({...location, query:{ p: current }});

        this.requestData(null, current);

        this.setState({
            current
        })
    }

    render(){
        let tableProps = this.props;
        let {selectedRowKeys, total} = this.state;
        let {rowSelection,...other} = this.props;
        if (rowSelection) {
            tableProps = {
                rowSelection: {
                    selectedRowKeys,
                    onChange: (selectedRowKeys) => {
                        this.setState({
                            selectedRowKeys
                        })
                    },
                        ...rowSelection,
                },
                    ...other
            }
        }
        let pagination = Object.assign(this.props.pagination, {
            //hack
            current: this.getCurrentPage(),
            total: total
        });

        return <Table  rowKey={this._rowKey}  pagination={pagination} loading={this.state.loading} {...tableProps} dataSource={this.state.data}  onChange={this._onPaginationChange.bind(this) } />

    }
}

DataTable.propTypes = {
    props: React.PropTypes.object
}

DataTable.defaultProps = {
    pagination: {
        pageSize: 10
    }
}

export default DataTable;