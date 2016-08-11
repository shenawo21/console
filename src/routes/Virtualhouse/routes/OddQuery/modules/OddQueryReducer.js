
const STORAGEQUERY = 'oddQuery/STORAGEQUERY';
const STORAGEQUERY_SUCCESS = 'oddQuery/STORAGEQUERY_SUCCESS';
const STORAGEQUERY_FAILURE = 'oddQuery/STORAGEQUERY_FAILURE';

const OUTGOQUERY = 'oddQuery/OUTGOQUERY';
const OUTGOQUERY_SUCCESS = 'oddQuery/OUTGOQUERY_SUCCESS';
const OUTGOQUERY_FAILURE = 'oddQuery/OUTGOQUERY_FAILURE';

/**
 * 入库单
 * 
 * @export
 * @param params (description)
 * @returns (description)
 */
export function storageQueryList(params) {
  return {
    types: [STORAGEQUERY, STORAGEQUERY_SUCCESS, STORAGEQUERY_FAILURE],
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
export function outgoQueryList(params) {
  return {
    types: [OUTGOQUERY, OUTGOQUERY_SUCCESS, OUTGOQUERY_FAILURE],
    promise: (client) => client.post('api-roleService.roleList', params)
  }
}



export default function reducer(state = {result:{}}, action) {
  state = {...state, loading : action.loading};
  switch (action.type) {    
    case STORAGEQUERY:
    case OUTGOQUERY:
        return {
            ...state
        }    
    case STORAGEQUERY_SUCCESS:
        return {
            //...state,
            result: action.result
        }
    case STORAGEQUERY_FAILURE:
        return {
            ...state
        }
    case OUTGOQUERY_SUCCESS:
        return {
            //...state,
            loading : action.loading,
            result: action.result
        }
    case OUTGOQUERY_FAILURE:
        return {
            ...state
        }
    default:
      return state
  }
}
