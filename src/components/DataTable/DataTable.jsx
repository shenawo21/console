import React, {Component, PropTypes} from 'react';
import {Table} from 'hen';
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
        this.state = this.initState();
        this.refresh = this.refresh.bind(this);
    }

    initState(){
        const {pageSize, selectedItemsKeys = []} = this.props;
        return {
            current: 1,
            pageSize,
            selectedRowKeys: selectedItemsKeys
        }
    }

    /**
     * (description)
     */
    refresh() {
        setTimeout(() => { this.requestData() }, 50);
    }

    /**
     * (获取当前页码)
     * 
     * @returns (description)
     */
    getCurrentPage() {
        const {location} = this.context.props;
        const {p} = location.query;
        return Number(p) || 1;
    }
    /**
     * (数据请求)
     * 
     * @param param (description)
     * @param pages {pageNumber,pageSize}
     */
    requestData(param, pages) {
        const {location} = this.context.props;
        const {action, params} = this.props;
        if (pages && pages.current) {
            params && params.pageNumber && delete params.pageNumber;
        }
        setTimeout(()=>{
            let data = Object.assign({
                pageNumber: (pages && pages.current) || this.getCurrentPage(),
                pageSize :  (pages && pages.pageSize) || this.state.pageSize
            }, param || params);
            action(data);
        
            this.setState({
                selectedRowKeys: []
            })
        },10);
    }

    componentDidMount() {
        this.setState({ current: this.getCurrentPage() })
    }

    componentWillUnmount() {
        this.setState(this.initState())
    }


    /**
    * 是否接收到新的属性，来确定是否需要重新获取数据
    * @param  {any} nextProps
    */
    componentWillReceiveProps(nextProps) {
        if (!isEqual(nextProps.params, this.props.params)) {
            if ((nextProps.params && nextProps.params.pageNumber)) {
                const {params} = nextProps
                const {pageNumber, pageSize} = params;
                const {location,router} = this.context.props
                this.setState({
                    current: pageNumber,
                    pageSize : pageSize || this.props.pageSize
                });
                router.push({...location, query : { p: pageNumber }});
            }
            this.requestData(nextProps.params);
        }
        if(nextProps.selectedItemsKeys){
            this.setState({
                selectedRowKeys: nextProps.selectedItemsKeys
            })
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
        
        const {current, pageSize} = pagination;
        
        router.push({...location, query:{ p: current }});

        this.requestData(null, {pageSize, current});

        this.setState({
            current,
            pageSize
        })
    }
    
    getQuickButton(quickButton){
       return  <div style={{paddingBottom:15}}>{quickButton}</div>
    }
    
    onShowSizeChange(current, pageSize){
        this.setState({
            pageSize
        });
    }

    render(){
        let tableProps;
        let {selectedRowKeys} = this.state;
        let {rowSelection, pagination, action, quickButton,_uKey, ...other} = this.props;
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
        if(pagination){
            pagination =  {
                current: this.getCurrentPage(),
                showQuickJumper : true,
                showSizeChanger : false,
                showTotal : () => `共 ${pagination.total} 条`,
                onShowSizeChange : this.onShowSizeChange.bind(this),
                ...pagination
            };
        }else{
            pagination = false;
        }
        if(!_uKey){
             tableProps.rowKey = this._rowKey
        }
        return <div>
            {quickButton ? this.getQuickButton(quickButton) : ''}
            <Table pagination={pagination} onChange={this._onPaginationChange.bind(this) } {...tableProps} />
        </div>
    }
}

DataTable.propTypes = {
    action : React.PropTypes.func,
    params : React.PropTypes.object,
    selectedItemsKeys : React.PropTypes.array,
    pagination: React.PropTypes.oneOfType([
      React.PropTypes.bool,
      React.PropTypes.object
    ])
}
DataTable.defaultProps = {
    pageSize : 10
}
DataTable.contextTypes = {
    props: React.PropTypes.object
}

export default DataTable;