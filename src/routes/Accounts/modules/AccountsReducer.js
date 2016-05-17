const ADD = 'accounts/ADD';
const ADD_SUCCESS = 'accounts/ADD_SUCCESS';
const ADD_FAILURE = 'accounts/ADD_FAILURE';

const DELETE = 'accounts/DELETE';
const DELETE_SUCCESS = 'accounts/DELETE_SUCCESS';
const DELETE_FAILURE = 'accounts/DELETE_FAILURE';

const MODIFY = 'accounts/MODIFY';
const MODIFY_SUCCESS = 'accounts/MODIFY_SUCCESS';
const MODIFY_FAILURE = 'accounts/MODIFY_FAILURE';

const QUERY = 'accounts/QUERY';
const QUERY_SUCCESS = 'accounts/QUERY_SUCCESS';
const QUERY_FAILURE = 'accounts/QUERY_FAILURE';

const VIEW = 'accounts/VIEW';
const VIEW_SUCCESS = 'accounts/VIEW_SUCCESS';
const VIEW_FAILURE = 'accounts/VIEW_FAILURE';


/**
 * 新增
 *
 * @export
 * @param params (description)
 * @returns (description)
 */
export function addItem(params) {
  return {
    types: [ADD, ADD_SUCCESS, ADD_FAILURE],
    promise: (client) => client.post('/', params)
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
    promise: (client) => client.post('/', params)
  }
}

/**
 * 修改
 *
 * @export
 * @param params (description)
 * @returns (description)
 */
export function modifyItem(params) {
  return {
    types: [MODIFY, MODIFY_SUCCESS, MODIFY_FAILURE],
    promise: (client) => client.post('/', params)
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
    promise: (client) => client.post('suneee-cloud/api-administrator.list', params)
  }
}

/**
 * 单条查看
 *
 * @export
 * @param params (description)
 * @returns (description)
 */
export function view(params) {
  return {
    types: [VIEW, VIEW_SUCCESS, VIEW_FAILURE],
    promise: (client) => client.post('/', params)
  }
}


export default function reducer(state = {result:{}}, action) {
  state = {...state, loading : action.loading};
  switch (action.type) {
    case ADD:
    case DELETE:
    case MODIFY:
    case QUERY:
    case VIEW:
        return {
            ...state
        }
    case ADD_SUCCESS:
        return {
            //...state,
            loading : action.loading,
            result: action.result
        }
    case ADD_FAILURE:
        return {
            ...state
        }
    case MODIFY_SUCCESS:
        return {
            //...state,
            result: action.result
        }
    case MODIFY_FAILURE:
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
    case VIEW_SUCCESS:
        return {
            //...state,
            result: action.result
        }
    case VIEW_FAILURE:
        return {
            ...state
        }
    default:
      return state
  }
}
