
import React, { PropTypes, Component} from 'react'
import { connect } from 'react-redux'
import TableComponent from '../components/Table'
import Panel from 'components/Panel'
import {getBrand} from '../modules/table'

class Table extends Component {
    constructor(props) {
        super(props);
        console.log(props)
    }
    
    componentDidMount(){
        const {getBrand} = this.props;
        getBrand({id: 2464});
    }
    
    render() {
        console.log(this.props);
        return <Panel title="DataTable 表格实例"><TableComponent /></Panel> 
    }
}

Table.propTypes = {
    
}

const mapActionCreators = {
    getBrand
}

const mapStateToProps = (state) => ({
    item: state.table
})

export default connect(mapStateToProps,mapActionCreators)(Table)
