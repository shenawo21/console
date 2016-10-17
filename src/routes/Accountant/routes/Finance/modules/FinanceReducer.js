// 退款(待处理)
const FORREFUND = 'accountant/FORREFUND';
const FORREFUND_SUCCESS = 'accountant/FORREFUND_SUCCESS';
const FORREFUND_FAILURE = 'accountant/FORREFUND_FAILURE';

// 退款(待处理)
const REFUND = 'accountant/REFUND';
const REFUND_SUCCESS = 'accountant/REFUND_SUCCESS';
const REFUND_FAILURE = 'accountant/REFUND_FAILURE';

// 获取店铺列表
const SHOPLIST = 'accountant/SHOPLIST';
const SHOPLIST_SUCCESS = 'accountant/SHOPLIST_SUCCESS';
const SHOPLIST_FAILURE = 'accountant/SHOPLIST_FAILURE';


/**
 * 获取待退款列表
 * 
 * @export
 * @param params (description)
 * @returns (description)
 */
export function getForRefund(params) {
  return {
    types: [FORREFUND, FORREFUND_SUCCESS, FORREFUND_FAILURE],
    promise: (client) => client.post('api-offSale.getNotRefundApplys', params)
  }
}

/**
 * 获取已退款列表
 * 
 * @export
 * @param params (description)
 * @returns (description)
 */
export function getRefund(params) {
  return {
    types: [REFUND, REFUND_SUCCESS, REFUND_FAILURE],
    promise: (client) => client.post('api-offSale.getRefundedApplys', params)
  }
}

/**
 * 获取店铺列表
 * 
 * @export
 * @param params (description)
 * @returns (description)
 */
export function getShopList() {
    return {
        types: [SHOPLIST, SHOPLIST_SUCCESS, SHOPLIST_FAILURE],
        promise: (client) => client.post('api-shop.listEnterpriseShop')
    }
}

export default function reducer(state = {result:{}}, action) {
  state = {...state, loading : action.loading};
  switch (action.type) {    
    case FORREFUND:
    case REFUND:
    case SHOPLIST:
        return {
            ...state
        }    
    case FORREFUND_SUCCESS:
        return {
            ...state,
            result: action.result
        }
    case FORREFUND_FAILURE:
        return {
            ...state
        }
    case REFUND_SUCCESS:
        return {
            ...state,
            result: action.result
        }    
    case REFUND_FAILURE:
        return {
            ...state
        }    
    case SHOPLIST_SUCCESS:
        return {
            ...state,
            shopListResult: action.result
        }    
    case SHOPLIST_FAILURE:
        return {
            ...state
        }
    default:
      return state
  }
}
