// 订单退款/退货列表
const REQ_REFUND = 'REQ_REFUND';
const SUC_REFUND = 'SUC_REFUND';
const ERR_REFUND = 'ERR_REFUND';
// 订单换货列表
const REQ_CHANGEGOODS = 'REQ_CHANGEGOODS';
const SUC_CHANGEGOODS = 'SUC_CHANGEGOODS';
const ERR_CHANGEGOODS = 'ERR_CHANGEGOODS';
// 店铺列表
const REQ_SHOPLIST = 'REQ_SHOPLIST';
const SUC_SHOPLIST = 'SUC_SHOPLIST';
const ERR_SHOPLIST = 'ERR_SHOPLIST';


export function getRefund(params) {
  return {
    types: [REQ_REFUND, SUC_REFUND, ERR_REFUND],
    promise: (client) => client.post('api-offSale.getRefundApplysByCondition', params)
  }
}
export function getChangeGoods(params) {
  return {
    types: [REQ_CHANGEGOODS, SUC_CHANGEGOODS, ERR_CHANGEGOODS],
    promise: (client) => client.post('api-offSale.getChangeGoodsOrder', params)
  }
}
export function getShopList() {
    return {
        types: [REQ_SHOPLIST, SUC_SHOPLIST, ERR_SHOPLIST],
        promise: (client) => client.post('api-shop.listEnterpriseShop')
    }
}
export default function reducer(state = {result:{}}, action) {
  state = {...state, loading : action.loading};
  switch (action.type) {    
    case REQ_REFUND:
        return {
            ...state
        }    
    case SUC_REFUND:
        return {
            ...state,
            result: action.result
        }
    case ERR_REFUND:
        return {
            ...state
        }
   case REQ_CHANGEGOODS:
        return {
            ...state
        }    
    case SUC_CHANGEGOODS:
        return {
            ...state,
            changegoodsList: action.result
        }
    case ERR_CHANGEGOODS:
        return {
            ...state
        }

   case REQ_SHOPLIST:
        return {
            ...state
        }    
    case SUC_SHOPLIST:
        return {
            ...state,
            shoplist: action.result
        }
    case ERR_SHOPLIST:
        return {
            ...state
        }
    default:
      return state
  }
}
