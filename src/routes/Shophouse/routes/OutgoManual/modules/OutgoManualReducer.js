
const OUTPROLIST = 'shophouse/OUTPROLIST';
const OUTPROLIST_SUCCESS = 'shophouse/OUTPROLIST_SUCCESS';
const OUTPROLIST_FAILURE = 'shophouse/OUTPROLIST_FAILURE';

const PRICESHOPHOUSELIST = 'shophouse/PRICESHOPHOUSELIST';
const PRICESHOPHOUSELIST_SUCCESS = 'shophouse/PRICESHOPHOUSELIST_SUCCESS';
const PRICESHOPHOUSELIST_FAILURE = 'shophouse/PRICESHOPHOUSELIST_FAILURE';

//获取店铺列表
const GETSHOPLIST = 'shophouse/GETSHOPLIST';
const GETSHOPLIST_SUCCESS = 'shophouse/GETSHOPLIST_SUCCESS';
const GETSHOPLIST_FAILURE = 'shophouse/GETSHOPLIST_FAILURE';

//获取商品类目列表
const OUTCATELIST = 'shophouse/OUTCATELIST';
const OUTCATELIST_SUCCESS = 'shophouse/OUTCATELIST_SUCCESS';
const OUTCATELIST_FAILURE = 'shophouse/OUTCATELIST_FAILURE';


/**
 * 手动出库
 * 
 * @export
 * @param params (description)
 * @returns (description)
 */
export function outManual(params) {
  return {
    types: [OUTPROLIST, OUTPROLIST_SUCCESS, OUTPROLIST_FAILURE],
    promise: (client) => client.post('api-shopStock.decreaseShopStocks', params)
  }
}

/**
 * 获取店铺仓库列表
 * 
 * @export
 * @param params (description)
 * @returns (description)
 */
export function priceShopHouseList(params) {
  return {
    types: [PRICESHOPHOUSELIST, PRICESHOPHOUSELIST_SUCCESS, PRICESHOPHOUSELIST_FAILURE],
    promise: (client) => client.post('api-shopStock.getShopStocks', params)
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
    case OUTPROLIST:
    case PRICESHOPHOUSELIST:
    case GETSHOPLIST:
    case OUTCATELIST:
        return {
            ...state
        }
    case OUTPROLIST_SUCCESS:
        return {
            //...state,
            result: action.result
        }
    case OUTPROLIST_FAILURE:
        return {
            ...state
        }
    case PRICESHOPHOUSELIST_SUCCESS:
        return {
            ...state,
            houseListResult: action.result
        }
    case PRICESHOPHOUSELIST_FAILURE:
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
