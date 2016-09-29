import React, { PropTypes, Component} from 'react'
import { connect } from 'react-redux'
import ChangeGoods from '../components/GoodsView'
import Panel from 'components/Panel'
import {shopList,chagenDetail,changeVerify,changeEnd,Logistic} from '../modules/GoodsReducer'
import { message } from 'hen';

class Goods extends Component {
  
    constructor(props) {
        super(props);
        this.getFormOptions = this.getFormOptions.bind(this);            
        this.handleSubmit = this.handleSubmit.bind(this); 
    }
    
    componentDidMount() {  
        const {shopList,chagenDetail,Logistic,params} = this.props;
        //获取详情信息
        chagenDetail({oid:params.oid});

        // 物流列表
        Logistic()
    }
    // 换货处理
    handleSubmit(value, key, form) {
        const _this = this;
        const {changeVerify,params} = _this.props;
        let newValue = _this.refs.state.state
        let newTable = _this.refs.state.props.arrResult
        if(key === 'review'){
            if (!newValue.numValue) {
                message.error('请输入退货数量')
            }
            if (!newValue.selectItem) {
                message.error('请选择换后商品编码')
            }
            let goodsNum = {goodsNum:newValue.numValue}
            let changeSkuCode = {changeSkuCode:newValue.selectItem.spuId}
            let changeSkuName = {changeSkuName:newValue.selectItem.title}
            
            Object.assign(value,params,goodsNum,changeSkuCode,changeSkuName,newTable[0])
            delete value._index
            delete value.discountFee
            delete value.outerId
            changeVerify(value).then(function(response) {
                    if (response && response.status == 1) {
                        setTimeout(() => {
                            let pathname = '/service/aftersale';
                            _this.context.router.replace(pathname);
                        }, 1000);
                    }
                })
        } 
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
        const { items, shopList, totalItems,logistic, result,loading,location} = this.props;
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
        let arrResult = [{
                tid:result.tid,
                oid:result.oid,
                outerSkuId:result.outerSkuId,
                title:result.title,
                price:result.price,
                totalFee:result.totalFee,
                discountFee:result.discountFee
            }]
        /*** 物流列表**/
        let logisticList = [];
        if (logistic.length) {
            logisticList = logistic && logistic.map(c=> {
            return {
                value: c.companyCode,
                title: c.companyName
           }
        });
        } else {
            logisticList = [{
                value: null,
                title: '正在加载中...'
            }]
        }    
        return <div>
                     <Panel title="商品换货"><ChangeGoods 
                                                arrResult = {arrResult} 
                                                handleSubmit = {this.handleSubmit}
                                                formOptions={formOptions} 
                                                tableOptions={tableOptions}
                                                logisticList = {logisticList}
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
    changeEnd,
    Logistic
}

const mapStateToProps = (state) => {
    const {result,list,logistic = [], loading} = state.changegoods;  
    const {items = [], totalItems = 0} = list || {}; 
    return {items,totalItems, result,logistic,loading };    
}

export default connect(mapStateToProps, mapActionCreators)(Goods)

