//获取密码
const VIEWPWD = 'virtualhouse/VIEWPWD';
const VIEWPWD_SUCCESS = 'virtualhouse/VIEWPWD_SUCCESS';
const VIEWPWD_FAILURE = 'virtualhouse/VIEWPWD_FAILURE';

/**
 * 获取密码
 *
 * @export
 * @param params (description)
 * @returns (description)
 */
export function viewItem(params) {
  return {
    types: [VIEWPWD, VIEWPWD_SUCCESS, VIEWPWD_FAILURE],
    promise: (client) => client.post('api-administrator.updPwd', params)
  }
}

export default function reducer(state = {result:{}}, action) {
  state = {...state, loading : action.loading};
  switch (action.type) {
    case VIEWPWD:
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
    default:
      return state
  }
}
