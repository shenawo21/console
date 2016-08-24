import React, { PropTypes, Component} from 'react'
import { connect } from 'react-redux'
import StorageMgtView from '../components/StorageMgtView'
import Panel from 'components/Panel'
import { storageMgt, getProList } from '../modules/StorageMgtReducer'
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
        const {getProList} = this.props;
        const context = this;

        getProList();
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
        console.log(_this,'this');
        return {
       /**
       * (筛选表单提交)
       *
       * @param value (description)
       */

        handleSubmit(value) {
            const { storageMgt, proListResult } = _this.props;
            console.log(proListResult,'proListResult');
            console.log(value,'value');
            storageMgt({...value})
          },

          /**
           * (重置)表单
           */

          handleReset(){
            _this.context.router.push('/virtualhouse')
          }

        }
    }

    render() {
        const { item } = this.state;
        const {loading, items} = this.props;
        const tableOptions = {
            dataSource : items,                     //加载组件时，表格从容器里获取初始值
            loading                                 //表格加载数据状态
        }
        const formOptions = {
            ...this.getFormOptions()
        };
        return <Panel><StorageMgtView item={item} {...tableOptions} formOptions={formOptions} /></Panel>
    }
}

//数据限制类型
StorageMgt.propTypes = {
    storageMgt: React.PropTypes.func,
    getProList: React.PropTypes.func,
    loading: React.PropTypes.bool,
    items: React.PropTypes.array,
    result: React.PropTypes.object,
}

const mapActionCreators = {
    storageMgt,
    getProList
}

const mapStateToProps = (state) => {
  const {result, proListResult, loading} = state.storageMgt;
  const items = proListResult || [];
  return {result, proListResult, items, loading};
}

StorageMgt.contextTypes = {
    router: React.PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapActionCreators)(StorageMgt)
