const ADJUSTSTOCK = 'adjustStock/ADJUSTSTOCK';
const ADJUSTSTOCK_SUCCESS = 'adjustStock/ADJUSTSTOCK_SUCCESS';
const ADJUSTSTOCK_FAILURE = 'adjustStock/ADJUSTSTOCK_FAILURE';

const GETAIRLIST = 'adjustStock/GETAIRLIST';
const GETAIRLIST_SUCCESS = 'adjustStock/GETAIRLIST_SUCCESS';
const GETAIRLIST_FAILURE = 'adjustStock/GETAIRLIST_FAILURE';

/**
 * 新增
 * 
 * @export
 * @param params (description)
 * @returns (description)
 */
export function adjustStock(params) {
  return {
    types: [ADD, ADD_SUCCESS, ADD_FAILURE],
    promise: (client) => client.post('api-product.adjustStock', params)
  }
}

/**
 * 删除
 * 
 * @export
 * @param params (description)
 * @returns (description)
 */
export function getAirList(params) {
  return {
    types: [GETAIRLIST, GETAIRLIST_SUCCESS, GETAIRLIST_FAILURE],
    promise: (client) => client.post('api-productService.ListVirtualDepot', params)
  }
}


export default function reducer(state = {result:{}}, action) {
  state = {...state, loading : action.loading};
  switch (action.type) {
    case ADJUSTSTOCK:
    case GETAIRLIST:
        return {
            ...state
        }
    case ADJUSTSTOCK_SUCCESS:
        return {
            //...state,
            loading : action.loading,
            result: action.result
        }
    case ADJUSTSTOCK_FAILURE:
        return {
            ...state
        }
    case GETAIRLIST_SUCCESS:
        return {
            //...state,
            airListResult: action.result
        }
    case GETAIRLIST_FAILURE:
        return {
            ...state
        }
    default:
      return state
  }
}
