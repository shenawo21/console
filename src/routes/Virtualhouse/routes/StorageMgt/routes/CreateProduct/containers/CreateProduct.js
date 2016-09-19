import React, { PropTypes, Component} from 'react'
import { connect } from 'react-redux'
import CreateProductView from '../components/CreateProductView'
import Panel from 'components/Panel'
import {outCateList, getSpecByCateList, getBrandList, addPro, listView} from '../modules/CreateProductReducer'
import {message} from 'hen'

class CreateProduct extends Component {
  
    constructor(props) {
        super(props);
        
        this.getFormOptions = this.getFormOptions.bind(this);       
        this.tablegetFormOptions = this.tablegetFormOptions.bind(this);
        this.state = {
            params: {}   //表格需要的筛选参数
        }
    }
    
    componentDidMount() {
        const { outCateList, getBrandList } = this.props;
	
	    //获取分类列表
        outCateList();

        //获取品牌列表
        getBrandList();
	
    }
    
      /**
       * (表单功能配置项)
       * 
       * @returns (description)
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
                  const {addPro} = _this.props;
                  let {skuData, categoryId, ...other} = value
                  value = {...skuData, ...other, categoryId : categoryId && typeof categoryId === 'object' ? categoryId[categoryId.length - 1] :  categoryId}
                  if (value.categoryId) {
                      if (value.advicePrice && value.total) {
                          if (value.advicePrice > value.marketPrice) {
                                message.error('市场价必须大于或等于销售价！')
                            } else {
                                addPro(value).then((res)=>{
                                    if(res.status === 1){
                                        setTimeout(()=>{history.go(-1)}, 1000)
                                    }
                                })
                            }
                      } else {
                          message.error('请填写SKU表！')
                      }
                  } else {
                      message.error('请选择类目！')
                  }
                  
                  
              },

              /**
               * (筛选表单重置)
               */
              handleReset() {
                 
              }
          }
      }

    /**
       * (表格功能配置项)
       * 
       * @returns (description)
       */
      tablegetFormOptions() {
          const _this = this;
          return {
              /**
               * (筛选表单提交)
               * 
               * @param value (description)
               */
              handleSubmit(value) {
                  _this.setState({
                      params: value
                  })
              }
          }
      }
      
    
    render() {
        const {params} = this.state; 
        const {cateResult, brandResult, items, listView, totalItems, loading, result, specListResult, getSpecByCateList, location} = this.props;
        const {query} = location;

        const tableOptions = {
            dataSource : items,                         //加载组件时，表格从容器里获取初始值
            action : listView,                          //表格翻页时触发的action
            pagination : {                              //表格页码陪着，如果为false，则不展示页码
                total : totalItems,                      //数据总数,
                current : query && query.p ? Number(query.p) : 1
            },  
            loading,                                    //表格加载数据状态
            params                                      //表格检索数据参数           
        }
        const formOptions = {
            loading, 
            result,
            ...this.getFormOptions()
        }
        const tableFormOptions = {
            ...this.tablegetFormOptions()
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

        /**
         * 品牌列表
         * @param lists
         * @returns {*}
         */
        const brandLoop = (lists) => {
            return lists && lists.map(a => {
                return {
                    value: a.brandId,
                    title: a.name
                }
            })
        }
        
        return <Panel title=""><CreateProductView 
                            formOptions={formOptions} 
                            tableFormOptions={tableFormOptions} 
                            tableOptions={tableOptions} 
                            cateList={loop(cateResult)} 
                            brandList={brandLoop(brandResult)}
                            specListResult = {specListResult}
                            getSpecByCateList={getSpecByCateList} /></Panel>
    }
}


CreateProduct.propTypes = {    
    outCateList: React.PropTypes.func,
    getSpecByCateList: React.PropTypes.func,
    getBrandList: React.PropTypes.func,
    addPro : React.PropTypes.func,
    listView: React.PropTypes.func,
    items: React.PropTypes.array.isRequired,
    totalItems: React.PropTypes.number.isRequired,
    result: React.PropTypes.object,
    loading: React.PropTypes.bool
}

const mapActionCreators = {
    outCateList,
    getSpecByCateList,
    getBrandList,
    addPro,
    listView
}

CreateProduct.contextTypes = {
    router: React.PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    let {result, cateResult, specListResult, brandResult, listViewResult, loading} = state.createProduct;
    const {items = [], totalItems = 0} = listViewResult || {};
    return { result, cateResult, specListResult, brandResult, items, totalItems, loading };    
}

export default connect(mapStateToProps, mapActionCreators)(CreateProduct)

