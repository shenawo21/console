
//获取待验收商品列表
const NOCHECKLIST = 'oddQuery/NOCHECKLIST';
const NOCHECKLIST_SUCCESS = 'oddQuery/NOCHECKLIST_SUCCESS';
const NOCHECKLIST_FAILURE = 'oddQuery/NOCHECKLIST_FAILURE';

//获取店铺列表
const GETSHOPLIST = 'shophouse/GETSHOPLIST';
const GETSHOPLIST_SUCCESS = 'shophouse/GETSHOPLIST_SUCCESS';
const GETSHOPLIST_FAILURE = 'shophouse/GETSHOPLIST_FAILURE';

//获取商品类目列表
const OUTCATELIST = 'shophouse/OUTCATELIST';
const OUTCATELIST_SUCCESS = 'shophouse/OUTCATELIST_SUCCESS';
const OUTCATELIST_FAILURE = 'shophouse/OUTCATELIST_FAILURE';

/**
 * 获取待验收商品列表
 * 
 * @export
 * @param params (description)
 * @returns (description)
 */
export function getNoCheckList(params) {
  return {
    types: [NOCHECKLIST, NOCHECKLIST_SUCCESS, NOCHECKLIST_FAILURE],
    promise: (client) => client.post('api-offSale.getNotCheckedList', params)
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
    case NOCHECKLIST:
    case GETSHOPLIST:
    case OUTCATELIST:
        return {
            ...state
        }    
    case NOCHECKLIST_SUCCESS:
        return {
            ...state,
            result: action.result
        }
    case NOCHECKLIST_FAILURE:
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
