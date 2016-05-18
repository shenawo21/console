
/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, the counter:   */

import React, { PropTypes, Component} from 'react'
import { connect } from 'react-redux'
import EditView from '../components/EditView'
import Panel from 'components/Panel'
import {view, addItem, modifyItem} from '../modules/EditReducer'

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
        
        return <Panel title="新增帐号"><EditView {...formOptions} /></Panel> 
    }
}

//数据限制类型
Edit.propTypes = {
    view: React.PropTypes.func,
    addItem: React.PropTypes.func,
    loading: React.PropTypes.bool,
    result: React.PropTypes.bool,
}

const mapActionCreators = {
    view,
    addItem
}

const mapStateToProps = (state) => {
  const {result, loading} = state.edit;

  return {'result': result.data, loading};

}
export default connect(mapStateToProps, mapActionCreators)(Edit)
