
import React, { PropTypes, Component} from 'react'
import { connect } from 'react-redux'
import TableComponent from '../components/Table'
import Panel from 'components/Panel'
import {queryItemList} from '../modules/table'

class Table extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const {queryItemList, location} = this.props;
        const {query} = location;
        let pageNumber = query.p ? Number(query.p) : 1;
        queryItemList({ pageNumber });
    }

    render() {
        const {items, queryItemList, totalItems, loading} = this.props;

        return <Panel title="DataTable 表格实例"><TableComponent dataSource={items} action={queryItemList} total={totalItems} loading={loading} /></Panel>
    }
}


Table.propTypes = {
    items: React.PropTypes.array.isRequired,
    queryItemList: React.PropTypes.func.isRequired,
    totalItems: React.PropTypes.number.isRequired,
    loading: React.PropTypes.bool
}

const mapActionCreators = {
    queryItemList
}

const mapStateToProps = (state) => {
    const {result, loading} = state.table;
    const {items = [], pageNumber = 1, pageSize = 10, totalItems = 0, totalPages = 1} = result.data || {};
    return { items, totalItems, loading };
}

export default connect(mapStateToProps, mapActionCreators)(Table)
