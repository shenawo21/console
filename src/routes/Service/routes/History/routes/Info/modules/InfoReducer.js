
//获取详情信息
const VIEW = 'shophouse/VIEW';
const VIEW_SUCCESS = 'shophouse/VIEW_SUCCESS';
const VIEW_FAILURE = 'shophouse/VIEW_FAILURE';

/**
 * 获取详细信息
 * 
 * @export
 * @param params (description)
 * @returns (description)
 */
export function view() {
    return {
        types: [VIEW, VIEW_SUCCESS, VIEW_FAILURE],
        promise: (client) => client.post('api-offSale.getChangeGoodsOrder')
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
            ...state,
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
