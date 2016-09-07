//订单详情
const VIEW = 'detail/VIEW';
const VIEW_SUCCESS = 'detail/VIEW_SUCCESS';
const VIEW_FAILURE = 'detail/VIEW_FAILURE';
//拆单
const SEND = 'apart/SEND';
const SEND_SUCCESS = 'apart/SEND_SUCCESS';
const SEND_FAILURE = 'apart/SEND_FAILURE';
//解锁订单
const LOCK = 'apart/LOCK';
const LOCK_SUCCESS = 'apart/LOCK_SUCCESS';
const LOCK_FAILURE = 'apart/LOCK_FAILURE';

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
 * 拆单
 *api-tradesInfo.splitOrders
 * @export
 * @param params (description)
 * @returns (description)
 */
export function splitOrders(params) {
  return {
    types: [SEND, SEND_SUCCESS, SEND_FAILURE],
    promise: (client) => client.post('api-tradesInfo.splitOrders', params)
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

export default function reducer(state = {result: {}}, action) {
  state = {...state,isJump:false, loading: action.loading};
  switch (action.type) {
    case VIEW:
    case SEND:
      return {
        ...state
      }
    case VIEW_SUCCESS:
      return {
        ...state,
        result: action.result
      }
    case VIEW_FAILURE:
      return {
        ...state
      }
    case SEND_SUCCESS:
      return {
        result: action.result,
        isJump:true
      }
    case SEND_FAILURE:
      return {
        ...state
      }
    case LOCK_SUCCESS:
      return {
        result: action.result
      }
    case LOCK_FAILURE:
      return {
        ...state
      }
    default:
      return state
  }
}
