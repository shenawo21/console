const STRUCTURE = 'authorize/STRUCTURE';
const STRUCTURE_SUCCESS = 'authorize/STRUCTURE_SUCCESS';
const STRUCTURE_FAILURE = 'authorize/STRUCTURE_FAILURE';

const ADD = 'authorize/ADD';
const ADD_SUCCESS = 'authorize/ADD_SUCCESS';
const ADD_FAILURE = 'authorize/ADD_FAILURE';

const LIST = 'authorize/LIST';
const LIST_SUCCESS = 'authorize/LIST_SUCCESS';
const LIST_FAILURE = 'authorize/LIST_FAILURE';

const QUERY = 'authorize/QUERY';
const QUERY_SUCCESS = 'authorize/QUERY_SUCCESS';
const QUERY_FAILURE = 'authorize/QUERY_FAILURE';





/**账号组列表 */
export function structure(params) {
  return {
    types: [STRUCTURE, STRUCTURE_SUCCESS, STRUCTURE_FAILURE],
    promise: (client) => client.post('api-department.getDeptNameList', params)
  }
}
/**授权设置/可选用户 */
export function userList(params) {
    return {
        types: [LIST, LIST_SUCCESS, LIST_FAILURE],
        promise: (client) => client.post('api-department.getDeptUnPermssion', params)
    }
}

/**授权设置/已选用户 */
export function queryList(params) {
    return {
        types: [QUERY, QUERY_SUCCESS, QUERY_FAILURE],
        promise: (client) => client.post('api-department.getDeptPermssion', params)
    }
}
/**保存设置 */

export function addLogistic(params) {
    return {
        types: [ADD, ADD_SUCCESS, ADD_FAILURE],
        promise: (client) => client.post('api-department.insertadminRoleInfo', params)
    }
}

export default function reducer(state = { result: {} }, action) {
    state = {...state};
    switch (action.type) {
        case STRUCTURE:
        case LIST:
        case QUERY:
        case ADD:
            return {
                ...state,
            }
        case STRUCTURE_SUCCESS:
            return {
                ...state,
                result: action.result
            }
        case STRUCTURE_FAILURE:
            return {
                ...state
            }    
        case ADD_SUCCESS:
            return {
                ...state,
            }
        case ADD_FAILURE:
            return {
                ...state
            }
        case LIST_SUCCESS:
            return {
                ...state,
                listResult: action.result
            }
        case LIST_FAILURE:
            return {
                ...state
            }
        case QUERY_SUCCESS:
            return {
                ...state,
                queryResult: action.result
            }
        case QUERY_FAILURE:
            return {
                ...state
            }
        default:
            return state
    }
}
