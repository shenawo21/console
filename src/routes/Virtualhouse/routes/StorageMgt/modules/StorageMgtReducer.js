
//获取角色列表
const GETROLELIST = 'virtualhouse/GETROLELIST';
const GETROLELIST_SUCCESS = 'virtualhouse/GETROLELIST_SUCCESS';
const GETROLELIST_FAILURE = 'virtualhouse/GETROLELIST_FAILURE';

/**
 * 获取角色列表
 *
 * @export
 * @param params (description)
 * @returns (description)
 */
export function getRoleList(params) {
  return {
    types: [GETROLELIST, GETROLELIST_SUCCESS, GETROLELIST_FAILURE],
    promise: (client) => client.post('api-roleService.roleListResult', params)
  }
}

export default function reducer(state = {result:{}}, action) {
  state = {...state, loading : action.loading};
  switch (action.type) {

    case GETROLELIST:
        return {
            ...state,
            jump : false
        }

     case GETROLELIST_SUCCESS:
        return {
            ...state,
            roleListResult: action.result
        }
    case GETROLELIST_FAILURE:
        return {
            ...state
        }
    default:
      return state
  }
}
