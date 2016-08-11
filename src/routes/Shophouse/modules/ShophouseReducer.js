
const SHOPQUERY = 'shophouse/SHOPQUERY';
const SHOPQUERY_SUCCESS = 'shophouse/SHOPQUERY_SUCCESS';
const SHOPQUERY_FAILURE = 'shophouse/SHOPQUERY_FAILURE';

const PRICEQUERY = 'shophouse/PRICEQUERY';
const PRICEQUERY_SUCCESS = 'shophouse/PRICEQUERY_SUCCESS';
const PRICEQUERY_FAILURE = 'shophouse/PRICEQUERY_FAILURE';

/**
 * 入库单
 * 
 * @export
 * @param params (description)
 * @returns (description)
 */
export function shopQueryList(params) {
  return {
    types: [SHOPQUERY, SHOPQUERY_SUCCESS, SHOPQUERY_FAILURE],
    promise: (client) => client.post('api-administrator.list', params)
  }
}

/**
 * 出库单
 * 
 * @export
 * @param params (description)
 * @returns (description)
 */
export function priceQueryList(params) {
  return {
    types: [PRICEQUERY, PRICEQUERY_SUCCESS, PRICEQUERY_FAILURE],
    promise: (client) => client.post('api-roleService.roleList', params)
  }
}



export default function reducer(state = {result:{}}, action) {
  state = {...state, loading : action.loading};
  switch (action.type) {    
    case SHOPQUERY:
    case PRICEQUERY:
        return {
            ...state
        }    
    case SHOPQUERY_SUCCESS:
        return {
            //...state,
            result: action.result
        }
    case SHOPQUERY_FAILURE:
        return {
            ...state
        }
    case PRICEQUERY_SUCCESS:
        return {
            //...state,
            loading : action.loading,
            result: action.result
        }
    case PRICEQUERY_FAILURE:
        return {
            ...state
        }
    default:
      return state
  }
}
