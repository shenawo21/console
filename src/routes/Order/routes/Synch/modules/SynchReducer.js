const ADD = 'synch/ADD';
const ADD_SUCCESS = 'synch/ADD_SUCCESS';
const ADD_FAILURE = 'synch/ADD_FAILURE';

const DELETE = 'synch/DELETE';
const DELETE_SUCCESS = 'synch/DELETE_SUCCESS';
const DELETE_FAILURE = 'synch/DELETE_FAILURE';

const MODIFY = 'synch/MODIFY';
const MODIFY_SUCCESS = 'synch/MODIFY_SUCCESS';
const MODIFY_FAILURE = 'synch/MODIFY_FAILURE';

const QUERY = 'synch/QUERY';
const QUERY_SUCCESS = 'synch/QUERY_SUCCESS';
const QUERY_FAILURE = 'synch/QUERY_FAILURE';

const VIEW = 'synch/VIEW';
const VIEW_SUCCESS = 'synch/VIEW_SUCCESS';
const VIEW_FAILURE = 'synch/VIEW_FAILURE';


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
    promise: (client) => client.post('/', params)
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
