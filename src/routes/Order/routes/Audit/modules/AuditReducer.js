//审单列表
const QUERY = 'audit/QUERY';
const QUERY_SUCCESS = 'audit/QUERY_SUCCESS';
const QUERY_FAILURE = 'audit/QUERY_FAILURE';

//直接发货
const GIVE = 'invoice/GIVE';
const GIVE_SUCCESS = 'invoice/GIVE_SUCCESS';
const GIVE_FAILURE = 'invoice/GIVE_FAILURE';

//放弃合并
const DELETE = 'audit/DELETE';
const DELETE_SUCCESS = 'audit/DELETE_SUCCESS';
const DELETE_FAILURE = 'audit/DELETE_FAILURE';

//店铺列表
const APPQUERY = 'applic/APPQUERY';
const APPQUERY_SUCCESS = 'applic/APPQUERY_SUCCESS';
const APPQUERY_FAILURE = 'applic/APPQUERY_FAILURE';

/**
 * 审单列表
 *api-tradesInfo.examinList
 * @export
 * @param params (description)
 * @returns (description)
 */
export function queryList(params) {
  return {
    types: [QUERY, QUERY_SUCCESS, QUERY_FAILURE],
    promise: (client) => client.post('api-tradesInfo.examinList', params)
  }
}
/**
 * 发货
 *api-tradesInfo.sendGoods
 * @export
 * @param params (description)
 * @returns (description)
 */
export function giveItem(params) {
  return {
    types: [GIVE, GIVE_SUCCESS, GIVE_FAILURE],
    promise: (client) => client.post('api-tradesInfo.sendGoods', params)
  }
}

/**
 * 放弃合并
 *api-shop.modifyConnParams
 * @export
 * @param params (description)
 * @returns (description)
 */
export function deleteItem(params) {
  return {
    types: [DELETE, DELETE_SUCCESS, DELETE_FAILURE],
    promise: (client) => client.post('api-shop.modifyConnParams', params)
  }
}
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


export default function reducer(state = {result: {}}, action) {
  state = {...state, loading: action.loading};
  switch (action.type) {
    case GIVE:
    case DELETE:
    case APPQUERY:
      return {
        ...state
      }
    case GIVE_SUCCESS:
      return {
        ...state,
        result: action.result
      }
    case GIVE_FAILURE:
      return {
        ...state
      }
    case DELETE_SUCCESS:
      return {
        ...state,
        result: action.result
      }
    case DELETE_FAILURE:
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
    default:
      return state
  }
}
