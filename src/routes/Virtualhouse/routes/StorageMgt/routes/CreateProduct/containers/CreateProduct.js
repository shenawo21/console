import React, { PropTypes, Component} from 'react'
import { connect } from 'react-redux'
import CreateProductView from '../components/CreateProductView'
import Panel from 'components/Panel'
import {outCateList, getSpecByCateList, getSpecBySpu, addPro, listView} from '../modules/CreateProductReducer'
import {message} from 'hen'

class CreateProduct extends Component {
  
    constructor(props) {
        super(props);
        
        this.getFormOptions = this.getFormOptions.bind(this);       
        this.tablegetFormOptions = this.tablegetFormOptions.bind(this);
        this.state = {
            params: {},   //表格需要的筛选参数,
            id : ''
        }
    }
    
    componentDidMount() {
        const { outCateList,params } = this.props;
        params.id && this.setState({id : params.id})
	    //获取分类列表
        outCateList();

	
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
                const {params, editSkuInfo, detailResult} = _this.props;
                let {skuData, categoryId, ...other} = value
                //构造商品类目值
                value = {...skuData, ...other, categoryId : categoryId && typeof categoryId === 'object' ? categoryId[categoryId.length - 1] :  categoryId}  
                //设置富文本框值
                // value.detail = tinyMCE.activeEditor && tinyMCE.activeEditor.getContent()
                //设置图片
                // value.thumbImage = (typeof _this.state.photoList.imgs) === 'string' ? _this.state.photoList.imgs : '';
                
                //清理sku因为校验商家编码产生的多余字段
                var newData = {}
                for (var i in value) {
                    if(!/erpSku|whouseSno/.test(i)) {
                        newData[i] = value[i]
                    }
                }
                //判断品牌
                // if (!newData.brandId) {
                //     return message.error('商品品牌不能为空！')
                // }
                //建议区间价判断
                // if(!newData.resellMinPrice || !newData.resellMaxPrice){
                //     return message.error('建议零售价区间不能为空！')
                // }else{
                //     if(newData.resellMinPrice > newData.resellMaxPrice){
                //         return message.error('建议零售价区间最小值不能大于最大值！', 2)
                //     }
                // }
                //从spu选择时，falg为true代表有规格类目，为false代表无规格类目
                /*chooseSpu = true   从SPU中选择   flag == true  有规格和SKU表  */

                // if(params.id){ //编辑商品
                //     const {enterpriseCode} = detailResult;
                //     newData = {...newData, enterpriseCode}
                //     if(_this.checkSkuListVail(newData)){
                //         editSkuInfo(newData).then(res => {
                //             res.status === 1 && setTimeout(() => {
                //                 let pathname = '/virtualhouse';
                //                 _this.context.router.replace(pathname);
                //             }, 1000);
                //         })
                //     }   
                // }else{ //新增商品
                    
                // } 
                let newSku = newData.skuList ? newData.skuList : [], oldSku = [];
                    if(_this.refs.view.state.chooseSpu == true){//从spu选择，进行新增商品
                        if (_this.refs.view.state.flag == true){//
                            // 忽略SPU中带出来的SKU表
                            let oldSku = _this.refs.view.state.selectItem.skuList ? _this.refs.view.state.selectItem.skuList : []
                            oldSku.length && oldSku.forEach((item, index)=>{
                                let curIndex = '';
                                if(newSku){
                                    newSku.every((val, num) => {
                                        !val.specOneValue && delete newSku[num].specOneValue
                                        !val.specTwoValue && delete newSku[num].specTwoValue
                                        !val.specThreeValue && delete newSku[num].specThreeValue
                                        !val.specFourValue && delete newSku[num].specFourValue
                                        if(val.specOneValue == item.specOneValue && val.specTwoValue == item.specTwoValue && val.specThreeValue == item.specThreeValue && val.specFourValue == item.specFourValue){
                                            curIndex = num
                                            return false;
                                        }
                                        return true
                                    })
                                    if(curIndex !== ''){
                                        newSku.splice(curIndex,1)
                                    }
                                }
                            })
                            //过滤后新的SKU表
                            newData.skuList = newSku   
                        }else {
                            return message.error('商品规格不能为空！')
                        }
                    }
                    if (newSku && newSku.length > 0) {
                        return _this.addProduct(newData)
                    } else {
                        return message.error( oldSku.length ? '商品规格不能为空！' : 'SKU表数据不能为空！')
                    }
              }

            //   handleSubmit(value) {
            //       const {addPro} = _this.props;
            //       let newArray = []                
            //       let {skuData, categoryId, ...other} = value
            //       value = {...skuData, ...other, categoryId : categoryId && typeof categoryId === 'object' ? categoryId[categoryId.length - 1] :  categoryId}   
            //     //从spu选择时，falg为true代表有规格类目，为false代表无规格类目
            //     /*chooseSpu = true   从SPU中选择   flag == true  有规格和SKU列表  */
            //     if (_this.refs.view.state.chooseSpu == true) {
            //         if (_this.refs.view.state.flag == true) {
            //           // 忽略SPU中带出来的SKU列表
            //             let oldSku = _this.refs.view.state.selectItem.skuList ? _this.refs.view.state.selectItem.skuList : ''
            //             let newSku = value.skuList ? value.skuList : ''
            //             newSku && newSku.forEach((val, num) => {
            //                 !val.specOneValue && delete newSku[num].specOneValue
            //                 !val.specTwoValue && delete newSku[num].specTwoValue
            //                 !val.specThreeValue && delete newSku[num].specThreeValue
            //                 !val.specFourValue && delete newSku[num].specFourValue
            //                 oldSku.every((item,index) => {
            //                     if(val.specOneValue == item.specOneValue && val.specTwoValue == item.specTwoValue && val.specThreeValue == item.specThreeValue && val.specFourValue == item.specFourValue){
            //                         return false 
            //                     }
            //                     val.assignedStock = val.assignedStock
            //                     newArray[index] = {...val}
            //                     return true
            //                 })
            //             })
            //             value.skuList = newArray   //过滤后新的SKU列表

