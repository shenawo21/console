//获取仓库商品列表
const QUERY = 'choose/QUERY';
const QUERY_SUCCESS = 'choose/QUERY_SUCCESS';
const QUERY_FAILURE = 'choose/QUERY_FAILURE';
//店铺列表
const APPQUERY = 'choose/APPQUERY';
const APPQUERY_SUCCESS = 'choose/APPQUERY_SUCCESS';
const APPQUERY_FAILURE = 'choose/APPQUERY_FAILURE';
//商品类目列表
const CATEQUERY = 'choose/CATEQUERY';
const CATEQUERY_SUCCESS = 'choose/CATEQUERY_SUCCESS';
const CATEQUERY_FAILURE = 'choose/CATEQUERY_FAILURE';

/**
 * 店铺列表
 *api-shop.listEnterpriseShop
 * @export
 * @param params (description)
 * @returns (description)
 */
export function appList(params) {
  return {
    types: [APPQUERY, APPQUERY_SUCCESS, APPQUERY_FAILURE],
    promise: (client) => client.post('api-shop.listEnterpriseShop', params)
  }
}

/**
 * 删除
 * 
 * @export
 * @param params (description)
 * @returns (description)
 */
export function deleteItem(params) {
  return {
    types: [DELETE, DELETE_SUCCESS, DELETE_FAILURE],
    promise: (client) => client.post('/', params)
  }
}

/**
 * 获取商品类目
 *api-category.listAll
 * @export
 * @param params (description)
 * @returns (description)
 */
export function cateList(params) {
  return {
    types: [CATEQUERY, CATEQUERY_SUCCESS, CATEQUERY_FAILURE],
    promise: (client) => client.post('api-category.listAll', params)
  }
}

/**
 * 列表查询
 * api-shopStock.getShopStocks
 * @export
 * @param params (description)
 * @returns (description)
 */
export function queryList(params) {
  return {
    types: [QUERY, QUERY_SUCCESS, QUERY_FAILURE],
    promise: (client) => client.post('api-shopStock.getShopStocks', params)
  }
}


export default function reducer(state = {result:{}}, action) {
  state = {...state, loading : action.loading};
  switch (action.type) {
    case APPQUERY:
    case CATEQUERY:
    case QUERY:
        return {
            ...state
        }
    case APPQUERY_SUCCESS:
      return {
        ...state,
        appResult: action.result
      }
    case APPQUERY_FAILURE:
      return {
        ...state
      }
    case APPQUERY_SUCCESS:
      return {
        ...state,
        appResult: action.result
      }
    case APPQUERY_FAILURE:
      return {
        ...state
      }
    case QUERY_SUCCESS:
        return {
            ...state,
            result: action.result
        }
    case QUERY_FAILURE:
        return {
            ...state
        }
    default:
      return state
  }
}
