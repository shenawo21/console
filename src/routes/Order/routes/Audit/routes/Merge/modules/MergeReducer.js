//合并订单订单详情
const VIEW = 'merge/VIEW';
const VIEW_SUCCESS = 'merge/VIEW_SUCCESS';
const VIEW_FAILURE = 'merge/VIEW_FAILURE';
//合并订单
const MERGE = 'merge/MERGE';
const MERGE_SUCCESS = 'merge/MERGE_SUCCESS';
const MERGE_FAILURE = 'merge/MERGE_FAILURE';
//解锁订单
const LOCK = 'merge/LOCK';
const LOCK_SUCCESS = 'merge/LOCK_SUCCESS';
const LOCK_FAILURE = 'merge/LOCK_FAILURE';
/**
 * 合并订单订单详情
 *api-tradesInfo.getCanCombinedOrder
 * @export
 * @param params (description)
 * @returns (description)
 */
export function view(params) {
  return {
    types: [VIEW, VIEW_SUCCESS, VIEW_FAILURE],
    promise: (client) => client.post('api-tradesInfo.getCanCombinedOrder', params)
  }
}
/**
 * 合并订单
 *api-tradesOrder.combinedOrders
 * @export
 * @param params (description)
 * @returns (description)
 */
export function mergeOrder(params) {
  return {
    types: [MERGE, MERGE_SUCCESS, MERGE_FAILURE],
    promise: (client) => client.post('api-tradesInfo.combinedOrders', params)
  }
}
/**
 * 解锁订单
 *api-tradesInfo.unlockTrades
 * @export
 * @param params (description)
 * @returns (description)
 */
export function unlock(params) {
  return {
    types: [LOCK, LOCK_SUCCESS, LOCK_FAILURE],
    promise: (client) => client.post('api-tradesInfo.unlockTrades', params)
  }
}

export default function reducer(state = {result:{}}, action) {
  state = {...state,isJump: false, loading : action.loading};
  switch (action.type) {
    case VIEW:
    case MERGE:
      return {
        ...state
      }
    case VIEW_SUCCESS:
      return {
        result: action.result
      }
    case VIEW_FAILURE:
      return {
        ...state
      }
    case MERGE_SUCCESS:
      return {
        mResult: action.result,
        isJump: true
      }
    case MERGE_FAILURE:
      return {
        ...state
      }
    case LOCK_SUCCESS:
      return {
        ...state,
        lResult: action.result,
        isJump: true
      }
    case LOCK_FAILURE:
      return {
        ...state
      }
    default:
      return state
  }
}


