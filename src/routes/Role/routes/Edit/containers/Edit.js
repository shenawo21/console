import React, {PropTypes, Component} from 'react'
import {connect} from 'react-redux'
import EditView from '../components/EditView'
import Panel from 'components/Panel'
import {addItem, view, modifyItem,} from '../modules/EditReducer'


class Edit extends Component {

  constructor(props) {
    super(props);

    this.getFormOptions = this.getFormOptions.bind(this);

    this.state = {
      item: {}
    };
  }

  componentDidMount() {
    const {params, view} = this.props;
    if (params.id) {
      view({roleId: params.id})
    }
  }

  componentWillReceiveProps(nextProps, preProps) {

    if (!nextProps.params.id) {
      this.setState({
        item: {}
      })
    } else {
      this.setState({
        item: nextProps.result
      })
    }
    if(nextProps.isJump){
      setTimeout(()=> {
        nextProps.history.go(-1);
      }, 800);
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
       * (表单提交)
       *
       * @param value (description)
       */

      handleSubmit(value) {
        const {addItem, params, modifyItem} = context.props;
        context.setState({
          params: value
        })
        params.id ? modifyItem({...value}) : addItem({...value});
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
    };

    return <Panel title=""><EditView item={item} {...formOptions} /></Panel>
  }
}

//数据限制类型
Edit.propTypes = {
  modifyItem: React.PropTypes.func,
  loading: React.PropTypes.bool,
  result: React.PropTypes.object,
}

const mapActionCreators = {
  addItem,
  view,
  modifyItem,
}

const mapStateToProps = (state) => {
  const {result, loading,isJump} = state.edit;
  return {'result': result, loading,isJump};

}
export default connect(mapStateToProps, mapActionCreators)(Edit)
