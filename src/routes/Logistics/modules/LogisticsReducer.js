const DELETE = 'logistics/DELETE';
const DELETE_SUCCESS = 'logistics/DELETE_SUCCESS';
const DELETE_FAILURE = 'logistics/DELETE_FAILURE';

const QUERY = 'logistics/QUERY';
const QUERY_SUCCESS = 'logistics/QUERY_SUCCESS';
const QUERY_FAILURE = 'logistics/QUERY_FAILURE';

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
    promise: (client) => client.post('api-logistic.updateLogistic', params)
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
    promise: (client) => client.post('api-logistic.listLogistic', params)
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
