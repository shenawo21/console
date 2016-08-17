
const SHOPODDQUERY = 'shophouse/SHOPODDQUERY';
const SHOPODDQUERY_SUCCESS = 'shophouse/SHOPODDQUERY_SUCCESS';
const SHOPODDQUERY_FAILURE = 'shophouse/SHOPODDQUERY_FAILURE';

/**
 * 入库单
 * 
 * @export
 * @param params (description)
 * @returns (description)
 */
export function shopOddQueryList(params) {
  return {
    types: [SHOPODDQUERY, SHOPODDQUERY_SUCCESS, SHOPODDQUERY_FAILURE],
    promise: (client) => client.post('api-shopStock.getShopStockRecords', params)
  }
}



export default function reducer(state = {result:{}}, action) {
  state = {...state, loading : action.loading};
  switch (action.type) {    
    case SHOPODDQUERY:
        return {
            ...state
        }    
    case SHOPODDQUERY_SUCCESS:
        return {
            //...state,
            result: action.result
        }
    case SHOPODDQUERY_FAILURE:
        return {
            ...state
        }
    default:
      return state
  }
}
