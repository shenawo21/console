//查看详情

const VIEW = 'accounts/VIEW';
const VIEW_SUCCESS = 'accounts/VIEW_SUCCESS';
const VIEW_FAILURE = 'accounts/VIEW_FAILURE';

//新增帐号
const ADD = 'accounts/ADD';
const ADD_SUCCESS = 'accounts/ADD_SUCCESS';
const ADD_FAILURE = 'accounts/ADD_FAILURE';

//修改帐号
const MODIFY = 'accounts/MODIFY';
const MODIFY_SUCCESS = 'accounts/MODIFY_SUCCESS';
const MODIFY_FAILURE = 'accounts/MODIFY_FAILURE';

/**
 * 单条查看
 *
 * @export
 * @param params (description)
 * @returns (description)
 */
export function view(params) {
  return {
    types: [VIEW, VIEW_SUCCESS, VIEW_FAILURE],
    promise: (client) => client.post('/suneee-cloud/api-administrator.getAdministrator', params)
  }
}

/**
 * 修改
 *
 * @export
 * @param params (description)
 * @returns (description)
 */
export function modifyItem(params) {
  return {
    types: [MODIFY, MODIFY_SUCCESS, MODIFY_FAILURE],
    promise: (client) => client.post('/suneee-cloud/api-administrator.updateAdmin', params)
  }
}

/**
 * 新增
 *
 * @export
 * @param params (description)
 * @returns (description)
 */
export function addItem(params) {
  return {
    types: [ADD, ADD_SUCCESS, ADD_FAILURE],
    promise: (client) => client.post('/suneee-cloud/api-administrator.addAdmin', params)
  }
}

export default function reducer(state = {result:{}}, action) {
  state = {...state, loading : action.loading};
  switch (action.type) {
    case VIEW:
    case ADD:
    case MODIFY:
        return {
            ...state
        }
    case VIEW_SUCCESS:
        return {
            //...state,
            loading : action.loading,
            result: action.result
        }
    case VIEW_FAILURE:
        return {
            ...state
        }    
    case ADD_SUCCESS:
        return {
            //...state,
            loading : action.loading,
            result: action.result
        }
    case ADD_FAILURE:
        return {
            ...state
        }
    case MODIFY_SUCCESS:
        return {
            //...state,
            result: action.result
        }
    case MODIFY_FAILURE:
        return {
            ...state
        }
    default:
      return state
  }
}
