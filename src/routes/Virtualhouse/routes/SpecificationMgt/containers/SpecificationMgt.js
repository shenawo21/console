
/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, the counter:   */

import React, { PropTypes, Component} from 'react'
import { connect } from 'react-redux'
import SpecificationMgtView from '../components/SpecificationMgtView'
import Panel from 'components/Panel'
import { spec } from '../modules/SpecificationMgtReducer'
import {message} from 'hen';

class specificationMgt extends Component {

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
        const {loading, items} = this.props;
        const tableOptions = {
            dataSource : items,                         //加载组件时，表格从容器里获取初始值
            action : '/',                         //表格翻页时触发的action
            loading                                    //表格加载数据状态
        }
        const formOptions = {
            'formOptions': this.getFormOptions()
        };
        return <Panel><SpecificationMgtView item={item} {...tableOptions} {...formOptions} /></Panel>
    }
}

//数据限制类型
specificationMgt.propTypes = {
    loading: React.PropTypes.bool,
    items: React.PropTypes.array.isRequired,
    result: React.PropTypes.object,
}

const mapActionCreators = {

}

const mapStateToProps = (state) => {
  const {result, loading} = state.specificationMgt;
  const {items = []} = {};
  return {items, loading};
}

export default connect(mapStateToProps, mapActionCreators)(specificationMgt)
