
//列表查询
const STORAGEQUERY = 'virtualhouse/STORAGEQUERY';
const STORAGEQUERY_SUCCESS = 'virtualhouse/STORAGEQUERY_SUCCESS';
const STORAGEQUERY_FAILURE = 'virtualhouse/STORAGEQUERY_FAILURE';

/**
 * 列表查询
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


export default function reducer(state = {result:{}}, action) {
  state = {...state, loading : action.loading};
  switch (action.type) {
    case STORAGEQUERY:
        return {
            ...state
        }
    case STORAGEQUERY_SUCCESS:
        return {
            ...state,
            result: action.result
        }
    case STORAGEQUERY_FAILURE:
        return {
            ...state
        }
    default:
      return state
  }
}
