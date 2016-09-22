const ADD = 'addLogistics/ADD';
const ADD_SUCCESS = 'addLogistics/ADD_SUCCESS';
const ADD_FAILURE = 'addLogistics/ADD_FAILURE';

const LIST = 'addLogistics/LIST';
const LIST_SUCCESS = 'addLogistics/LIST_SUCCESS';
const LIST_FAILURE = 'addLogistics/LIST_FAILURE';

const QUERY = 'addLogistics/QUERY';
const QUERY_SUCCESS = 'addLogistics/QUERY_SUCCESS';
const QUERY_FAILURE = 'addLogistics/QUERY_FAILURE';

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
 * 获取平台物流列表
 * 
 * @export
 * @param params (description)
 * @returns (description)
 */
export function getListLogistic(params) {
    return {
        types: [LIST, LIST_SUCCESS, LIST_FAILURE],
        promise: (client) => client.post('api-logistic.listLogistic', params)
    }
}

/**
 * 获取企业物流公司
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
        case LIST:
        case QUERY:
        case ADD:
            return {
                ...state,
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
