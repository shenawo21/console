
/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, the counter:   */

import React, { PropTypes, Component} from 'react'
import { connect } from 'react-redux'
import OutgoMgtView from '../components/OutgoMgtView'
import Panel from 'components/Panel'
import { viewItem } from '../modules/OutgoMgtReducer'

import {message} from 'hen';

class OutgoMgt extends Component {

    constructor(props) {
        super(props);

        this.getFormOptions = this.getFormOptions.bind(this);

        this.state = {
            params: {},
            item: {}

        };  //定义初始状态
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
            const {viewItem, params} = context.props;
            context.setState({
                params: value
            })
            viewItem({
                ...value
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
        const {params, item} = this.state;
        const {loading, result} = this.props;
        const formOptions = {
            loading,
            result,
            'formOptions': this.getFormOptions()
        }

        return <Panel title="出库管理"><OutgoMgtView item={item} {...formOptions} /></Panel>
    }
}

//数据限制类型
OutgoMgt.propTypes = {
    viewItem: React.PropTypes.func,
    loading: React.PropTypes.bool,
    result: React.PropTypes.object,
}

const mapActionCreators = {
    viewItem
}

const mapStateToProps = (state) => {

    const {result, loading} = state.outgoMgt;
    return {'result': result, loading};

}
export default connect(mapStateToProps, mapActionCreators)(OutgoMgt)
