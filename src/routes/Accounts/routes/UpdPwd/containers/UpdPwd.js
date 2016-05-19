
/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, the counter:   */

import React, { PropTypes, Component} from 'react'
import { connect } from 'react-redux'
import SettingView from '../components/UpdPwdView'
import Panel from 'components/Panel'
import {modifyItem} from '../modules/UpdPwdReducer'

import {message} from 'hen';

class Edit extends Component {
    
    constructor(props) {
        super(props);
        
        this.getFormOptions = this.getFormOptions.bind(this);
        
        this.state = {count: props.initialCount};  //定义初始状态
    }
    componentDidMount() {
        
    }
    
    /**
   * handle submit
   * @param  {any} formData
   * @param  {any} e
   */
    getFormOptions() {
        const context = this;
        return {
       /**
       * (表单提交)
       *
       * @param value (description)
       */
      
        handleSubmit(value) {
            const {addItem} = context.props;
            console.log(value);
            context.setState({
                params: value
            })
            addItem({...value});
          },
          
          /**
           * (重置)表单
           */
          
          handleReset(){
              
          }
            
        }
    }
    
   
    
    
    render() {
        const {params} = this.state;
        const {loading, result} = this.props;
        const formOptions = {
            loading,
            result,
            'formOptions': this.getFormOptions()
        }
        
        return <Panel title="修改密码"><SettingView {...formOptions} /></Panel> 
    }
}

//数据限制类型
Setting.propTypes = {
    
}

const mapActionCreators = {
    
}

const mapStateToProps = (state) => {

}
export default connect(mapStateToProps, mapActionCreators)(Setting)
