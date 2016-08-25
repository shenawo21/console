//店铺列表
const APPQUERY = 'applic/APPQUERY';
const APPQUERY_SUCCESS = 'applic/APPQUERY_SUCCESS';
const APPQUERY_FAILURE = 'applic/APPQUERY_FAILURE';

//同步记录查询列表
const QUERY = 'synch/QUERY';
const QUERY_SUCCESS = 'synch/QUERY_SUCCESS';
const QUERY_FAILURE = 'synch/QUERY_FAILURE';

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
 * 同步记录查询列表
 *api-tradesInfo.synchronizeOrderInfo
 * @export
 * @param params (description)
 * @returns (description)
 */
export function queryList(params) {
  return {
    types: [QUERY, QUERY_SUCCESS, QUERY_FAILURE],
    promise: (client) => client.post('api-tradesInfo.synchronizeOrderInfo', params)
  }
}

export default function reducer(state = {result:{}}, action) {
  state = {...state, loading : action.loading};
  switch (action.type) {
    case APPQUERY:
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
