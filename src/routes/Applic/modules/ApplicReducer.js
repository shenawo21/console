//列表
const QUERY = 'applic/QUERY';
const QUERY_SUCCESS = 'applic/QUERY_SUCCESS';
const QUERY_FAILURE = 'applic/QUERY_FAILURE';
//删除
const DELETE = 'applic/DELETE';
const DELETE_SUCCESS = 'applic/DELETE_SUCCESS';
const DELETE_FAILURE = 'applic/DELETE_FAILURE';
//激活
const ENADLED = 'applic/ENADLED';
const ENADLED_SUCCESS = 'applic/ENADLED_SUCCESS';
const ENADLED_FAILURE = 'applic/ENADLED_FAILURE';
//禁用
const DISABLED = 'applic/DISABLED';
const DISABLED_SUCCESS = 'applic/DISABLED_SUCCESS';
const DISABLED_FAILURE = 'applic/DISABLED_FAILURE';

/**
 * 列表查询
 *api-shop.findShop
 * @export
 * @param params (description)
 * @returns (description)
 */
export function queryList(params) {
  return {
    types: [QUERY, QUERY_SUCCESS, QUERY_FAILURE],
    promise: (client) => client.post('api-shop.findShop', params)
  }
}

/**
 * 删除
 *api-shop.deleteShop
 * @export
 * @param params (description)
 * @returns (description)
 */
export function deleteItem(params) {
  return {
    types: [DELETE, DELETE_SUCCESS, DELETE_FAILURE],
    promise: (client) => client.post('api-shop.deleteShop', params)
  }
}

/**
 * 激活
 *api-shop.normalShop
 * @export
 * @param params (description)
 * @returns (description)
 */
export function enabledItem(params) {
  return {
    types: [ENADLED, ENADLED_SUCCESS, ENADLED_FAILURE],
    promise: (client) => client.post('api-shop.normalShop', params)
  }
}

/**
 * 禁用
 *api-shop.invisibleShop
 * @export
 * @param params (description)
 * @returns (description)
 */
export function disabledItem(params) {
  return {
    types: [DISABLED, DISABLED_SUCCESS, DISABLED_FAILURE],
    promise: (client) => client.post('api-shop.invisibleShop', params)
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
        result: action.result
      }
    case DELETE_FAILURE:
      return {
        ...state
      }
    case ENADLED_SUCCESS:
      return {
        result: action.result
      }
    case ENADLED_FAILURE:
      return {
        ...state
      }
    case DISABLED_SUCCESS:
      return {
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