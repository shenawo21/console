//发货单查询
const QUERY = 'invoice/QUERY';
const QUERY_SUCCESS = 'invoice/QUERY_SUCCESS';
const QUERY_FAILURE = 'invoice/QUERY_FAILURE';

//发货
const DELETE = 'invoice/DELETE';
const DELETE_SUCCESS = 'invoice/DELETE_SUCCESS';
const DELETE_FAILURE = 'invoice/DELETE_FAILURE';

//店铺列表
const APPQUERY = 'applic/APPQUERY';
const APPQUERY_SUCCESS = 'applic/APPQUERY_SUCCESS';
const APPQUERY_FAILURE = 'applic/APPQUERY_FAILURE';


/**
 * 发货单查询
 *api-tradesInfo.selectWaitSendGoods
 * @export
 * @param params (description)
 * @returns (description)
 */
export function queryList(params) {
  return {
    types: [QUERY, QUERY_SUCCESS, QUERY_FAILURE],
    promise: (client) => client.post('api-tradesInfo.selectWaitSendGoods', params)
  }
}
/**
 *发货
 *api-tradesInfo.sendGoods
 * @export
 * @param params (description)
 * @returns (description)
 */
export function deleteItem(params) {
  return {
    types: [DELETE, DELETE_SUCCESS, DELETE_FAILURE],
    promise: (client) => client.post('api-tradesInfo.sendGoods', params)
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
    case DELETE:
    case QUERY:
    case APPQUERY:
      return {
        ...state
      }
    case DELETE_SUCCESS:
      return {
        result: action.result
      }
    case DELETE_FAILURE:
      return {
        ...state
      }
    case QUERY_SUCCESS:
      return {
        result: action.result
      }
    case QUERY_FAILURE:
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
