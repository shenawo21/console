//手工订单同步
const MODIFY = 'manual/MODIFY';
const MODIFY_SUCCESS = 'manual/MODIFY_SUCCESS';
const MODIFY_FAILURE = 'manual/MODIFY_FAILURE';

//店铺列表
const APPQUERY = 'applic/APPQUERY';
const APPQUERY_SUCCESS = 'applic/APPQUERY_SUCCESS';
const APPQUERY_FAILURE = 'applic/APPQUERY_FAILURE';

/**
 * 手工订单同步
 *api-tradesInfo.synchronizeOrder
 * @export
 * @param params (description)
 * @returns (description)
 */
export function modifyItem(params) {
  return {
    types: [MODIFY, MODIFY_SUCCESS, MODIFY_FAILURE],
    promise: (client) => client.post('api-tradesInfo.synchronizeOrder', params)
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
  state = {...state, isJump: false, loading: action.loading};
  switch (action.type) {
    case MODIFY:
    case APPQUERY:
      return {
        ...state
      }
    case MODIFY_SUCCESS:
      return {
        result: action.result,
        isJump: true
      }
    case MODIFY_FAILURE:
      return {
        ...state,
        isJump: false
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
