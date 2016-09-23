const QUERY = 'logistics/QUERY';
const QUERY_SUCCESS = 'logistics/QUERY_SUCCESS';
const QUERY_FAILURE = 'logistics/QUERY_FAILURE';

const ISDEFAULT = 'logistics/ISDEFAULT';
const ISDEFAULT_SUCCESS = 'logistics/ISDEFAULT_SUCCESS';
const ISDEFAULT_FAILURE = 'logistics/ISDEFAULT_FAILURE';


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
    promise: (client) => client.post('api-enterpriseLogistic.pageEnLogistics', params)
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

export default function reducer(state = {result:{}}, action) {
  state = {...state, loading : action.loading};
  switch (action.type) {
    case QUERY:
    case ISDEFAULT:
        return {
            ...state
        }
    case QUERY_SUCCESS:
        return {
            //...state,
            result: action.result
        }
    case QUERY_FAILURE:
        return {
            ...state
        }
    case ISDEFAULT_SUCCESS:
        return {
            ...state,
            defaultResult: action.result
        }
    case ISDEFAULT_FAILURE:
        return {
            ...state
        }
    default:
      return state
  }
}
