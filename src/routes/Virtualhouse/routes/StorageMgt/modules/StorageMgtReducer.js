
//获取角色列表
const GETROLELIST1 = 'virtualhouse/GETROLELIST1';
const GETROLELIST1_SUCCESS = 'virtualhouse/GETROLELIST1_SUCCESS';
const GETROLELIST1_FAILURE = 'virtualhouse/GETROLELIST1_FAILURE';

/**
 * 获取角色列表
 *
 * @export
 * @param params (description)
 * @returns (description)
 */
export function getRoleList1(params) {
  return {
    types: [GETROLELIST1, GETROLELIST1_SUCCESS, GETROLELIST1_FAILURE],
    promise: (client) => client.post('api-roleService.roleListResult', params)
  }
}

export default function reducer(state = {result:{}}, action) {
  state = {...state, loading : action.loading};
  switch (action.type) {

    case GETROLELIST1:
        return {
            ...state,
            jump : false
        }

     case GETROLELIST1_SUCCESS:
        return {
            ...state,
            roleListResult: action.result
        }
    case GETROLELIST1_FAILURE:
        return {
            ...state
        }
    default:
      return state
  }
}