            //             if (newArray && newArray.length > 0) {
            //                 if (value.advicePrice && value.advicePrice !== 0 ) {
            //                     if (value.advicePrice > value.marketPrice) {
            //                             message.error('市场价必须大于或等于销售价！')
            //                         } else {
            //                             //value.skuList 循环对比市场价
            //                             let  list = value.skuList, isTrue = false;
            //                             list && list.every(i => {
            //                                 if(i.price > value.marketPrice) {
            //                                     message.error('市场价必须大于或等于销售价！')
            //                                     isTrue = true;
            //                                     return false;
            //                                 }
            //                                 isTrue = false;
            //                                 return true;
            //                             })
            //                             if(isTrue) return;
            //                             addPro(value).then((res)=>{
            //                                 if(res.status === 1){
            //                                     setTimeout(() => {
            //                                         let pathname = '/virtualhouse/storageMgt';
            //                                         _this.context.router.replace(pathname);
            //                                     }, 1000);
            //                                 }
            //                             })
            //                         }
            //                 } 
            //             } else {
            //                 message.error('商品规格不能为空！')
            //             }
            //         } else {
            //             message.error('商品规格为空，无法提交！')
            //         }
            //     }
                
                
            //     // 选择商品类目时提交
            //     /*chooseMenu = true   从商品类目中选择   hasSpec == true  有规格 */
            //     if (_this.refs.view.state.chooseMenu == true ) {
            //             if (_this.refs.view.state.hasSpec == true) {
            //                 if (value.skuList && value.skuList.length > 0) {
            //                     if (value.advicePrice && value.advicePrice !== 0 ) {
            //                         if (value.advicePrice > value.marketPrice) {
            //                             message.error('市场价必须大于或等于销售价！')
            //                             return
            //                         } else {
            //                             //value.skuList 循环对比市场价
            //                             let  list = value.skuList, isTrue = false;
            //                             list && list.every(i => {
            //                                 if(i.price > value.marketPrice) {
            //                                     message.error('市场价必须大于或等于销售价！')
            //                                     isTrue = true;
            //                                     return false;
            //                                 }
            //                                 isTrue = false;
            //                                 return true;
            //                             })
            //                             if(isTrue) return;
            //                             addPro(value).then((res)=>{
            //                                 if(res.status === 1){
            //                                     setTimeout(() => {
            //                                         let pathname = '/virtualhouse/storageMgt';
            //                                         _this.context.router.replace(pathname);
            //                                     }, 1000);
            //                                 }
            //                             })
                                       
            //                         }
            //                     }
                                
            //                 } else {
            //                     message.error('SKU列表不能为空！')
            //                 }
            //             } else {
            //                 addPro(value).then((res)=>{
            //                     if(res.status === 1){
            //                         setTimeout(() => {
            //                             let pathname = '/virtualhouse/storageMgt';
            //                             _this.context.router.replace(pathname);
            //                         }, 1000);
            //                     }
            //                 })
            //             }
            //         } else if (_this.refs.view.state.chooseSpu == false && _this.refs.view.state.chooseMenu == false) {
            //             message.error('请选择商品类目！')
            //         }
            //     // if (value.brandId) {
                    
            //     // } else {
            //     //     message.error('商品品牌不能为空！')
            //     // } 
            //   }
          }
      }
      /**
     * 添加商品
     * 
     * @param {any} newData 重新组装提交的数据
     * 
     * @memberOf CreateProduct
     */
    addProduct(newData){
        const {addPro} = this.props;
        console.log(newData,'999999')
        if (newData.advicePrice) {//spu的采购价
            if (newData.advicePrice > newData.marketPrice) {
                message.error('销售价不能大于市场价！')
            } else if(this.checkSkuListVail(newData)){  //添加时，检查SKU表必填字段
                addPro(newData).then((res)=>{
                    res.status === 1 && setTimeout(() => {
                        let pathname = '/virtualhouse/storageMgt';
                        this.context.router.replace(pathname);
                    }, 1000);
                })
            }
        }else{
            message.error('销售价不能为空！')
        }
    }
    /**
     * 检查sku列表数据有效性
     * 
     * @param {any} newData 重新组装提交的数据
     * @returns
     * 
     * @memberOf CreateProduct
     */
    checkSkuListVail(newData){
        const {id} = this.state
        let isTrue = false;
        newData.skuList && newData.skuList.every(i => {
            if(i.stock == '' && !id){
                message.error('SKU表中库存不能为空！')
                isTrue = false
                return false;
            }
            isTrue = true;
            return true;
        })
        return isTrue;
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
        const {params,id} = this.state; 
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

        return <Panel title=""><CreateProductView 
                            id = {id}
                            formOptions={formOptions} 
                            tableFormOptions={tableFormOptions} 
                            tableOptions={tableOptions} 
                            cateList={loop(cateResult)} 
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

