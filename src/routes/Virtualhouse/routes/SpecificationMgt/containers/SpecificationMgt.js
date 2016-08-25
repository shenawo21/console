import React, { PropTypes, Component} from 'react'
import { connect } from 'react-redux'
import SpecificationMgtView from '../components/SpecificationMgtView'
import Panel from 'components/Panel'
import { getCateList, getSpecByCateList, addSpec } from '../modules/SpecificationMgtReducer'
import {message} from 'hen';

class specificationMgt extends Component {

    constructor(props) {
        super(props);
        this.getFormOptions = this.getFormOptions.bind(this);
        this.specList = this._getSpecByCateList.bind(this);
        this.state = {
            item: {},
            specList: []
        };  //定义初始状态
    }

     /**
     * 根据商品类目获取属性列表
     * @param  {any} id
     */
    _getSpecByCateList(id){
        const context = this;
        const {getSpecByCateList, specListResult} = context.props;
        getSpecByCateList({categoryCode: id});
        context.setState({
            specList: specListResult
        });
    }

    componentDidMount() {
        const {params, getCateList} = this.props;
        
        const context = this;
        //获取商品类目列表
        getCateList();
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
        const { item, specList } = this.state;
        const {cateListResult, specListResult, isLoader, loading, items} = this.props;
        const tableOptions = {
            dataSource : items,                         //加载组件时，表格从容器里获取初始值
            loading                                    //表格加载数据状态
        }
        /**
         * 类目列表
         * @param lists
         * @returns {*}
         */
        const loop = (lists) => {
            return lists && lists.map(a => {
                let children = a.level < 3 ? loop(a.children) : '';

                if (children) {
                    return {
                        value: a.categoryCode + '',
                        label: a.name,
                        children
                    }
                } else {
                    return {
                        value: a.categoryCode + '',
                        label: a.name
                    }
                }
            })
        }
        const formOptions = {
            'formOptions': this.getFormOptions()
        }
        return <Panel><SpecificationMgtView item={item} {...tableOptions} {...formOptions} cateList={loop(cateListResult)} getSpecList={this.specList} specList={specList} specListResult={specListResult} isLoader={isLoader} /></Panel>
    }
}

//数据限制类型
specificationMgt.propTypes = {
    getCateList: React.PropTypes.func,
    getSpecByCateList: React.PropTypes.func,
    addSpec: React.PropTypes.func,
    loading: React.PropTypes.bool,
    items: React.PropTypes.array.isRequired,
    result: React.PropTypes.object,
}
const mapActionCreators = {
    getCateList,
    getSpecByCateList,
    addSpec
}
const mapStateToProps = (state) => {
  let {cateListResult, specListResult, result, loading, isLoader} = state.specificationMgt;
  if(!isLoader){
      specListResult = []
  }
  const {items = []} = {};
  return {cateListResult, specListResult, result, isLoader, items, loading};
}

export default connect(mapStateToProps, mapActionCreators)(specificationMgt)
