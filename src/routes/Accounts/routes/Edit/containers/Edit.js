
/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, the counter:   */

import React, { PropTypes, Component} from 'react'
import { connect } from 'react-redux'
import EditComponent from '../components/EditView'
import Panel from 'components/Panel'
import {queryList, addItem, modifyItem, deleteItem} from '../modules/EditReducer'

import {message} from 'hen';

class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {count: props.initialCount};  //定义初始状态
    }
    componentDidMount() {
        
    }
      /**
   * handle submit
   * @param  {any} formData
   * @param  {any} e
   */
    handleSubmit(value){
        console.log("=====校验通过=====", value);
        message.success(' =====校验通过=====   ' + value);
    }
    
    render() {
        console.log('======props=====',this.props);
        console.log('======state=====',this.state.count);
        
        return <Panel title="新增帐号"><EditComponent handleSubmit={this.handleSubmit.bind(this)} /></Panel> 
    }
}

//数据限制类型
Edit.propTypes = {
    
}

const mapActionCreators = {
    
}

const mapStateToProps = (state) => ({
    
})

export default connect(mapStateToProps, mapActionCreators)(Edit)
