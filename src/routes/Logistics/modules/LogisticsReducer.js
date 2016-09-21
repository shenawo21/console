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
export function isDefault(params) {
  return {
    types: [ISDEFAULT, ISDEFAULT_SUCCESS, ISDEFAULT_FAILURE],
    promise: (client) => client.post('api-enterpriseIndustry.isDefault', params)
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


export default function reducer(state = {result:{}}, action) {
  state = {...state, loading : action.loading};
  switch (action.type) {
    case LIST:
    case ISDEFAULT:
    case QUERY:
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
