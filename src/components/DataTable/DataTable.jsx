import React, {Component, PropTypes} from 'react';
import { Table, Icon, message } from 'hen';
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
        return Number(p) || 1;
    }
    /**
     * (description)
     * 
     * @param param (description)
     * @param current (description)
     */
    requestData(param, current) {
        const {location} = this.context.props;
        const {action, params} = this.props;
        if (current) {
            params && params.pageNumber && delete params.pageNumber;
        }
        let data = Object.assign({
            pageNumber: current || this.getCurrentPage()
        }, param || params);
        
        action(data);
        
    }

    componentDidMount() {
        this.setState({ current: this.getCurrentPage() })
    }

    componentWillUnmount() {
        
    }


    /**
    * 是否接收到新的属性，来确定是否需要重新获取数据
    * @param  {any} nextProps
    */
    componentWillReceiveProps(nextProps) {
        // console.log(nextProps, this.props);
        if (!isEqual(nextProps.params, this.props.params)) {
            //if(!isEqual(nextProps,this.props)){
            if ((nextProps.params && nextProps.params.pageNumber)) {
                let pageNumber = nextProps.params.pageNumber;
                const {location,router} = this.context.props
                this.setState({
                    current: pageNumber
                });
                router.push({...location, query : { p: pageNumber }});
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

        const {location, router} = this.context.props;

        const {current} = pagination;

        router.push({...location, query:{ p: current }});

        this.requestData(null, current);

        this.setState({
            current
        })
    }

    render(){
        let tableProps;
        let {selectedRowKeys} = this.state;
        let {rowSelection, pagination, action, ...other} = this.props;
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
        }else{
            tableProps = {
                ...other
            }
        }
        if(pagination !== false){
            pagination =  {
                current: this.getCurrentPage(),
                showQuickJumper : true,
                pageSize: 10,
                showTotal : () => `共 ${pagination.total} 条`,
                ...pagination
            };
        }
        
        return <Table  rowKey={this._rowKey} pagination={pagination} {...tableProps} onChange={this._onPaginationChange.bind(this) } />

    }
}

DataTable.contextTypes = {
    props: React.PropTypes.object
}

export default DataTable;