const ADJUSTSTOCK = 'adjustStock/ADJUSTSTOCK';
const ADJUSTSTOCK_SUCCESS = 'adjustStock/ADJUSTSTOCK_SUCCESS';
const ADJUSTSTOCK_FAILURE = 'adjustStock/ADJUSTSTOCK_FAILURE';

const GETAIRLIST = 'adjustStock/GETAIRLIST';
const GETAIRLIST_SUCCESS = 'adjustStock/GETAIRLIST_SUCCESS';
const GETAIRLIST_FAILURE = 'adjustStock/GETAIRLIST_FAILURE';


//获取商品类目列表
const ADSTOCKCATELIST = 'virtualhouse/ADSTOCKCATELIST';
const ADSTOCKCATELIST_SUCCESS = 'virtualhouse/ADSTOCKCATELIST_SUCCESS';
const ADSTOCKCATELIST_FAILURE = 'virtualhouse/ADSTOCKCATELIST_FAILURE';

/**
 * 调整库存
 * 
 * @export
 * @param params (description)
 * @returns (description)
 */
export function adjustStock(params) {
  return {
    types: [ADJUSTSTOCK, ADJUSTSTOCK_SUCCESS, ADJUSTSTOCK_FAILURE],
    promise: (client) => client.post('api-productService.adjustStock', params)
  }
}

/**
 * 获取虚拟总仓列表
 * 
 * @export
 * @param params (description)
 * @returns (description)
 */
export function getAirList(params) {
  return {
    types: [GETAIRLIST, GETAIRLIST_SUCCESS, GETAIRLIST_FAILURE],
    promise: (client) => client.post('api-productService.ListVirtualDepot', params)
  }
}

/**
 * 商品类目列表
 *
 * @export
 * @param params (description)
 * @returns (description)
 */
export function adStockCateList(params) {
  return {
    types: [ADSTOCKCATELIST, ADSTOCKCATELIST_SUCCESS, ADSTOCKCATELIST_FAILURE],
    promise: (client) => client.post('api-category.listAll', params)
  }
}

export default function reducer(state = {result:{}}, action) {
  state = {...state, loading : action.loading};
  switch (action.type) {
    case ADJUSTSTOCK:
    case GETAIRLIST:
    case ADSTOCKCATELIST:
        return {
            ...state,
            jump: false
        }
    case ADJUSTSTOCK_SUCCESS:
        return {
            ...state,
            result: action.result,
            jump: true
        }
    case ADJUSTSTOCK_FAILURE:
        return {
            ...state
        }
    case GETAIRLIST_SUCCESS:
        return {
            ...state,
            airListResult: action.result
        }
    case GETAIRLIST_FAILURE:
        return {
            ...state
        }
    case ADSTOCKCATELIST_SUCCESS:
        return {
            ...state,
            cateResult: action.result
        }
    case ADSTOCKCATELIST_FAILURE:
        return {
            ...state
        }
    default:
      return state
  }
}
