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
// 查询需要换货订单
const REQ_SEARCH = 'REQ_SEARCH';
const SUC_SEARCH = 'SUC_SEARCH';
const ERR_SEARCH = 'ERR_SEARCH';

// 结束/拒绝退款
const REQ_ENDREFUND = 'REQ_ENDREFUND';
const SUC_ENDREFUND = 'SUC_ENDREFUND';
const ERR_ENDREFUND = 'ERR_ENDREFUND';

// 换货出库
const REQ_OUT = 'REQ_OUT';
const SUC_OUT = 'SUC_OUT';
const ERR_OUT = 'ERR_OUT';

export function getRefund(params) {
  if (params.pageNumber) {
      params = {
          type: params.type,
          condition: {
              pageNumber: params.pageNumber,
              pageSize: params.pageSize,
              ...params.condition
          }
      }
  }  
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
export function getSearch(params) {
    return {
        types: [REQ_SEARCH, SUC_SEARCH, ERR_SEARCH],
        promise: (client) => client.post('api-offSale.getChangeGoodsOrder',params)
    }
}
export function getEndRefund(params) {
    return {
        types: [REQ_ENDREFUND, SUC_ENDREFUND, ERR_ENDREFUND],
        promise: (client) => client.post('api-offSale.doEndRefund',params)
    }
}
export function getOut(params) {
    return {
        types: [REQ_OUT, SUC_OUT, ERR_OUT],
        promise: (client) => client.post('api-warehouseDispose.doSendGoodsOfChange',params)
    }
}
export default function reducer(state = {result:{}}, action) {
  state = {...state, loading : action.loading};
  switch (action.type) {    
    case REQ_REFUND:
        return {
            ...state,
            loading: true
        }    
    case SUC_REFUND:
        return {
            ...state,
            result: action.result,
            loading: false
        }
    case ERR_REFUND:
        return {
            ...state,
            loading: false
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

    case REQ_SEARCH:
        return {
            ...state
        }    
    case SUC_SEARCH:
        return {
            ...state,
            searchlist: action.result
        }
    case ERR_SEARCH:
        return {
            ...state
        }

     case REQ_ENDREFUND:
        return {
            ...state
        }    
    case SUC_ENDREFUND:
        return {
            ...state
        }
    case ERR_ENDREFUND:
        return {
            ...state
        }
     case REQ_OUT:
        return {
            ...state
        }    
    case SUC_OUT:
        return {
            ...state
        }
    case ERR_OUT:
        return {
            ...state
        }          
    default:
      return state
  }
}
