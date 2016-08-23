//店铺对接
const MODIFY = 'joint/MODIFY';
const MODIFY_SUCCESS = 'joint/MODIFY_SUCCESS';
const MODIFY_FAILURE = 'joint/MODIFY_FAILURE';

//店铺详情
const VIEW = 'joint/VIEW';
const VIEW_SUCCESS = 'joint/VIEW_SUCCESS';
const VIEW_FAILURE = 'joint/VIEW_FAILURE';

/**
 * 店铺对接
 *api-shop.settingsShop
 * @export
 * @param params (description)
 * @returns (description)
 */
export function modifyItem(params) {
  return {
    types: [MODIFY, MODIFY_SUCCESS, MODIFY_FAILURE],
    promise: (client) => client.post('api-shop.settingsShop', params)
  }
}

/**
 * 单条查看
 *api-shop.getShop
 * @export
 * @param params (description)
 * @returns (description)
 */
export function view(params) {
  return {
    types: [VIEW, VIEW_SUCCESS, VIEW_FAILURE],
    promise: (client) => client.post('api-shop.getShop', params)
  }
}

export default function reducer(state = {result: {}}, action) {
  state = {...state, isJump: false, loading: action.loading};
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
        result: action.result,
        isJump: true
      }
    case MODIFY_FAILURE:
      return {
        ...state,
        isJump: false
      }
    default:
      return state
  }
}
