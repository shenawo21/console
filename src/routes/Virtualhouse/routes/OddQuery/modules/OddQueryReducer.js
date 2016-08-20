
//获取出入库单列表
const ODDQUERY = 'oddQuery/ODDQUERY';
const ODDQUERY_SUCCESS = 'oddQuery/ODDQUERY_SUCCESS';
const ODDQUERY_FAILURE = 'oddQuery/ODDQUERY_FAILURE';

//获取店铺列表
const GETSHOPLIST = 'shophouse/GETSHOPLIST';
const GETSHOPLIST_SUCCESS = 'shophouse/GETSHOPLIST_SUCCESS';
const GETSHOPLIST_FAILURE = 'shophouse/GETSHOPLIST_FAILURE';

//获取商品类目列表
const OUTCATELIST = 'shophouse/OUTCATELIST';
const OUTCATELIST_SUCCESS = 'shophouse/OUTCATELIST_SUCCESS';
const OUTCATELIST_FAILURE = 'shophouse/OUTCATELIST_FAILURE';

/**
 * 入库单
 * 
 * @export
 * @param params (description)
 * @returns (description)
 */
export function oddQueryList(params) {
  return {
    types: [ODDQUERY, ODDQUERY_SUCCESS, ODDQUERY_FAILURE],
    promise: (client) => client.post('api-productService.stockRecordlistView', params)
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
        types: [GETSHOPLIST, GETSHOPLIST_SUCCESS, GETSHOPLIST_FAILURE],
        promise: (client) => client.post('api-shop.listEnterpriseShop')
    }
}

/**
 * 获取商品分类
 * 
 * @export
 * @param params (description)
 * @returns (description)
 */
export function priceCateList(params) {
  return {
    types: [OUTCATELIST, OUTCATELIST_SUCCESS, OUTCATELIST_FAILURE],
    promise: (client) => client.post('api-category.listAll', params)
  }
}


export default function reducer(state = {result:{}}, action) {
  state = {...state, loading : action.loading};
  switch (action.type) {    
    case ODDQUERY:
    case GETSHOPLIST:
    case OUTCATELIST:
        return {
            ...state
        }    
    case ODDQUERY_SUCCESS:
        return {
            ...state,
            result: action.result
        }
    case ODDQUERY_FAILURE:
        return {
            ...state
        }
    case GETSHOPLIST_SUCCESS:
        return {
            ...state,
            shopListResult: action.result
        }
    case GETSHOPLIST_FAILURE:
        return {
            ...state
        }
     case OUTCATELIST_SUCCESS:
        return {
            ...state,
            cateResult: action.result
        }
    case OUTCATELIST_FAILURE:
        return {
            ...state
        }
    default:
      return state
  }
}
