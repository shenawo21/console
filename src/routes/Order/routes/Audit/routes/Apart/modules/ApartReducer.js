//订单详情
const VIEW = 'detail/VIEW';
const VIEW_SUCCESS = 'detail/VIEW_SUCCESS';
const VIEW_FAILURE = 'detail/VIEW_FAILURE';
//提交发货（修改订单状态，并生成发货单）
const SEND = 'apart/SEND';
const SEND_SUCCESS = 'apart/SEND_SUCCESS';
const SEND_FAILURE = 'apart/SEND_FAILURE';

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

export default function reducer(state = {result: {}}, action) {
  state = {...state, loading: action.loading};
  switch (action.type) {
    case VIEW:
    case SEND:
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
    case SEND_SUCCESS:
      return {
        result: action.result
      }
    case SEND_FAILURE:
      return {
        ...state
      }
    default:
      return state
  }
}
