
const ODDQUERY = 'oddQuery/ODDQUERY';
const ODDQUERY_SUCCESS = 'oddQuery/ODDQUERY_SUCCESS';
const ODDQUERY_FAILURE = 'oddQuery/ODDQUERY_FAILURE';

/**
 * 入库单
 * 
 * @export
 * @param params (description)
 * @returns (description)
 */
export function oddQueryList(params) {
  return {
    types: [ODDQUERY, ODDQUERY_SUCCESS, ODDQUERY_FAILURE],
    promise: (client) => client.post('api-productService.stockRecordlistView', params)
  }
}


export default function reducer(state = {result:{}}, action) {
  state = {...state, loading : action.loading};
  switch (action.type) {    
    case ODDQUERY:
        return {
            ...state
        }    
    case ODDQUERY_SUCCESS:
        return {
            //...state,
            result: action.result
        }
    case ODDQUERY_FAILURE:
        return {
            ...state
        }
    default:
      return state
  }
}
