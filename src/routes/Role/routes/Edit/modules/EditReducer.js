//角色新增
const ADD = 'role/ADD';
const ADD_SUCCESS = 'role/ADD_SUCCESS';
const ADD_FAILURE = 'role/ADD_FAILURE';

//角色详情
const VIEW = 'role/VIEW';
const VIEW_SUCCESS = 'role/VIEW_SUCCESS';
const VIEW_FAILURE = 'role/VIEW_FAILURE';

//角色修改
const MODIFY = 'role/MODIFY';
const MODIFY_SUCCESS = 'role/MODIFY_SUCCESS';
const MODIFY_FAILURE = 'role/MODIFY_FAILURE';
/**
 * 角色新增
 *3.3.1
 * @export
 * @param params (description)
 * @returns (description)
 */
export function addItem(params) {
  return {
    types: [ADD, ADD_SUCCESS, ADD_FAILURE],
    promise: (client) => client.post('api-roleService.add', params)
  }
}
/**
 * 角色详情
 *3.3.4
 * @export
 * @param params (description)
 * @returns (description)
 */
export function view(params) {
  return {
    types: [VIEW, VIEW_SUCCESS, VIEW_FAILURE],
    promise: (client) => client.post('api-roleService.roleDetail', params)
  }
}
/**
 * 角色修改
 *3.3.5
 * @export
 * @param params (description)
 * @returns (description)
 */
export function modifyItem(params) {
  return {
    types: [MODIFY, MODIFY_SUCCESS, MODIFY_FAILURE],
    promise: (client) => client.post('api-roleService.update', params)
  }
}

export default function reducer(state = {result: {}}, action) {
  state = {...state, loading: action.loading};
  switch (action.type) {
    case ADD:
    case VIEW:
    case MODIFY:
      return {
        ...state,
        jump: false
      }
    case ADD_SUCCESS:
      return {
        result: action.result,
        jump: true
      }
    case ADD_FAILURE:
      return {
        ...state
      }
    case VIEW_SUCCESS:
      return {
        ...state,
        result: action.result
      }
    case VIEW_FAILURE:
      return {
        ...state
      }
    case MODIFY_SUCCESS:
      return {
        ...state,
        result: action.result,
        jump: true
      }
    case MODIFY_FAILURE:
      return {
        ...state
      }
    default:
      return state
  }
}
