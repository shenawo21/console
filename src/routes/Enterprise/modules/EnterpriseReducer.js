//企业详情
const VIEW = 'enterprise/VIEW';
const VIEW_SUCCESS = 'enterprise/VIEW_SUCCESS';
const VIEW_FAILURE = 'enterprise/VIEW_FAILURE';

//企业修改
const MODIFY = 'enterprise/MODIFY';
const MODIFY_SUCCESS = 'enterprise/MODIFY_SUCCESS';
const MODIFY_FAILURE = 'enterprise/MODIFY_FAILURE';


/**
 * 企业详情
 *
 * @export
 * @param params (description)
 * @returns (description)
 */
export function view(params) {
  return {
    types: [VIEW, VIEW_SUCCESS, VIEW_FAILURE],
    promise: (client) => client.post('api-enterprise.get', params)
  }
}

/**
 * 企业修改
 *
 * @export
 * @param params (description)
 * @returns (description)
 */
export function modifyItem(params) {
  return {
    types: [MODIFY, MODIFY_SUCCESS, MODIFY_FAILURE],
    promise: (client) => client.post('api-enterprise.update', params)
  }
}

export default function reducer(state = {result: {}}, action) {
  state = {...state, loading: action.loading};
  switch (action.type) {
    case VIEW:
    case MODIFY:
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
