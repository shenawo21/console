import React, { PropTypes, Component} from 'react'
import { connect } from 'react-redux'
import ChangeGoods from '../components/GoodsView'
import Panel from 'components/Panel'
import {shopList,chagenDetail,changeVerify,changeEnd} from '../modules/GoodsReducer'
import { message } from 'hen';

class Goods extends Component {
  
    constructor(props) {
        super(props);
        this.getFormOptions = this.getFormOptions.bind(this);            
        this.handleSubmit = this.handleSubmit.bind(this); 
    }
    
    componentDidMount() {  
        const {shopList,chagenDetail,params} = this.props;
        //获取详情信息
        chagenDetail(params);
        // 商品列表
        shopList()
    }
    // 退款详情处理
    handleSubmit(value, key) {
        console.log(this.refs.state)
        const _this = this;
        const {changeVerify,params} = _this.props;
        if (!this.refs.state.numValue) {
            message.error('请输入退货数量')
        }
        if (!this.refs.state.selectItem) {
            message.error('请选择换后商品编码')
        }
        let refundNums = {refundNums:this.refs.state.numValue}
        let changeSkuCode = {changeSkuCode:this.refs.state.selectItem}
        Object.assign(value,params)
        if(key === 'review'){
            Object.assign(value)
            changeVerify(value).then(function(response) {
                    if (response && response.status == 1) {
                        setTimeout(() => {
                            let pathname = '/service/aftersale';
                            _this.context.router.replace(pathname);
                        }, 1000);
                    }
                })
        } 
        //else if(key === 'refuse'){
        //     _this.setState({isRequired:true})
        //     Object.assign(value,{processStatus:'DENY'})
        //     if(value.cwRefuseReason) {
        //         verify(value).then(function(response) {
        //             if (response && response.status == 1) {
        //                 setTimeout(() => {
        //                     let pathname = '/service/aftersale';
        //                     _this.context.router.replace(pathname);
        //                 }, 1000);
        //             }
        //         })
        //     } else {
        //         message.error('请选择拒绝退款原因')
        //     }
        // }
    }
    /**
       * (表单功能配置项)
       * 
       * @returns (description)
       */
      getFormOptions() {
          const _this = this;
          return {
              handleSubmit(value) {
                  const {addPro} = _this.props;
                  let {skuData, categoryId, ...other} = value
                  console.log('categoryCode',categoryId);
                  value = {...skuData, ...other, categoryId : typeof categoryId === 'object' ? categoryId[categoryId.length - 1] :  categoryId}
                  addPro(value).then((res)=>{
                      if(res.status === 1){
                          setTimeout(()=>{history.go(-1)}, 1000)
                      }
                  })
              },

              /**
               * (筛选表单重置)
               */
              handleReset() {
                  //_this.context.router.push('/virtualhouse/storageMgt')
              }
          }
      }
    render() {
        const formOptions = {
            loading, 
            result,
            ...this.getFormOptions()
        }
        const { items, shopList, totalItems, result,loading} = this.props;
        const {query} = location;
        const tableOptions = {
            dataSource : items,                         //加载组件时，表格从容器里获取初始值
            action : shopList,                          //表格翻页时触发的action
            pagination : {                              //表格页码陪着，如果为false，则不展示页码
                total : totalItems,                      //数据总数,
                current : query && query.p ? Number(query.p) : 1
            },  
            loading,                                    //表格加载数据状态        
        }
        let arrResult = [{outerId:result.outerId,title:result.title,price:result.price,goodsNum:result.goodsNum,totalFee:result.totalFee,discountFee:result.discountFee}]
        return <div>
                     <Panel title="商品换货"><ChangeGoods 
                                                arrResult = {arrResult} 
                                                handleSubmit = {this.handleSubmit}
                                                formOptions={formOptions} 
                                                tableOptions={tableOptions}
                                                ref = 'state'/></Panel> 
              </div>                    
                
    }
}
Goods.contextTypes = {
    router: React.PropTypes.object.isRequired,
};
Goods.propTypes = {
    // view: React.PropTypes.func,
    // items: React.PropTypes.array,
    // totalItems: React.PropTypes.number,    
    // loading: React.PropTypes.bool
}

const mapActionCreators = {
    shopList,
    chagenDetail,
    changeVerify,
    changeEnd
}

Goods.contextTypes = {
    router: React.PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    console.log(state,'state')
    const {result,list, loading} = state.changegoods;  
    const {items = [], totalItems = 0} = list || {}; 
    return {items, totalItems, result, loading };    
}

export default connect(mapStateToProps, mapActionCreators)(Goods)

