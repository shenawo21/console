//订单详情
const VIEW = 'detail/VIEW';
const VIEW_SUCCESS = 'detail/VIEW_SUCCESS';
const VIEW_FAILURE = 'detail/VIEW_FAILURE';

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


export default function reducer(state = {result:{}}, action) {
  state = {...state, loading : action.loading};
  switch (action.type) {
    case VIEW:
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
    default:
      return state
  }
}
