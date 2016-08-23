import React, { PropTypes, Component} from 'react'
import { connect } from 'react-redux'
import CreateProductView from '../components/CreateProductView'
import Panel from 'components/Panel'
import {outCateList, getAttrList, getBrandList, addPro} from '../modules/CreateProductReducer'

class CreateProduct extends Component {
  
    constructor(props) {
        super(props);
        
        this.getFormOptions = this.getFormOptions.bind(this);
        
        
        this.state = {
            params: {}   //表格需要的筛选参数
        }
    }
    
    componentDidMount() {
        const { outCateList } = this.props;
	
	//获取分类列表
        outCateList();
	
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
                  const {addPro} = context.props;
                  context.setState({
                      params: value
                  })
                  addPro({value})
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
        
           const {cateResult, loading, result} = this.props;
           const formOptions = {
              loading, 
              result,
              'formOptions' : this.getFormOptions()
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
        
        return <Panel title=""><CreateProductView formOptions={formOptions} cateList={loop(cateResult)} /></Panel>
    }
}


CreateProduct.propTypes = {   
    
    outCateList: React.PropTypes.func,
    deleteItem: React.PropTypes.func,
    modifyItem: React.PropTypes.func,
    addItem : React.PropTypes.func,
    result: React.PropTypes.object,
    loading: React.PropTypes.bool
}

const mapActionCreators = {
    outCateList,
    getAttrList,
    getBrandList,
    addPro
}


const mapStateToProps = (state) => {
    const {result, cateResult, attrResult, brandResult, loading} = state.createProduct;
    
    return { result, cateResult, attrResult, brandResult, loading };
    
}

export default connect(mapStateToProps, mapActionCreators)(CreateProduct)

