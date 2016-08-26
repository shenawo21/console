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
            params: {},   //表格需要的筛选参数
            selectItem: {}
        }
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
        const { outCateList, listView, getBrandList } = this.props;
	
	    //获取分类列表
        outCateList();

        //获取已有SPU列表
        listView();

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
                  const {addPro, listView} = _this.props;
                  _this.setState({
                      params: value
                  })
                  
                  addPro({...value})
              },

              /**
               * (筛选表单重置)
               */
              handleReset() {
                  _this.context.router.push('/virtualhouse/storageMgt')
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
              },

              /**
               * (筛选表单重置)
               */
              handleReset() {
                  
              },

              /**
               * 勾选数据后设置item
               */
              handleItem() {

              }
          }
      }
      
    //勾选
    handleRowSelection() {
        return {
            onSelect : (record, selected, selectedRows) => {
                //只能选择一条商品信息
                if(selectedRows.length > 1){
                    message.warning('只能选择一条商品', 8);
                    return
                }else{
                    this.setState({
                        selectItem: selectedRows[0]
                    })
                }               
                
            },
            onSelectAll : (selected, selectedRows, changeRows) => {
                console.log(selected, selectedRows, changeRows);
            },
        }
    }
    
    render() {
        const {params, selectItem} = this.state; 
        const {cateResult, brandResult, items, listView, totalItems, loading, result} = this.props;
        const tableOptions = {
            dataSource : items,                         //加载组件时，表格从容器里获取初始值
            action : listView,                          //表格翻页时触发的action
            pagination : {                              //表格页码陪着，如果为false，则不展示页码
                total : totalItems                      //数据总数
            },  
            loading,                                    //表格加载数据状态
            params,                                     //表格检索数据参数           
            rowSelection : this.handleRowSelection()    //需要checkbox时填写
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
        
        return <Panel title=""><CreateProductView selectItem={selectItem} formOptions={formOptions} tableFormOptions={tableFormOptions} tableOptions={tableOptions} cateList={loop(cateResult)} brandList={brandLoop(brandResult)} /></Panel>
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
    const {result, cateResult, specListResult, brandResult, listViewResult, loading} = state.createProduct;
    const {items = [], totalItems = 0} = listViewResult || {};
    return { result, cateResult, specListResult, brandResult, items, totalItems, loading };    
}

export default connect(mapStateToProps, mapActionCreators)(CreateProduct)

