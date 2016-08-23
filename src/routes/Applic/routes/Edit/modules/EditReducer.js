//企业详情
const VIEW = 'edit/VIEW';
const VIEW_SUCCESS = 'edit/VIEW_SUCCESS';
const VIEW_FAILURE = 'edit/VIEW_FAILURE';

//店铺新增
const ADD = 'edit/ADD';
const ADD_SUCCESS = 'edit/ADD_SUCCESS';
const ADD_FAILURE = 'edit/ADD_FAILURE';

//店铺列表
const CHANNEL = 'edit/CHANNEL';
const CHANNEL_SUCCESS = 'edit/CHANNEL_SUCCESS';
const CHANNEL_FAILURE = 'edit/CHANNEL_FAILURE';

//行业列表
const INDUSTRY = 'industry/INDUSTRY';
const INDUSTRY_SUCCESS = 'industry/INDUSTRY_SUCCESS';
const INDUSTRY_FAILURE = 'industry/INDUSTRY_FAILURE';

//店铺修改
const MODIFY = 'edit/MODIFY';
const MODIFY_SUCCESS = 'edit/MODIFY_SUCCESS';
const MODIFY_FAILURE = 'edit/MODIFY_FAILURE';
/**
 * 店铺详情
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
/**
 * 新增
 *api-shop.addShop
 * @export
 * @param params (description)
 * @returns (description)
 */
export function addItem(params) {
  return {
    types: [ADD, ADD_SUCCESS, ADD_FAILURE],
    promise: (client) => client.post('api-shop.addShop', params)
  }
}

/**
 * 店铺列表
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

/**
 * 行业列表
 *api-industry.findIndustry
 * @export
 * @param params (description)
 * @returns (description)
 */
export function industryList(params) {
  return {
    types: [INDUSTRY, INDUSTRY_SUCCESS, INDUSTRY_FAILURE],
    promise: (client) => client.post('api-industry.findIndustry', params)
  }
}
/**
 * 店铺修改
 *api-shop.updateProxyURL
 * @export
 * @param params (description)
 * @returns (description)
 */
export function modifyItem(params) {
  return {
    types: [MODIFY, MODIFY_SUCCESS, MODIFY_FAILURE],
    promise: (client) => client.post('api-shop.updateShop', params)
  }
}

export default function reducer(state = {result: {}}, action) {
  state = {...state, isJump: false, loading: action.loading};
  switch (action.type) {
    case VIEW:
    case ADD:
    case CHANNEL:
    case INDUSTRY:
    case MODIFY:
      return {
        ...state
      }
    case VIEW_SUCCESS:
      return {
        result: action.result
      }
    case VIEW_FAILURE:
      return {
        ...state
      }
    case ADD_SUCCESS:
      return {
        result: action.result,
        isJump: true
      }
    case ADD_FAILURE:
      return {
        ...state,
        isJump: false
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
    case INDUSTRY_SUCCESS:
      return {
        ...state,
        inResult: action.result
      }
    case INDUSTRY_FAILURE:
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
