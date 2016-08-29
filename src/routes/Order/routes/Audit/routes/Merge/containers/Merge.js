import React, { PropTypes, Component} from 'react'
import { connect } from 'react-redux'
import MergeView from '../components/MergeView'
import Panel from 'components/Panel'
import {queryList, addItem, modifyItem, deleteItem} from '../modules/MergeReducer'

class Merge extends Component {
  
    constructor(props) {
        super(props);
        
        this.getFormOptions = this.getFormOptions.bind(this);
        
        
        this.state = {
            params: {}   //表格需要的筛选参数
        }
    }
    
    componentDidMount() {
        
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
                  console.log(value)
                  context.setState({
                      params: value
                  })
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
        
        
        return <Panel title=""><MergeView  {...formOptions} /></Panel>
    }
}


Merge.propTypes = {
    
    result: React.PropTypes.object,
    deleteItem: React.PropTypes.func,
    modifyItem: React.PropTypes.func,
    addItem : React.PropTypes.func,
    
    loading: React.PropTypes.bool
}

const mapActionCreators = {
    queryList,
    deleteItem,
    modifyItem,
    addItem
}


const mapStateToProps = (state) => {
    const {result, loading} = state.merge;
    
    return { 'result' : result, loading };
    
}

export default connect(mapStateToProps, mapActionCreators)(Merge)

