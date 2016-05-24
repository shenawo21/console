
/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, the counter:   */

import React, { PropTypes, Component} from 'react'
import { connect } from 'react-redux'
import SettingView from '../components/UpdPwdView'
import Panel from 'components/Panel'
import {modifyItem} from '../modules/UpdPwdReducer'
import store from 'store2';

import {message} from 'hen';

class Setting extends Component {
    
    constructor(props) {
        super(props);
        
        this.getFormOptions = this.getFormOptions.bind(this);
        
        this.state = {
            params: {},
            item: {},
            userName: null
            
        };  //定义初始状态
    }
    componentDidMount() {
       //store.get('USER').account
       const context = this;
       context.setState({
           userName: store.get('USER').account
       });        
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
        const {params, item, userName} = this.state;
        const {loading, result} = this.props;
        const formOptions = {
            loading,
            result,
            'formOptions': this.getFormOptions()
        }
        
        return <Panel title="修改密码"><SettingView item={item} user={userName} {...formOptions} /></Panel> 
    }
}

//数据限制类型
Setting.propTypes = {
    modifyItem: React.PropTypes.func,
    loading: React.PropTypes.bool,
    result: React.PropTypes.object,
}

const mapActionCreators = {
    modifyItem
}

const mapStateToProps = (state) => {
    
    const {result, loading} = state.edit;
    
    return {'result': result, loading};

}
export default connect(mapStateToProps, mapActionCreators)(Setting)
