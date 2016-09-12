//店铺列表
const APPQUERY = 'add/APPQUERY';
const APPQUERY_SUCCESS = 'add/APPQUERY_SUCCESS';
const APPQUERY_FAILURE = 'add/APPQUERY_FAILURE';
//物流公司列表
const COMPANY = 'add/COMPANY';
const COMPANY_SUCCESS = 'add/COMPANY_SUCCESS';
const COMPANY_FAILURE = 'add/COMPANY_FAILURE';
//省市区列表
const ADDR = 'add/ADDR';
const ADDR_SUCCESS = 'add/ADDR_SUCCESS';
const ADDR_FAILURE = 'add/ADDR_FAILURE';
//新建订单
const ADD = 'add/ADD';
const ADD_SUCCESS = 'add/ADD_SUCCESS';
const ADD_FAILURE = 'add/ADD_FAILURE';


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
/**
 * 新建订单
 *api-tradesInfo.createOrder
 * @export
 * @param params (description)
 * @returns (description)
 */
export function addItem(params) {
  return {
    types: [ADD, ADD_SUCCESS, ADD_FAILURE],
    promise: (client) => client.post('api-tradesInfo.createOrder', params)
  }
}

export default function reducer(state = {result:{}}, action) {
  state = {...state, loading : action.loading};
  switch (action.type) {
    case APPQUERY:
    case COMPANY:
    case ADDR:
    case ADD:
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
    case COMPANY_SUCCESS:
      return {
        ...state,
        cResult: action.result
      }
    case COMPANY_FAILURE:
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
    case ADD_SUCCESS:
        return {
            //...state,
            result: action.result
        }
    case ADD_FAILURE:
        return {
            ...state
        }
    default:
      return state
  }
}
