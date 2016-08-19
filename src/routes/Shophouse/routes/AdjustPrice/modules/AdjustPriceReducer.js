
const PRICELIST = 'shophouse/PRICELIST';
const PRICELIST_SUCCESS = 'shophouse/PRICELIST_SUCCESS';
const PRICELIST_FAILURE = 'shophouse/PRICELIST_FAILURE';

const PRICEDEL = 'shophouse/PRICEDEL';
const PRICEDEL_SUCCESS = 'shophouse/PRICEDEL_SUCCESS';
const PRICEDEL_FAILURE = 'shophouse/PRICEDEL_FAILURE';

const PRICEMODIFY = 'shophouse/PRICEMODIFY';
const PRICEMODIFY_SUCCESS = 'shophouse/PRICEMODIFY_SUCCESS';
const PRICEMODIFY_FAILURE = 'shophouse/PRICEMODIFY_FAILURE';


/**
 * 新增
 * 
 * @export
 * @param params (description)
 * @returns (description)
 */
export function priceList(params) {
  return {
    types: [PRICELIST, PRICELIST_SUCCESS, PRICELIST_FAILURE],
    promise: (client) => client.post('/', params)
  }
}

/**
 * 删除
 * 
 * @export
 * @param params (description)
 * @returns (description)
 */
export function priceDel(params) {
  return {
    types: [PRICEDEL, PRICEDEL_SUCCESS, PRICEDEL_FAILURE],
    promise: (client) => client.post('/', params)
  }
}

/**
 * 修改
 * 
 * @export
 * @param params (description)
 * @returns (description)
 */
export function priceModify(params) {
  return {
    types: [PRICEMODIFY, PRICEMODIFY_SUCCESS, PRICEMODIFY_FAILURE],
    promise: (client) => client.post('/', params)
  }
}

export default function reducer(state = {result:{}}, action) {
  state = {...state, loading : action.loading};
  switch (action.type) {
    case PRICELIST:
    case PRICEDEL:
    case PRICEMODIFY:
        return {
            ...state
        }
    case PRICELIST_SUCCESS:
        return {
            //...state,
            result: action.result
        }
    case PRICELIST_FAILURE:
        return {
            ...state
        }
    case PRICEDEL_SUCCESS:
        return {
            //...state,
            result: action.result
        }
    case PRICEDEL_FAILURE:
        return {
            ...state
        }
    case PRICEMODIFY_SUCCESS:
        return {
            //...state,
            result: action.result
        }
    case PRICEMODIFY_FAILURE:
        return {
            ...state
        }
    default:
      return state
  }
}
