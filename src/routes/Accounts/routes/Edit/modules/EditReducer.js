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

//获取企业列表
const GETENTERLIST = 'accounts/GETENTERLIST';
const GETENTERLIST_SUCCESS = 'accounts/GETENTERLIST_SUCCESS';
const GETENTERLIST_FAILURE = 'accounts/GETENTERLIST_FAILURE';

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
    promise: (client) => client.post('api-administrator.getAdministrator', params)
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
    promise: (client) => client.post('api-administrator.updateAdmin', params)
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
    promise: (client) => client.post('api-administrator.addAdmin', params)
  }
}

/**
 * 获取企业列表
 *
 * @export
 * @param params (description)
 * @returns (description)
 */
export function getEnterList(params) {
  return {
    types: [GETENTERLIST, GETENTERLIST_SUCCESS, GETENTERLIST_FAILURE],
    promise: (client) => client.post('api-enterprise.find', params)
  }
}

export default function reducer(state = {result:{}}, action) {
  state = {...state, loading : action.loading};
  switch (action.type) {
    case VIEW:
    case ADD:
    case MODIFY:
    case GETENTERLIST:
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
    case GETENTERLIST_SUCCESS:
        return {
            //...state,
            result: action.result
        }
    case GETENTERLIST_FAILURE:
        return {
            ...state
        }
    default:
      return state
  }
}
