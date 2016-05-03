import React, { PropTypes, Component} from 'react'
import { connect } from 'react-redux'
import { getBrand } from '../modules/redx'
import RedxComponent from '../components/Redx'
import {Link} from 'react-router'
import Panel from 'components/Panel'

class Redx extends Component {
    
    componentDidMount(){
        //const {dispatch} = this.props;
        //dispatch(getBrand());
        //this.props.getBrand(1111);
        console.log(this.props)
    }
    
    handleBack(){
        alert(111);
    }
    render() {
        console.log(this.props)
        
        const {redx,route} = this.props;
        return <Panel title="Redx实例"><Link to='/redx/list'>List</Link><RedxComponent data={redx} route={route} handleBack={this.handleBack.bind(this)} /></Panel> 
    }
}

//数据限制类型
Redx.propTypes = {
    
}

const mapActionCreators = {
    getBrand
}

const mapStateToProps = (state) => {
    console.log(state);
    const {redx} = state;
    return {
        redx
    }
}


export default connect(mapStateToProps, mapActionCreators)(Redx)