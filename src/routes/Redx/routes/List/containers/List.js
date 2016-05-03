import React, { PropTypes, Component} from 'react'
import { connect } from 'react-redux'
//import { getBrand } from '../modules/redx'
import ListComponent from '../components/List'
import Panel from 'components/Panel'

class List extends Component {
    render() {
        return <Panel title="List二级路由实例"><ListComponent {...this.props} /></Panel> 
    }
}

//数据限制类型
List.propTypes = {
    
}

const mapActionCreators = {
    
}

const mapStateToProps = (state) => ({
    
})


export default connect(mapStateToProps, mapActionCreators)(List)