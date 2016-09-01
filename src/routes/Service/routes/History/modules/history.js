// 订单退款/退货列表
const REQ_REFUND = 'REQ_REFUND';
const SUC_REFUND = 'SUC_REFUND';
const ERR_REFUND = 'ERR_REFUND';

// 店铺列表
const REQ_SHOPLIST = 'REQ_SHOPLIST';
const SUC_SHOPLIST = 'SUC_SHOPLIST';
const ERR_SHOPLIST = 'ERR_SHOPLIST';


export function getHistory(params) {
  return {
    types: [REQ_REFUND, SUC_REFUND, ERR_REFUND],
    promise: (client) => client.post('api-warehouseDispose.getHistoryRefundApplys', params)
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
