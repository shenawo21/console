//店铺列表
const APPQUERY = 'applic/APPQUERY';
const APPQUERY_SUCCESS = 'applic/APPQUERY_SUCCESS';
const APPQUERY_FAILURE = 'applic/APPQUERY_FAILURE';

//历史订单查询
const QUERY = 'history/QUERY';
const QUERY_SUCCESS = 'history/QUERY_SUCCESS';
const QUERY_FAILURE = 'history/QUERY_FAILURE';

//所属渠道
const CHANNEL = 'edit/CHANNEL';
const CHANNEL_SUCCESS = 'edit/CHANNEL_SUCCESS';
const CHANNEL_FAILURE = 'edit/CHANNEL_FAILURE';

/**
 * 店铺列表
 *api-shop.listEnterpriseShop
 * @export
 * @param params (description)
 * @returns (description)
 */
export function appList(params) {
  return {
    types: [APPQUERY, APPQUERY_SUCCESS, APPQUERY_FAILURE],
    promise: (client) => client.post('api-shop.listEnterpriseShop', params)
  }
}

/**
 * 历史订单查询
 *api-tradesInfo.historyOrders
 * @export
 * @param params (description)
 * @returns (description)
 */
export function queryList(params) {
  return {
    types: [QUERY, QUERY_SUCCESS, QUERY_FAILURE],
    promise: (client) => client.post('api-tradesInfo.historyOrders', params)
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
    case APPQUERY:
    case QUERY:
    case CHANNEL:
        return {
            ...state
        }
      return {
        ...state
      }
    case APPQUERY_SUCCESS:
      return {
        ...state,
        appResult: action.result
      }
    case APPQUERY_FAILURE:
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
