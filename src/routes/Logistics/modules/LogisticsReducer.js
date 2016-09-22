const ADD = 'logistics/ADD';
const ADD_SUCCESS = 'logistics/ADD_SUCCESS';
const ADD_FAILURE = 'logistics/ADD_FAILURE';

const LIST = 'logistics/LIST';
const LIST_SUCCESS = 'logistics/LIST_SUCCESS';
const LIST_FAILURE = 'logistics/LIST_FAILURE';

const ISDEFAULT = 'logistics/ISDEFAULT';
const ISDEFAULT_SUCCESS = 'logistics/ISDEFAULT_SUCCESS';
const ISDEFAULT_FAILURE = 'logistics/ISDEFAULT_FAILURE';

const QUERY = 'logistics/QUERY';
const QUERY_SUCCESS = 'logistics/QUERY_SUCCESS';
const QUERY_FAILURE = 'logistics/QUERY_FAILURE';

/**
 * 选中添加物流企业
 * 
 * @export
 * @returns
 */

export function addLogistic() {
    return {
        type: [ADD, ADD_SUCCESS, ADD_FAILURE],
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
 * 设为默认
 * 
 * @export
 * @param params (description)
 * @returns (description)
 */
export function setDefault(params) {
    return {
        types: [ISDEFAULT, ISDEFAULT_SUCCESS, ISDEFAULT_FAILURE],
        promise: (client) => client.post('api-enterpriseLogistic.isDefault', params)
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
    state = {...state, loading: action.loading };
    switch (action.type) {
        case LIST:
        case ISDEFAULT:
        case QUERY:
        case ADD:
            return {
            ...state
            }
        case ADD_SUCCESS:
            return {
                addResult: action.result
            }
        case ADD_FAILURE:
            return {
            ...state
            }
        case LIST_SUCCESS:
            return {
                //...state,
                listResult: action.result
            }
        case LIST_FAILURE:
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
