import React, { PropTypes, Component} from 'react'
import { connect } from 'react-redux'
import SpecificationMgtView from '../components/SpecificationMgtView'
import Panel from 'components/Panel'
import { getCateList, getSpecByCateList, addSpec, checkIsUsed } from '../modules/SpecificationMgtReducer'
import {message} from 'hen';

class specificationMgt extends Component {

    constructor(props) {
        super(props);
        this.getSpecList = this.getSpecList.bind(this);
    }

     /**
     * 根据商品类目获取属性列表
     * @param  {any} id
     */
    getSpecList(id){
        const context = this;
        const {getSpecByCateList} = context.props;
        getSpecByCateList({categoryCode: id});
    }

    componentDidMount() {
        const {getCateList} = this.props;
        //获取商品类目列表
        getCateList();
    }
      
    render() {
        const {cateListResult, specListResult, getCateList, isLoader, loading, items, checkIsUsed, addSpec, result} = this.props;
        const options = {
            loading,        //表格加载数据状态
            checkIsUsed,    //检查是否可以删除
            addSpec,        //添加规格
            specListResult, //查询规格列表
            getSpecList : this.getSpecList,    //根据栏目id获取规格列表 
            isLoader,        //是否请求数据
            result          //提交返回数据
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
        return <Panel><SpecificationMgtView {...options} cateList={loop(cateListResult)} getCateList={getCateList} /></Panel>
    }
}

//数据限制类型
specificationMgt.propTypes = {
    getCateList: React.PropTypes.func,
    getSpecByCateList: React.PropTypes.func,
    addSpec: React.PropTypes.func,
    checkIsUsed: React.PropTypes.func,
    loading: React.PropTypes.bool,
    items: React.PropTypes.array.isRequired,
    result: React.PropTypes.object,
}
const mapActionCreators = {
    getCateList,
    getSpecByCateList,
    addSpec,
    checkIsUsed
}

const mapStateToProps = (state) => {
  let {cateListResult, specListResult, checkResult, result, loading, isLoader} = state.specificationMgt;
  if(!isLoader){
      specListResult = []
  }
  const {items = []} = {};
  return {cateListResult, specListResult, checkResult, result, isLoader, items, loading};
}

export default connect(mapStateToProps, mapActionCreators)(specificationMgt)
