import React, { PropTypes, Component} from 'react'
import { connect } from 'react-redux'
import CreateProductView from '../components/CreateProductView'
import Panel from 'components/Panel'
import {outCateList, getSpecByCateList, getSpecBySpu, getBrandList, addPro, listView} from '../modules/CreateProductReducer'
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
                  let newArray = []                
                  let {skuData, categoryId, ...other} = value
                  value = {...skuData, ...other, categoryId : categoryId && typeof categoryId === 'object' ? categoryId[categoryId.length - 1] :  categoryId}   
                //从spu选择时，falg为true代表有规格类目，为false代表无规格类目
                /*chooseSpu = true   从SPU中选择   flag == true  有规格和SKU列表  */
                if (_this.refs.view.state.chooseSpu == true) {
                    if (_this.refs.view.state.flag == true) {
                      // 忽略SPU中带出来的SKU列表
                        let oldSku = _this.refs.view.state.selectItem.skuList ? _this.refs.view.state.selectItem.skuList : ''
                        let newSku = value.skuList ? value.skuList : ''
                        newSku && newSku.forEach((val, num) => {
                            !val.specOneValue && delete newSku[num].specOneValue
                            !val.specTwoValue && delete newSku[num].specTwoValue
                            !val.specThreeValue && delete newSku[num].specThreeValue
                            !val.specFourValue && delete newSku[num].specFourValue
                            oldSku.every((item,index) => {
                                if(val.specOneValue == item.specOneValue && val.specTwoValue == item.specTwoValue && val.specThreeValue == item.specThreeValue && val.specFourValue == item.specFourValue){
                                    return false 
                                }
                                val.assignedStock = val.assignedStock
                                newArray[index] = {...val}
                                return true
                            })
                        })
                        value.skuList = newArray   //过滤后新的SKU列表
                        if (newArray && newArray.length > 0) {
                            if (value.advicePrice && value.advicePrice !== 0 ) {
                                if (value.advicePrice > value.marketPrice) {
                                        message.error('市场价必须大于或等于销售价！')
                                    } else {
                                        addPro(value).then((res)=>{
                                            if(res.status === 1){
                                                setTimeout(() => {
                                                    let pathname = '/virtualhouse/storageMgt';
                                                    _this.context.router.replace(pathname);
                                                }, 1000);
                                            }
                                        })
                                    }
                            } 
                        } else {
                            message.error('商品规格不能为空！')
                        }
                    } else {
                        message.error('商品规格为空，无法提交！')
                    }
                }
                
                
                // 选择商品类目时提交
                /*chooseMenu = true   从商品类目中选择   hasSpec == true  有规格 */
                if (_this.refs.view.state.chooseMenu == true ) {
                    if (_this.refs.view.state.hasSpec == true) {
                        if (value.skuList && value.skuList.length > 0) {
                            if (value.advicePrice && value.advicePrice !== 0 ) {
                                if (value.advicePrice > value.marketPrice) {
                                        message.error('市场价必须大于或等于销售价！')
                                    } else {
                                        addPro(value).then((res)=>{
                                            if(res.status === 1){
                                                setTimeout(() => {
                                                    let pathname = '/virtualhouse/storageMgt';
                                                    _this.context.router.replace(pathname);
                                                }, 1000);
                                            }
                                        })
                                    }
                            }
                        } else {
                            message.error('SKU列表不能为空！')
                        }
                    } else {
                        addPro(value).then((res)=>{
                            if(res.status === 1){
                                setTimeout(() => {
                                    let pathname = '/virtualhouse/storageMgt';
                                    _this.context.router.replace(pathname);
                                }, 1000);
                            }
                        })
                    }
                } else if (_this.refs.view.state.chooseSpu == false && _this.refs.view.state.chooseMenu == false) {
                     message.error('请选择商品类目！')
                }
                
                
                //   // 忽略SPU中带出来的SKU列表
                //   let oldSku = _this.refs.view.state.selectItem.skuList ? _this.refs.view.state.selectItem.skuList : ''
                //   let newSku = value.skuList ? value.skuList : ''
                //   newSku && newSku.forEach((val, num) => {
                //     !val.specOneValue && delete newSku[num].specOneValue
                //     !val.specTwoValue && delete newSku[num].specTwoValue
                //     !val.specThreeValue && delete newSku[num].specThreeValue
                //     !val.specFourValue && delete newSku[num].specFourValue
                //     oldSku.every((item,index) => {
                //         if(val.specOneValue == item.specOneValue && val.specTwoValue == item.specTwoValue && val.specThreeValue == item.specThreeValue && val.specFourValue == item.specFourValue){
                //             return false 
                //         }
                //         val.assignedStock = 'undefined' ? 0 : val.assignedStock
                //         newArray[index] = {...val}
                //         return true
                //     })
                // })
                // value.skuList = newArray   //过滤后新的SKU列表

                //    if (_this.refs.view.state.flag == true) {
                //        if(value.categoryId && value.categoryId.length > 0 ) { 
                //            if(_this.refs.view.state.hasSpec == true) {
                //                 if (value.skuList && value.skuList.length > 0) {
                //                         if (value.advicePrice && value.advicePrice !== 0 ) {
                //                             if (value.advicePrice > value.marketPrice) {
                //                                     message.error('市场价必须大于或等于销售价！')
                //                                 } else {
                //                                     addPro(value).then((res)=>{
                //                                         if(res.status === 1){
                //                                             setTimeout(() => {
                //                                                 let pathname = '/virtualhouse/storageMgt';
                //                                                 _this.context.router.replace(pathname);
                //                                             }, 1000);
                //                                         }
                //                                     })
                //                                 }
                //                         } else {
                //                             message.error('SKU列表不能为空！')
                //                         }
                //                     } else {
                //                         message.error('商品规格不能为空！')
                //                     }
                //             } else {
                //                 if (value.advicePrice > value.marketPrice) {
                //                         message.error('市场价必须大于或等于销售价！')
                //                     } else {
                //                         addPro(value).then((res)=>{
                //                             if(res.status === 1){
                //                                 setTimeout(() => {
                //                                     let pathname = '/virtualhouse/storageMgt';
                //                                     _this.context.router.replace(pathname);
                //                                 }, 1000);
                //                             }
                //                         })
                //                  }
                //             }
                //        } else {
                //            message.error('请选择商品类目！')
                //        }
                //    } else {
                //        message.error('商品规格为空，无法提交！')
                //    }
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
        const {cateResult, brandResult, items, listView, totalItems, loading, result, specListResult, getSpecByCateList, getSpecBySpu, location} = this.props;
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
                            getSpecByCateList={getSpecByCateList}
                            getSpecBySpu={getSpecBySpu}
                            ref = 'view'
                             /></Panel>
    }
}


CreateProduct.propTypes = {    
    outCateList: React.PropTypes.func,
    getSpecByCateList: React.PropTypes.func,
    getSpecBySpu: React.PropTypes.func,
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
    getSpecBySpu,
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

