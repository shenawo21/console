//获取单条数据
const VIEW = 'service/VIEW';
const VIEW_SUCCESS = 'service/VIEW_SUCCESS';
const VIEW_FAILURE = 'service/VIEW_FAILURE';

//获取待验收商品信息
const VIEWFORCHECK = 'service/VIEWFORCHECK';
const VIEWFORCHECK_SUCCESS = 'service/VIEWFORCHECK_SUCCESS';
const VIEWFORCHECK_FAILURE = 'service/VIEWFORCHECK_FAILURE';

//获取物流公司列表
const LOGISTICSlIST = 'service/LOGISTICSlIST';
const LOGISTICSlIST_SUCCESS = 'service/LOGISTICSlIST_SUCCESS';
const LOGISTICSlIST_FAILURE = 'service/LOGISTICSlIST_FAILURE';

//提交验收结果
const CHECK = 'service/CHECK';
const CHECK_SUCCESS = 'service/CHECK_SUCCESS';
const CHECK_FAILURE = 'service/CHECK_FAILURE';

/**
 * 获取单条数据
 * 
 * @export
 * @param params (description)
 * @returns (description)
 */
export function view(params) {
  return {
    types: [VIEW, VIEW_SUCCESS, VIEW_FAILURE],
    promise: (client) => client.post('api-warehouseDispose.getCheckedByRefundId', params)
  }
}

/**
 * 获取单条数据
 * 
 * @export
 * @param params (description)
 * @returns (description)
 */
export function viewForcheck(params) {
  return {
    types: [VIEWFORCHECK, VIEWFORCHECK_SUCCESS, VIEWFORCHECK_FAILURE],
    promise: (client) => client.post('api-warehouseDispose.getViewRefundApplyByTidAndSkuId', params)
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
    promise: (client) => client.post('api-warehouseDispose.getViewRefundApplyByTidAndSkuId', params)
  }
}

/**
 * 提交验收结果
 * 
 * @export
 * @param params (description)
 * @returns (description)
 */
export function doCheck(params) {
  return {
    types: [CHECK, CHECK_SUCCESS, CHECK_FAILURE],
    promise: (client) => client.post('api-warehouseDispose.doCheck', params)
  }
}

export default function reducer(state = {result:{}}, action) {
  state = {...state, loading : action.loading};
  switch (action.type) {
    case VIEW:
    case VIEWFORCHECK:
    case LOGISTICSlIST:
    case CHECK:
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
    case CHECK_SUCCESS:
        return {
            ...state,
            checkResult: action.result
        }
    case CHECK_FAILURE:
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
    case VIEWFORCHECK_SUCCESS:
        return {
            ...state,
            forchekResult: action.result
        }
    case VIEWFORCHECK_FAILURE:
        return {
            ...state
        }
    default:
      return state
  }
}
