
/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, the counter:   */

import React, { PropTypes, Component} from 'react'
import { connect } from 'react-redux'
import StorageMgtView from '../components/StorageMgtView'
import Panel from 'components/Panel'
import { getRoleList } from '../modules/StorageMgtReducer'
import {message} from 'hen';

class StorageMgt extends Component {

    constructor(props) {
        super(props);

        this.getFormOptions = this.getFormOptions.bind(this);

        this.state = {
            item: {}
        };  //定义初始状态
    }
    componentDidMount() {
        const {params} = this.props;
        const context = this;

    }

    componentWillReceiveProps(nextProps, preProps){

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
       * (筛选表单提交)
       *
       * @param value (description)
       */

        handleSubmit(value) {
            const {} = _this.props;

          },

          /**
           * (重置)表单
           */

          handleReset(){

          }

        }
    }

    render() {
        const { item } = this.state;
        const {loading, result} = this.props;
        const formOptions = {
            loading,
            result,
            'formOptions': this.getFormOptions()
        };
        return <Panel><StorageMgtView item={item} {...formOptions} /></Panel>
    }
}

//数据限制类型
StorageMgt.propTypes = {
    loading: React.PropTypes.bool,
    result: React.PropTypes.object,
}

const mapActionCreators = {

}

const mapStateToProps = (state) => {
  const {result, loading} = state.storageMgt;
  return {'result': result, loading};
}

export default connect(mapStateToProps, mapActionCreators)(StorageMgt)
