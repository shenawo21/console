//企业列表
const QUERY = 'enterprise/QUERY';
const QUERY_SUCCESS = 'enterprise/QUERY_SUCCESS';
const QUERY_FAILURE = 'enterprise/QUERY_FAILURE';

// /企业删除
const DELETE = 'enterprise/DELETE';
const DELETE_SUCCESS = 'enterprise/DELETE_SUCCESS';
const DELETE_FAILURE = 'enterprise/DELETE_FAILURE';

//激活
const ENADLED = 'enterprise/ENADLED';
const ENADLED_SUCCESS = 'enterprise/ENADLED_SUCCESS';
const ENADLED_FAILURE = 'enterprise/ENADLED_FAILURE';

//禁用
const DISABLED = 'enterprise/DISABLED';
const DISABLED_SUCCESS = 'enterprise/DISABLED_SUCCESS';
const DISABLED_FAILURE = 'enterprise/DISABLED_FAILURE';

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
    promise: (client) => client.post('api-enterprise.find', params)
  }
}

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
    promise: (client) => client.post('api-enterprise.delete', params)
  }
}

/**
 * 激活
 *
 * @export
 * @param params (description)
 * @returns (description)
 */
export function enabledItem(params) {
  return {
    types: [ENADLED, ENADLED_SUCCESS, ENADLED_FAILURE],
    promise: (client) => client.post('api-enterprise.enabled', params)
  }
}

/**
 * 禁用
 *
 * @export
 * @param params (description)
 * @returns (description)
 */
export function disabledItem(params) {
  return {
    types: [DISABLED, DISABLED_SUCCESS, DISABLED_FAILURE],
    promise: (client) => client.post('api-enterprise.disabled', params)
  }
}


export default function reducer(state = {result: {}}, action) {
  state = {...state, loading: action.loading};
  switch (action.type) {
    case QUERY:
    case DELETE:
    case ENADLED:
    case DISABLED:
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
    case DELETE_SUCCESS:
      return {
        //...state,
        result: action.result
      }
    case DELETE_FAILURE:
      return {
        ...state
      }
    case ENADLED_SUCCESS:
      return {
        //...state,
        result: action.result
      }
    case ENADLED_FAILURE:
      return {
        ...state
      }
    case DISABLED_SUCCESS:
      return {
        //...state,
        result: action.result
      }
    case DISABLED_FAILURE:
      return {
        ...state
      }
    default:
      return state
  }
}
