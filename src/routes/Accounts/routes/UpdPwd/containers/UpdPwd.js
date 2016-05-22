
/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, the counter:   */

import React, { PropTypes, Component} from 'react'
import { connect } from 'react-redux'
import SettingView from '../components/UpdPwdView'
import Panel from 'components/Panel'
import {modifyItem, view} from '../modules/UpdPwdReducer'

import {message} from 'hen';

class Setting extends Component {
    
    constructor(props) {
        super(props);
        
        this.getFormOptions = this.getFormOptions.bind(this);
        
        this.state = {
            params: {},
            item: {}
            
        };  //定义初始状态
    }
    componentDidMount() {
        const {view} = this.props;
        //view({});
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
            const {modifyItem, params} = context.props;

            context.setState({
                params: value
            })
            modifyItem({...value});
          },
          
          /**
           * (重置)表单
           */
          
          handleReset(){
              
          }
            
        }
    }
    
   
    
    
    render() {
        const {params, item} = this.state;
        const {loading, result} = this.props;
        const formOptions = {
            loading,
            result,
            'formOptions': this.getFormOptions()
        }
        
        return <Panel title="修改密码"><SettingView item={item} {...formOptions} /></Panel> 
    }
}

//数据限制类型
Setting.propTypes = {
    view: React.PropTypes.func,
    modifyItem: React.PropTypes.func,
    loading: React.PropTypes.bool,
    result: React.PropTypes.object,
}

const mapActionCreators = {
    view,
    modifyItem
}

const mapStateToProps = (state) => {
    
    const {result, loading} = state.edit;
    
    return {'result': result.data, loading};

}
export default connect(mapStateToProps, mapActionCreators)(Setting)
