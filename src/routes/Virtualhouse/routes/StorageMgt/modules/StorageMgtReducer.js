
//入库管理提交
const STORAGEMGT = 'virtualhouse/STORAGEMGT';
const STORAGEMGT_SUCCESS = 'virtualhouse/STORAGEMGT_SUCCESS';
const STORAGEMGT_FAILURE = 'virtualhouse/STORAGEMGT_FAILURE';

//获取待入库商品列表
const GETPROLIST = 'virtualhouse/GETPROLIST';
const GETPROLIST_SUCCESS = 'virtualhouse/GETPROLIST_SUCCESS';
const GETPROLIST_FAILURE = 'virtualhouse/GETPROLIST_FAILURE';

/**
 * 入库管理提交
 *
 * @export
 * @param params (description)
 * @returns (description)
 */
export function storageMgtAction(params) {
  return {
    types: [STORAGEMGT, STORAGEMGT_SUCCESS, STORAGEMGT_FAILURE],
    promise: (client) => client.post('api-productService.saveStcokInRecord', params)
  }
}

/**
 * 获取待入库商品列表
 *
 * @export
 * @param params (description)
 * @returns (description)
 */
export function getProList(params) {
  return {
    types: [GETPROLIST, GETPROLIST_SUCCESS, GETPROLIST_FAILURE],
    promise: (client) => client.post('api-productService.getNoStockRecordSku', params)
  }
}

export default function reducer(state = {result:{}}, action) {
  state = {...state, loading : action.loading};
  switch (action.type) {
    case STORAGEMGT:
    case GETPROLIST:
        return {
            ...state,
            jump : false
        }
     case STORAGEMGT_SUCCESS:
        return {
            ...state,
            result: action.result
        }
     case STORAGEMGT_FAILURE:
        return {
            ...state
        }
     case GETPROLIST_SUCCESS:
        return {
            ...state,
            proListResult: action.result
        }
     case GETPROLIST_FAILURE:
        return {
            ...state
        }     
    default:
      return state
  }
}
