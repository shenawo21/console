//订单详情
const VIEW = 'detail/VIEW';
const VIEW_SUCCESS = 'detail/VIEW_SUCCESS';
const VIEW_FAILURE = 'detail/VIEW_FAILURE';
//提交发货（修改订单状态，并生成发货单）
const SEND = 'detail/SEND';
const SEND_SUCCESS = 'detail/SEND_SUCCESS';
const SEND_FAILURE = 'detail/SEND_FAILURE';
//订单状态修改（延迟发货、重新理单、解锁场景下使用）
const MODIFY = 'deal/MODIFY';
const MODIFY_SUCCESS = 'deal/MODIFY_SUCCESS';
const MODIFY_FAILURE = 'deal/MODIFY_FAILURE';
//物流公司列表
const COMPANY = 'deal/COMPANY';
const COMPANY_SUCCESS = 'deal/COMPANY_SUCCESS';
const COMPANY_FAILURE = 'deal/COMPANY_FAILURE';
//修改物流信息
const LOGIS = 'deal/LOGIS';
const LOGIS_SUCCESS = 'deal/LOGIS_SUCCESS';
const LOGIS_FAILURE = 'deal/LOGIS_FAILURE';
//省市区列表
const ADDR = 'deal/ADDR';
const ADDR_SUCCESS = 'deal/ADDR_SUCCESS';
const ADDR_FAILURE = 'deal/ADDR_FAILURE';

/**
 * 订单详情
 *api-tradesInfo.orderDetial
 * @export
 * @param params (description)
 * @returns (description)
 */
export function view(params) {
  return {
    types: [VIEW, VIEW_SUCCESS, VIEW_FAILURE],
    promise: (client) => client.post('api-tradesInfo.orderDetial', params)
  }
}
/**
 * 提交发货（修改订单状态，并生成发货单）
 *api-tradesInfo.submitOrder
 * @export
 * @param params (description)
 * @returns (description)
 */
export function submitOrder(params) {
  return {
    types: [SEND, SEND_SUCCESS, SEND_FAILURE],
    promise: (client) => client.post('api-tradesInfo.submitOrder', params)
  }
}
/**
 * 订单状态修改（延迟发货、重新理单、解锁场景下使用）
 *api-tradesInfo.modifyOrder
 * @export
 * @param params (description)
 * @returns (description)
 */
export function modifyItem(params) {
  return {
    types: [MODIFY, MODIFY_SUCCESS, MODIFY_FAILURE],
    promise: (client) => client.post('api-tradesInfo.modifyOrder', params)
  }
}
/**
 * 物流公司列表
 *api-enterpriseLogistic.listEnterpriseLogistics
 * @export
 * @param params (description)
 * @returns (description)
 */
export function companyList(params) {
  return {
    types: [COMPANY, COMPANY_SUCCESS, COMPANY_FAILURE],
    promise: (client) => client.post('api-enterpriseLogistic.listEnterpriseLogistics', params)
  }
}
/**
 * 修改物流信息
 *api-tradesInfo.modifyLogistics
 * @export
 * @param params (description)
 * @returns (description)
 */
export function modifyLogistics(params) {
  return {
    types: [LOGIS, LOGIS_SUCCESS, LOGIS_FAILURE],
    promise: (client) => client.post('api-tradesInfo.modifyLogistics', params)
  }
}
/**
 * 省市区列表
 *resources.get?path=static.resource.areas
 * @export
 * @param params (description)
 * @returns (description)
 */
export function addrList(params) {
  return {
    types: [ADDR, ADDR_SUCCESS, ADDR_FAILURE],
    promise: (client) => client.post('resources.get?path=static.resource.areas', params)
  }
}

export default function reducer(state = {result: {}}, action) {
  state = {...state,isJump:false, loading: action.loading};
  switch (action.type) {
    case VIEW:
    case SEND:
    case MODIFY:
    case COMPANY:
    case LOGIS:
    case ADDR:
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
    case SEND_SUCCESS:
      return {
        ...state,
        sendResult: action.result,
        isJump:true
      }
    case SEND_FAILURE:
      return {
        ...state
      }
    case MODIFY_SUCCESS:
      return {
        ...state,
        modResult: action.result,
        isJump:true
      }
    case MODIFY_FAILURE:
      return {
        ...state
      }
    case COMPANY_SUCCESS:
      return {
        ...state,
        cResult: action.result
      }
    case COMPANY_FAILURE:
      return {
        ...state
      }
    case LOGIS_SUCCESS:
      return {
        ...state,
        result: action.result,
        isLogis:true
      }
    case LOGIS_FAILURE:
      return {
        ...state
      }
    case ADDR_SUCCESS:
      return {
        ...state,
        addrResult: action.result
      }
    case ADDR_FAILURE:
      return {
        ...state
      }
    default:
      return state
  }
}





