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

//检查是否存在某个企业的管理员账号
const GETENTERLIST = 'accounts/GETENTERLIST';
const GETENTERLIST_SUCCESS = 'accounts/GETENTERLIST_SUCCESS';
const GETENTERLIST_FAILURE = 'accounts/GETENTERLIST_FAILURE';

//获取企业列表
const CHECKENCODE = 'accounts/CHECKENCODE';
const CHECKENCODE_SUCCESS = 'accounts/CHECKENCODE_SUCCESS';
const CHECKENCODE_FAILURE = 'accounts/CHECKENCODE_FAILURE';

//获取角色列表
const GETROLELIST = 'accounts/GETROLELIST';
const GETROLELIST_SUCCESS = 'accounts/GETROLELIST_SUCCESS';
const GETROLELIST_FAILURE = 'accounts/GETROLELIST_FAILURE';


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
 * 检查是否存在某个企业的管理员账号
 *
 * @export
 * @param params (description)
 * @returns (description)
 */
export function checkEnCode(params) {
  return {
    types: [CHECKENCODE, CHECKENCODE_SUCCESS, CHECKENCODE_FAILURE],
    promise: (client) => client.post('api-administrator.checkAdminByEnCode', params, {'hasMsg' : true})
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
    case VIEW:
    case ADD:
    case MODIFY:
    case CHECKENCODE:
    case GETENTERLIST:
    case GETROLELIST:
        return {
            ...state,
            jump : false
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
            ...state,
            jump : true,
            result: action.result
        }
    case MODIFY_FAILURE:
        return {
            ...state,
            jump : false
        }
    case CHECKENCODE_SUCCESS:
        return {
            ...state,
            checkResult: action.result
        }
    case CHECKENCODE_FAILURE:
        return {
            ...state
        }
     case GETENTERLIST_SUCCESS:
        return {
            ...state,
            enListResult: action.result
        }
    case GETENTERLIST_FAILURE:
        return {
            ...state
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
