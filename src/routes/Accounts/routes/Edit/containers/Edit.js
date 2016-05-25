
/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, the counter:   */

import React, { PropTypes, Component} from 'react'
import { connect } from 'react-redux'
import EditView from '../components/EditView'
import Panel from 'components/Panel'
import {view, addItem, modifyItem, getEnterList} from '../modules/EditReducer'

import {message} from 'hen';

class Edit extends Component {

    constructor(props) {
        super(props);

        this.getFormOptions = this.getFormOptions.bind(this);

        this.state = {
            params: {},
            item: {},
            enterList: []
        };  //定义初始状态
    }
    componentDidMount() {
        const {params, view, getEnterList} = this.props;
        const context = this;
        getEnterList().then(function(response) {
                const lists = response.data.data;
                console.log(lists,'lists-----')
                const loop = (lists) =>{
                   return lists && lists.map(a => {
                          return {
                                value: a.enterpriseCode,
                                title: a.name
                           }
                    })
                }
                let sel = loop(lists);
				context.setState({
                    enterList: sel
                });      
            });

        
        if(params.id){
            view({adminId: params.id})
        }
                
    }

    componentWillReceiveProps(nextProps, preProps){
        if(!nextProps.params.id){
            this.setState({
                item: {}
            })
        } else {
            this.setState({
                item: nextProps.result
            })
        }
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
       * (筛选表单提交)
       *
       * @param value (description)
       */

        handleSubmit(value) {
            const {addItem, modifyItem, params} = context.props;
            console.log("value++" + value.adminId);
            context.setState({
                params: value
            })
            params.id ? modifyItem({
                adminId: params.id,
                enterpriseCode: value.enterpriseCode,
                ...value
            }) : addItem({...value});
          },

          /**
           * (重置)表单
           */

          handleReset(){

          }

        }
    }




    render() {
        const {params, item, enterList} = this.state;
        const {loading, result} = this.props;
        const formOptions = {
            loading,
            result,
            'formOptions': this.getFormOptions()
        };
        return <Panel><EditView item={item} enterList={enterList} {...formOptions} /></Panel>
    }
}

//数据限制类型
Edit.propTypes = {
    view: React.PropTypes.func,
    addItem: React.PropTypes.func,
    modifyItem: React.PropTypes.func,
    loading: React.PropTypes.bool,
    result: React.PropTypes.object,
}

const mapActionCreators = {
    view,
    addItem,
    modifyItem
}

const mapStateToProps = (state) => {
  const {result, loading} = state.edit;

  return {'result': result, loading};

}
export default connect(mapStateToProps, mapActionCreators)(Edit)
