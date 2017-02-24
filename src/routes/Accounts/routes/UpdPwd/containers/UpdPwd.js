
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
import Cookie from 'js-cookie';
import {message, Modal, Button} from 'hen';

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
        const _this = this;
        return {
       /**
       * (表单提交)
       *
       * @param value (description)
       */
      
        handleSubmit(value) {
            const {modifyItem, params,history} = _this.props;
            const {adminId} = store.get('USER')
            _this.setState({
                params: value
            })
            modifyItem({
                adminId: adminId,
                ...value
            }).then((res) => {
                if(res.status == 1) {
                    //message.success(res.message);
                    Modal.success({
                        title: '通知',
                        content: '您已修成功修改帐号密码，请重新登录！'
                    });
                    setTimeout(() => {
                        Cookie.remove('sessionId');
                        store.clearAll();
                        _this.context.router.push('/login')
                    },2000)
                }else{
                    message.error(res.message);
                }
            });
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

Setting.contextTypes = {
    router: React.PropTypes.object.isRequired,
};

const mapActionCreators = {
    modifyItem
}

const mapStateToProps = (state) => {
    
    const {result, loading} = state.edit;
    
    return {'result': result, loading};

}
export default connect(mapStateToProps, mapActionCreators)(Setting)
