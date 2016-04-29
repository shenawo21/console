
import React, { PropTypes, Component} from 'react'
import { connect } from 'react-redux'
import TableComponent from '../components/Table'
import Panel from 'components/Panel'

class Table extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        console.log(1111);
        return <Panel title="DataTable 表格实例"><TableComponent /></Panel> 
    }
}

Table.propTypes = {
    
}

const mapActionCreators = {
    
}

const mapStateToProps = (state) => ({
    
})

export default connect(mapStateToProps,mapActionCreators)(Table)
