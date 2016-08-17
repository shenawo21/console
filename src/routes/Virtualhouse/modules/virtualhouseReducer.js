
//列表查询
const VIRHOUSEQUERY = 'virtualhouse/VIRHOUSEQUERY';
const VIRHOUSEQUERY_SUCCESS = 'virtualhouse/VIRHOUSEQUERY_SUCCESS';
const VIRHOUSEQUERY_FAILURE = 'virtualhouse/VIRHOUSEQUERY_FAILURE';
//导出
const SHOPSTOCK = 'virtualhouse/SHOPSTOCK';
const SHOPSTOCK_SUCCESS = 'virtualhouse/SHOPSTOCK_SUCCESS';
const SHOPSTOCK_FAILURE = 'virtualhouse/SHOPSTOCK_FAILURE';

/**
 * 列表查询
 *
 * @export
 * @param params (description)
 * @returns (description)
 */
export function virhoustQueryList(params) {
  return {
    types: [VIRHOUSEQUERY, VIRHOUSEQUERY_SUCCESS, VIRHOUSEQUERY_FAILURE],
    promise: (client) => client.post('api-productService.ListVirtualDepot', params)
  }
}
/**
 * 获取单条出口库存
 *
 * @export
 * @param params (description)
 * @returns (description)
 */
export function getShopStocks(params) {
  return {
    types: [SHOPSTOCK, SHOPSTOCK_SUCCESS, SHOPSTOCK_FAILURE],
    promise: (client) => client.post('api-shopStock.getListBySkuId', params)
  }
}

export default function reducer(state = {result:{}}, action) {
  state = {...state, loading : action.loading};
  switch (action.type) {
    case VIRHOUSEQUERY:
    case SHOPSTOCK:
        return {
            ...state
        }
    case VIRHOUSEQUERY_SUCCESS:
        return {
            ...state,
            result: action.result
        }
    case VIRHOUSEQUERY_FAILURE:
        return {
            ...state
        }
    case SHOPSTOCK_SUCCESS:
        return {
            ...state,
            stockResult: action.result
        }
    case SHOPSTOCK_FAILURE:
        return {
            ...state
        }
    default:
      return state
  }
}
