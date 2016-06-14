import React, { PropTypes, Component} from 'react'
import { connect } from 'react-redux'
import PubPasswordView from '../components/PubPasswordView'
import {modifyItem} from '../modules/PubPasswordReducer'

class PubPassword extends Component {

    constructor(props) {
        super(props);
        this.getFormOptions = this.getFormOptions.bind(this);
        this.state = {
            params: {}
        }
    }
    componentDidMount() {

    }

  componentWillReceiveProps(nextProps) {
    
    if(nextProps.result !== null && nextProps.result !== undefined && nextProps.result !== ''){
      setTimeout(()=> {
        history.go(-1);
      }, 800);
    }
  }  
  
      /**
       * (表格功能配置项)
       *
       * @returns (description)
       */
      getFormOptions() {
          const context = this;
          return {
              /**
               * (筛选表单提交)
               *
               * @param value (description)
               */
              handleSubmit(value) {
                  const {modifyItem, params,history} = context.props;
                  context.setState({
                      params: value
                  })
                modifyItem({
                  adminId: params.id,
                  identity: params.type,
                  ...value
                })
                history.replace('/login')
              },

              /**
               * (筛选表单重置)
               */
              handleReset() {
              }
          }
      }

    render() {
        const {params} = this.state;

           const {loading, result} = this.props;
           const formOptions = {
              loading,
              result,
              'formOptions' : this.getFormOptions()
           }
        return <PubPasswordView  {...formOptions} />
    }
}


PubPassword.propTypes = {

    result: React.PropTypes.object,
    modifyItem: React.PropTypes.func,
    loading: React.PropTypes.bool
}

const mapActionCreators = {
    modifyItem
}


const mapStateToProps = (state) => {
    const {result, loading} = state.pubPassword;

    return { 'result' : result, loading };

}

export default connect(mapStateToProps, mapActionCreators)(PubPassword)

