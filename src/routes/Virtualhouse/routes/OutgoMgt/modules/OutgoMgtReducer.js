//获取仓库列表
const GETVIRLIST = 'virtualhouse/GETVIRLIST';
const GETVIRLIST_SUCCESS = 'virtualhouse/GETVIRLIST_SUCCESS';
const GETVIRLIST_FAILURE = 'virtualhouse/GETVIRLIST_FAILURE';

//出库管理提交
const STOREMANAGE = 'virtualhouse/STOREMANAGE';
const STOREMANAGE_SUCCESS = 'virtualhouse/STOREMANAGE_SUCCESS';
const STOREMANAGE_FAILURE = 'virtualhouse/STOREMANAGE_FAILURE';

//获取店铺列表
const GETSHOPLIST = 'virtualhouse/GETSHOPLIST';
const GETSHOPLIST_SUCCESS = 'virtualhouse/GETSHOPLIST_SUCCESS';
const GETSHOPLIST_FAILURE = 'virtualhouse/GETSHOPLIST_FAILURE';

/**
 * 获取仓库列表
 *
 * @export
 * @param params (description)
 * @returns (description)
 */
export function getVirList(params) {
  return {
    types: [GETVIRLIST, GETVIRLIST_SUCCESS, GETVIRLIST_FAILURE],
    promise: (client) => client.post('api-productService.ListVirtualDepot', params)
  }
}

/**
 * 出库管理提交
 *
 * @export
 * @param params (description)
 * @returns (description)
 */
export function storeManage(params) {
    console.log(params,'[]');
    return {
        types: [STOREMANAGE, STOREMANAGE_SUCCESS, STOREMANAGE_FAILURE],
        promise: (client) => client.post('api-productService.storeManage', params)
    }
}

/**
 * 获取店铺列表
 *
 * @export
 * @param params (description)
 * @returns (description)
 */
export function getShopList() {
    return {
        types: [GETSHOPLIST, GETSHOPLIST_SUCCESS, GETSHOPLIST_FAILURE],
        promise: (client) => client.post('api-shop.listEnterpriseShop')
    }
}

export default function reducer(state = {result:{}}, action) {
  state = {...state, loading : action.loading};
  switch (action.type) {
    case GETVIRLIST:
    case STOREMANAGE:
    case GETSHOPLIST:
        return {
            ...state,
            jump : false
        }
    case GETVIRLIST_SUCCESS:
        return {
            //...state,
            loading : action.loading,
            virListResult: action.result
        }
    case GETVIRLIST_FAILURE:
        return {
            ...state
        }
    case STOREMANAGE_SUCCESS:
        return {
            //...state,
            jump : true,
            loading : action.loading,
            result: action.result,
        }
    case STOREMANAGE_FAILURE:
        return {
            ...state
        }
    case GETSHOPLIST_SUCCESS:
        return {
            //...state,
            loading : action.loading,
            shopListResult: action.result
        }
    case GETSHOPLIST_FAILURE:
        return {
            ...state
        }
    default:
      return state
  }
}
