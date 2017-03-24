//发货单查询
const QUERY = 'invoice/QUERY';
const QUERY_SUCCESS = 'invoice/QUERY_SUCCESS';
const QUERY_FAILURE = 'invoice/QUERY_FAILURE';

//已打单发货列表
const FORQUERY = 'invoice/FORQUERY';
const FORQUERY_SUCCESS = 'invoice/FORQUERY_SUCCESS';
const FORQUERY_FAILURE = 'invoice/FORQUERY_FAILURE';

//发货
const DELETE = 'invoice/DELETE';
const DELETE_SUCCESS = 'invoice/DELETE_SUCCESS';
const DELETE_FAILURE = 'invoice/DELETE_FAILURE';

//店铺列表
const SHOPLIST = 'applic/SHOPLIST';
const SHOPLIST_SUCCESS = 'applic/SHOPLIST_SUCCESS';
const SHOPLIST_FAILURE = 'applic/SHOPLIST_FAILURE';

//获取物流公司列表
const LOGISTICSlIST = 'service/LOGISTICSlIST';
const LOGISTICSlIST_SUCCESS = 'service/LOGISTICSlIST_SUCCESS';
const LOGISTICSlIST_FAILURE = 'service/LOGISTICSlIST_FAILURE';

//所属渠道
const CHANNEL = 'edit/CHANNEL';
const CHANNEL_SUCCESS = 'edit/CHANNEL_SUCCESS';
const CHANNEL_FAILURE = 'edit/CHANNEL_FAILURE';

/**
 * 发货单查询
 *api-tradesInfo.selectWaitSendGoods
 * @export
 * @param params (description)
 * @returns (description)
 */
export function queryList(params) {
  return {
    types: [QUERY, QUERY_SUCCESS, QUERY_FAILURE],
    promise: (client) => client.post('api-tradesInfo.selectWaitSendGoods', params, {hasMsg: true})
  }
}
/**
 * 已打单发货列表
 * api-tradesInfo.sendGoods
 * @export
 * @param params (description)
 * @returns (description)
 */
export function forQueryList(params) {
  return {
    types: [FORQUERY, FORQUERY_SUCCESS, FORQUERY_FAILURE],
    promise: (client) => client.post('api-tradesInfo.selectSendGoods', params)
  }
}
/**
 *发货
 *api-tradesInfo.sendGoods
 * @export
 * @param params (description)
 * @returns (description)
 */
export function deleteItem(params) {
  return {
    types: [DELETE, DELETE_SUCCESS, DELETE_FAILURE],
    promise: (client) => client.post('api-tradesInfo.sendGoods', params,{hasMsg: true})
  }
}
/**
 * 店铺列表
 *api-shop.listEnterpriseShop
 * @export
 * @param params (description)
 * @returns (description)
 */
export function getShopList(params) {
  return {
    types: [SHOPLIST, SHOPLIST_SUCCESS, SHOPLIST_FAILURE],
    promise: (client) => client.post('api-shop.listEnterpriseShop', params)
  }
}
/**
 * 获取物流公司列表
 * 
 * @export
 * @param params (description)
 * @returns (description)
 */
export function getLogisticsList(params) {
  return {
    types: [LOGISTICSlIST, LOGISTICSlIST_SUCCESS, LOGISTICSlIST_FAILURE],
    promise: (client) => client.post('api-enterpriseLogistic.listEnterpriseLogistics', params)
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
  state = {...state, loading: action.loading,isRefresh: false};
  switch (action.type) {
    case DELETE:
    case QUERY:
    case FORQUERY:
    case SHOPLIST:
    case LOGISTICSlIST:
    case CHANNEL:
      return {
        ...state
      }
    case DELETE_SUCCESS:
      return {
        ...state,
        dResult: action.result,
        isRefresh: true
      }
    case DELETE_FAILURE:
      return {
        ...state
      }
    case QUERY_SUCCESS:
      return {
        ...state,
        result: action.result,
        dResult:null
      }
    case QUERY_FAILURE:
      return {
        ...state
      }
    case FORQUERY_SUCCESS:
      return {
        ...state,
        result: action.result,
        dResult:null
      }
    case FORQUERY_FAILURE:
      return {
        ...state
      }
    case SHOPLIST_SUCCESS:
      return {
        ...state,
        shoplist: action.result
      }
    case SHOPLIST_FAILURE:
      return {
        ...state
      }
     case LOGISTICSlIST_SUCCESS:
      return {
          ...state,
          logisticResult: action.result
      }
    case LOGISTICSlIST_FAILURE:
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


