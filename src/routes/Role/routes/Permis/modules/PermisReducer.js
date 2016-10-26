//权限列表
const QUERY = 'permis/QUERY';
const QUERY_SUCCESS = 'permis/QUERY_SUCCESS';
const QUERY_FAILURE = 'permis/QUERY_FAILURE';

//权限修改
const MODIFY = 'permis/MODIFY';
const MODIFY_SUCCESS = 'permis/MODIFY_SUCCESS';
const MODIFY_FAILURE = 'permis/MODIFY_FAILURE';

/**
 * 权限列表
 *3.3.7
 * @export
 * @param params (description)
 * @returns (description)
 */
export function queryList(params) {
  return {
    types: [QUERY, QUERY_SUCCESS, QUERY_FAILURE],
    promise: (client) => client.post('api-roleService.roleDetail', params)
  }
}

/**
 * 权限修改
 *3.3.10
 * @export
 * @param params (description)
 * @returns (description)
 */
export function modifyItem(params) {
  return {
    types: [MODIFY, MODIFY_SUCCESS, MODIFY_FAILURE],
    promise: (client) => client.post('api-roleService.permissionModify', params)
  }
}

export default function reducer(state = {result: {}}, action) {
  switch (action.type) {
    case QUERY:
      return {
        ...state,
        isJump: false,
        loading: action.loading
      }
    case MODIFY:
      return {
         isJump: false
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
    case MODIFY_SUCCESS:
      return {
        isJump: true
      }
    case MODIFY_FAILURE:
      return {
        isJump: false
      }
    default:
      return state
  }
}
