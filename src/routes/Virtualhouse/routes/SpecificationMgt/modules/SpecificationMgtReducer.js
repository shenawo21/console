//获取密码
const SPEC = 'virtualhouse/SPEC';
const SPEC_SUCCESS = 'virtualhouse/SPEC_SUCCESS';
const SPEC_FAILURE = 'virtualhouse/SPEC_FAILURE';

/**
 * 获取密码
 *
 * @export
 * @param params (description)
 * @returns (description)
 */
export function spec(params) {
  return {
    types: [SPEC, SPEC_SUCCESS, SPEC_FAILURE],
    promise: (client) => client.post('api-administrator.list', params)
  }
}

export default function reducer(state = {result:{}}, action) {
  state = {...state, loading : action.loading};
  switch (action.type) {
    case SPEC:
        return {
            ...state
        }
    case SPEC_SUCCESS:
        return {
            //...state,
            loading : action.loading,
            result: action.result
        }
    case SPEC_FAILURE:
        return {
            ...state
        }
    default:
      return state
  }
}
