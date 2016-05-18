

const DELETE = 'accounts/DELETE';
const DELETE_SUCCESS = 'accounts/DELETE_SUCCESS';
const DELETE_FAILURE = 'accounts/DELETE_FAILURE';


const QUERY = 'accounts/QUERY';
const QUERY_SUCCESS = 'accounts/QUERY_SUCCESS';
const QUERY_FAILURE = 'accounts/QUERY_FAILURE';





/**
 * 删除
 *
 * @export
 * @param params (description)
 * @returns (description)
 */
export function deleteItem(params) {
  return {
    types: [DELETE, DELETE_SUCCESS, DELETE_FAILURE],
    promise: (client) => client.post('/suneee-cloud/administrator.api.deleteAdmin', params)
  }
}

/**
 * 列表查询
 *
 * @export
 * @param params (description)
 * @returns (description)
 */
export function queryList(params) {
  return {
    types: [QUERY, QUERY_SUCCESS, QUERY_FAILURE],
    promise: (client) => client.post('/suneee-cloud/api-administrator.list', params)
  }
}



export default function reducer(state = {result:{}}, action) {
  state = {...state, loading : action.loading};
  switch (action.type) {
    case DELETE:
    case QUERY:
        return {
            ...state
        }
    
    case DELETE_SUCCESS:
        return {
            //...state,
            result: action.result
        }
    case DELETE_FAILURE:
        return {
            ...state
        }
    case QUERY_SUCCESS:
        return {
            ...state,
            result: action.result
        }
    case QUERY_FAILURE:
        return {
            ...state
        }
    default:
      return state
  }
}
