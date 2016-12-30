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

/**
 * 权限列表
 *3.3.7
 * @export
 * @param params (description)
 * @returns (description)
 */
export function structure(params) {
  return {
    types: [STRUCTURE, STRUCTURE_SUCCESS, STRUCTURE_FAILURE],
    promise: (client) => client.post('api-roleService.roleDetail', params)
  }
}

/**
 * 选中添加物流企业
 * 
 * @export
 * @returns
 */

export function addLogistic(params) {
    return {
        types: [ADD, ADD_SUCCESS, ADD_FAILURE],
        promise: (client) => client.post('api-enterpriseLogistic.add', params)
    }
}
/**
 * 获取平台物流列表（不分页）
 * 
 * @export
 * @param params (description)
 * @returns (description)
 */
export function getListLogistic(params) {
    return {
        types: [LIST, LIST_SUCCESS, LIST_FAILURE],
        promise: (client) => client.post('api-logistic.listLogisticEn', params)
    }
}

/**
 * 获取企业物流公司（不分页）
 * 
 * @export
 * @param params (description)
 * @returns (description)
 */
export function queryList(params) {
    return {
        types: [QUERY, QUERY_SUCCESS, QUERY_FAILURE],
        promise: (client) => client.post('api-enterpriseLogistic.listEnterpriseLogistics', params)
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
