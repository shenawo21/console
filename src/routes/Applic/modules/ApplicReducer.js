//列表
const QUERY = 'applic/QUERY';
const QUERY_SUCCESS = 'applic/QUERY_SUCCESS';
const QUERY_FAILURE = 'applic/QUERY_FAILURE';
//删除
const DELETE = 'applic/DELETE';
const DELETE_SUCCESS = 'applic/DELETE_SUCCESS';
const DELETE_FAILURE = 'applic/DELETE_FAILURE';
//激活
const ENADLED = 'applic/ENADLED';
const ENADLED_SUCCESS = 'applic/ENADLED_SUCCESS';
const ENADLED_FAILURE = 'applic/ENADLED_FAILURE';
//禁用
const DISABLED = 'applic/DISABLED';
const DISABLED_SUCCESS = 'applic/DISABLED_SUCCESS';
const DISABLED_FAILURE = 'applic/DISABLED_FAILURE';

//所属渠道
const CHANNEL = 'edit/CHANNEL';
const CHANNEL_SUCCESS = 'edit/CHANNEL_SUCCESS';
const CHANNEL_FAILURE = 'edit/CHANNEL_FAILURE';

/**
 * 列表查询
 *api-shop.findShop
 * @export
 * @param params (description)
 * @returns (description)
 */
export function queryList(params) {
  return {
    types: [QUERY, QUERY_SUCCESS, QUERY_FAILURE],
    promise: (client) => client.post('api-shop.findShop', params)
  }
}

/**
 * 删除
 *api-shop.deleteShop
 * @export
 * @param params (description)
 * @returns (description)
 */
export function deleteItem(params) {
  return {
    types: [DELETE, DELETE_SUCCESS, DELETE_FAILURE],
    promise: (client) => client.post('api-shop.deleteShop', params)
  }
}

/**
 * 激活
 *api-shop.normalShop
 * @export
 * @param params (description)
 * @returns (description)
 */
export function enabledItem(params) {
  return {
    types: [ENADLED, ENADLED_SUCCESS, ENADLED_FAILURE],
    promise: (client) => client.post('api-shop.normalShop', params)
  }
}

/**
 * 禁用
 *api-shop.invisibleShop
 * @export
 * @param params (description)
 * @returns (description)
 */
export function disabledItem(params) {
  return {
    types: [DISABLED, DISABLED_SUCCESS, DISABLED_FAILURE],
    promise: (client) => client.post('api-shop.invisibleShop', params)
  }
}

/**
 * 所属渠道
 *api-channel.listChannel
 * @export
 * @param params (description)
 * @returns (description)
 */
export function channelList(params) {
  return {
    types: [CHANNEL, CHANNEL_SUCCESS, CHANNEL_FAILURE],
    promise: (client) => client.post('api-channel.listChannel', params)
  }
}

export default function reducer(state = {result: {}}, action) {
  state = {...state, loading: action.loading};
  switch (action.type) {
    case QUERY:
    case DELETE:
    case ENADLED:
    case DISABLED:
    case CHANNEL:
      return {
        ...state
      }
    case QUERY_SUCCESS:
      return {
        ...state,
        result: action.result
      }
    case QUERY_FAILURE:
      return {
        ...state
      }
    case DELETE_SUCCESS:
      return {
        ...state,
        deResult: action.result
      }
    case DELETE_FAILURE:
      return {
        ...state
      }
    case ENADLED_SUCCESS:
      return {
        ...state,
        enResult: action.result
      }
    case ENADLED_FAILURE:
      return {
        ...state
      }
    case DISABLED_SUCCESS:
      return {
        ...state,
        disResult: action.result
      }
    case DISABLED_FAILURE:
      return {
        ...state
      }
    case CHANNEL_SUCCESS:
      return {
        ...state,
        chResult: action.result
      }
    case CHANNEL_FAILURE:
      return {
        ...state
      }  
    default:
      return state
  }
}
