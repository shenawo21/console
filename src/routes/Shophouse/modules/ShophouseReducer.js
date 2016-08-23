
const SHOPQUERY = 'shophouse/SHOPQUERY';
const SHOPQUERY_SUCCESS = 'shophouse/SHOPQUERY_SUCCESS';
const SHOPQUERY_FAILURE = 'shophouse/SHOPQUERY_FAILURE';

//获取对比商品的列表
const COMPARELIST = 'shophouse/COMPARELIST';
const COMPARELIST_SUCCESS = 'shophouse/COMPARELIST_SUCCESS';
const COMPARELIST_FAILURE = 'shophouse/COMPARELIST_FAILURE';

//对比商品列表翻页
const COMPAREPAGE = 'shophouse/COMPAREPAGE';
const COMPAREPAGE_SUCCESS = 'shophouse/COMPAREPAGE_SUCCESS';
const COMPAREPAGE_FAILURE = 'shophouse/COMPAREPAGE_FAILURE';

//比对更新
const COMPAREUPT = 'shophouse/COMPAREUPT';
const COMPAREUPT_SUCCESS = 'shophouse/COMPAREUPT_SUCCESS';
const COMPAREUPT_FAILURE = 'shophouse/COMPAREUPT_FAILURE';

//回退
const FALLBACK = 'shophouse/FALLBACK';
const FALLBACK_SUCCESS = 'shophouse/FALLBACK_SUCCESS';
const FALLBACK_FAILURE = 'shophouse/FALLBACK_FAILURE';

//获取店铺列表
const GETSHOPLIST = 'shophouse/GETSHOPLIST';
const GETSHOPLIST_SUCCESS = 'shophouse/GETSHOPLIST_SUCCESS';
const GETSHOPLIST_FAILURE = 'shophouse/GETSHOPLIST_FAILURE';

//获取商品类目列表
const OUTCATELIST = 'shophouse/OUTCATELIST';
const OUTCATELIST_SUCCESS = 'shophouse/OUTCATELIST_SUCCESS';
const OUTCATELIST_FAILURE = 'shophouse/OUTCATELIST_FAILURE';

/**
 * 店铺仓库列表
 * 
 * @export
 * @param params (description)
 * @returns (description)
 */
export function shopQueryList(params) {
  return {
    types: [SHOPQUERY, SHOPQUERY_SUCCESS, SHOPQUERY_FAILURE],
    promise: (client) => client.post('api-shopStock.getShopStocks', params)
  }
}

/**
 * 商品对比
 * 
 * @export
 * @param params (description)
 * @returns (description)
 */
export function compareList(params) {
  return {
    types: [COMPARELIST, COMPARELIST_SUCCESS, COMPARELIST_FAILURE],
    promise: (client) => client.post('api-shopStock.getCompareList', params)
  }
}

/**
 * 出库单翻页接口
 * 
 * @export
 * @param params (description)
 * @returns (description)
 */
export function comparePage(params) {
  return {
    types: [COMPAREPAGE, COMPAREPAGE_SUCCESS, COMPAREPAGE_FAILURE],
    promise: (client) => client.post('api-shopStock.getComparePage', params)
  }
}

/**
 * 比对更新
 * 
 * @export
 * @param params (description)
 * @returns (description)
 */
export function compareUpt(params) {
  return {
    types: [COMPAREUPT, COMPAREUPT_SUCCESS, COMPAREUPT_FAILURE],
    promise: (client) => client.post('api-shopStock.updateWaitingMatchSkus', params)
  }
}

/**
 * 回退
 * 
 * @export
 * @param params (description)
 * @returns (description)
 */
export function fallBack(params) {
  return {
    types: [FALLBACK, FALLBACK_SUCCESS, FALLBACK_FAILURE],
    promise: (client) => client.post('api-shopStock.feedback', params)
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
    case SHOPQUERY:
    case COMPARELIST:
    case COMPAREPAGE:
    case COMPAREUPT:
    case GETSHOPLIST:
    case OUTCATELIST:
        return {
            ...state
        }    
    case SHOPQUERY_SUCCESS:
        return {
            ...state,
            result: action.result
        }
    case SHOPQUERY_FAILURE:
        return {
            ...state
        }
    case COMPARELIST_SUCCESS:
        return {
            ...state,
            compareListResult: action.result
        }
    case COMPARELIST_FAILURE:
        return {
            ...state
        }
    case COMPAREPAGE_SUCCESS:
        return {
            ...state,
            comparePageResult: action.result
        }
    case COMPAREPAGE_FAILURE:
        return {
            ...state
        }
    case COMPAREUPT_SUCCESS:
        return {
            ...state,
            result: action.result
        }
    case COMPAREUPT_FAILURE:
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
