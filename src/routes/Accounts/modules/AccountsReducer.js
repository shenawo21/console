
// 删除
const DELETE = 'accounts/DELETE';
const DELETE_SUCCESS = 'accounts/DELETE_SUCCESS';
const DELETE_FAILURE = 'accounts/DELETE_FAILURE';

//列表查询
const QUERY = 'accounts/QUERY';
const QUERY_SUCCESS = 'accounts/QUERY_SUCCESS';
const QUERY_FAILURE = 'accounts/QUERY_FAILURE';

// 所属账号组
const GROUP = 'accounts/GROUP';
const GROUP_SUCCESS = 'accounts/GROUP_SUCCESS';
const GROUP_FAILURE = 'accounts/GROUP_FAILURE';

// 重置密码
const PASSWORD = 'accounts/PASSWORD';
const PASSWORD_SUCCESS = 'accounts/PASSWORD_SUCCESS';
const PASSWORD_FAILURE = 'accounts/PASSWORD_FAILURE';
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
    promise: (client) => client.post('api-administrator.deleteAdmin', params)
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
    promise: (client) => client.post('api-administrator.listEn', params)
  }
}

// 账号组
export function group(params) {
  return {
    types: [GROUP, GROUP_SUCCESS, GROUP_FAILURE],
    promise: (client) => client.post('api-department.getDeptNameList', params, {'hasMsg' : true})
  }
}
// 重置密码
export function restPswd(params) {
  return {
    types: [PASSWORD, PASSWORD_SUCCESS, PASSWORD_FAILURE],
    promise: (client) => client.post('api-administrator.resetPasswordEn', params,{'hasMsg' : true})
  }
}

export default function reducer(state = {result:{}}, action) {
  state = {...state, loading : action.loading};
  switch (action.type) {
    case DELETE:
    case QUERY:
    case GROUP:
    case PASSWORD:
        return {
            ...state
        }
    
    case DELETE_SUCCESS:
        return {
            ...state,
            delResult: action.result
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
    case GROUP_SUCCESS:
        return {
            ...state,
            groupResult: action.result
        }
    case GROUP_FAILURE:
        return {
            ...state
     }
    case PASSWORD_SUCCESS:
        return {
            ...state,
            passwordResult: action.result
        }
    case PASSWORD_FAILURE:
        return {
            ...state
     }     
    default:
      return state
  }
}
