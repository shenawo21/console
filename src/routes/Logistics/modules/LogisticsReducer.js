const ADD = 'logistics/ADD';
const ADD_SUCCESS = 'logistics/ADD_SUCCESS';
const ADD_FAILURE = 'logistics/ADD_FAILURE';

const DELETE = 'logistics/DELETE';
const DELETE_SUCCESS = 'logistics/DELETE_SUCCESS';
const DELETE_FAILURE = 'logistics/DELETE_FAILURE';

const ISDEFAULT = 'logistics/ISDEFAULT';
const ISDEFAULT_SUCCESS = 'logistics/ISDEFAULT_SUCCESS';
const ISDEFAULT_FAILURE = 'logistics/ISDEFAULT_FAILURE';

const QUERY = 'logistics/QUERY';
const QUERY_SUCCESS = 'logistics/QUERY_SUCCESS';
const QUERY_FAILURE = 'logistics/QUERY_FAILURE';

/**
 * 添加
 * 
 * @export
 * @param params (description)
 * @returns (description)
 */
export function add(params) {
  return {
    types: [ADD, ADD_SUCCESS, ADD_FAILURE],
    promise: (client) => client.post('api-enterpriseIndustry.isDefault', params)
  }
}

/**
 * 移除
 * 
 * @export
 * @param params (description)
 * @returns (description)
 */
export function deleteItem(params) {
  return {
    types: [DELETE, DELETE_SUCCESS, DELETE_FAILURE],
    promise: (client) => client.post('api-enterpriseIndustry.isDefault', params)
  }
}

/**
 * 设为默认
 * 
 * @export
 * @param params (description)
 * @returns (description)
 */
export function isDefault(params) {
  return {
    types: [ISDEFAULT, ISDEFAULT_SUCCESS, ISDEFAULT_FAILURE],
    promise: (client) => client.post('api-enterpriseIndustry.isDefault', params)
  }
}

/**
 * 物流公司列表
 * 
 * @export
 * @param params (description)
 * @returns (description)
 */
export function queryList(params) {
  return {
    types: [QUERY, QUERY_SUCCESS, QUERY_FAILURE],
    promise: (client) => client.post('api-enterpriseIndustry.listEnterpriseIndustrys', params)
  }
}

export default function reducer(state = {result:{}}, action) {
  state = {...state, loading : action.loading};
  switch (action.type) {
    case ADD:
    case DELETE:
    case ISDEFAULT:
    case QUERY:
        return {
            ...state
        }
     case ADD_SUCCESS:
        return {
            //...state,
            result: action.result
        }
    case ADD_FAILURE:
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
    case ISDEFAULT_SUCCESS:
        return {
            //...state,
            result: action.result
        }
    case ISDEFAULT_FAILURE:
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
