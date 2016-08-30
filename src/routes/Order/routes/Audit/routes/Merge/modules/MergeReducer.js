//订单详情
const VIEW = 'merge/VIEW';
const VIEW_SUCCESS = 'merge/VIEW_SUCCESS';
const VIEW_FAILURE = 'merge/VIEW_FAILURE';
//合并订单
const MERGE = 'apart/MERGE';
const MERGE_SUCCESS = 'apart/MERGE_SUCCESS';
const MERGE_FAILURE = 'apart/MERGE_FAILURE';

/**
 * 订单详情
 *api-tradesInfo.orderDetial
 * @export
 * @param params (description)
 * @returns (description)
 */
export function view(params) {
  return {
    types: [VIEW, VIEW_SUCCESS, VIEW_FAILURE],
    promise: (client) => client.post('api-tradesInfo.orderDetial', params)
  }
}
/**
 * 合并订单
 *api-tradesInfo.getCanCombinedOrder
 * @export
 * @param params (description)
 * @returns (description)
 */
export function mergeOrder(params) {
  return {
    types: [MERGE, MERGE_SUCCESS, MERGE_FAILURE],
    promise: (client) => client.post('api-tradesInfo.getCanCombinedOrder', params)
  }
}

export default function reducer(state = {result:{}}, action) {
  state = {...state, loading : action.loading};
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
        result: action.result
      }
    case MERGE_FAILURE:
      return {
        ...state
      }
    default:
      return state
  }
}
