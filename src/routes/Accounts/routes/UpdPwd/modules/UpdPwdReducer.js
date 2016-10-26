//获取密码
const VIEWPWD = 'accounts/VIEWPWD';
const VIEWPWD_SUCCESS = 'accounts/VIEWPWD_SUCCESS';
const VIEWPWD_FAILURE = 'accounts/VIEWPWD_FAILURE';

//修改密码
const UPDPWD = 'accounts/UPDPWD';
const UPDPWD_SUCCESS = 'accounts/UPDPWD_SUCCESS';
const UPDPWD_FAILURE = 'accounts/UPDPWD_FAILURE';

/**
 * 修改密码
 *
 * @export
 * @param params (description)
 * @returns (description)
 */
export function modifyItem(params) {
  return {
    types: [UPDPWD, UPDPWD_SUCCESS, UPDPWD_FAILURE],
    promise: (client) => client.post('api-administrator.updPwd', params)
  }
}

export default function reducer(state = {result:{}}, action) {
  state = {...state, loading : action.loading};
  switch (action.type) {
    case VIEWPWD:
    case UPDPWD:
        return {
            ...state
        }
    case VIEWPWD_SUCCESS:
        return {
            //...state,
            loading : action.loading,
            result: action.result
        }
    case VIEWPWD_FAILURE:
        return {
            ...state
        }  
    case UPDPWD_SUCCESS:
        return {
            //...state,
            loading : action.loading,
            result: action.result
        }
    case UPDPWD_FAILURE:
        return {
            ...state
        }
    default:
      return state
  }
}
