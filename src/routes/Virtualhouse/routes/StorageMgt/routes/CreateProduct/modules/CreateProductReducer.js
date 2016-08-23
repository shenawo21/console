//获取商品类目列表
const OUTCATELIST = 'virtualhouse/OUTCATELIST';
const OUTCATELIST_SUCCESS = 'virtualhouse/OUTCATELIST_SUCCESS';
const OUTCATELIST_FAILURE = 'virtualhouse/OUTCATELIST_FAILURE';

//获取商品属性列表
const ATTRLIST = 'createProduct/ATTRLIST';
const ATTRLIST_SUCCESS = 'createProduct/ATTRLIST_SUCCESS';
const ATTRLIST_FAILURE = 'createProduct/ATTRLIST_FAILURE';

//获取商品品牌列表
const BRANDLIST = 'createProduct/BRANDLIST';
const BRANDLIST_SUCCESS = 'createProduct/BRANDLIST_SUCCESS';
const BRANDLIST_FAILURE = 'createProduct/BRANDLIST_FAILURE';

//新增商品提交
const ADDPRO = 'createProduct/ADDPRO';
const ADDPRO_SUCCESS = 'createProduct/ADDPRO_SUCCESS';
const ADDPRO_FAILURE = 'createProduct/ADDPRO_FAILURE';


/**
 * 获取商品类目
 * 
 * @export
 * @param params (description)
 * @returns (description)
 */
export function outCateList(params) {
  return {
    types: [OUTCATELIST, OUTCATELIST_SUCCESS, OUTCATELIST_FAILURE],
    promise: (client) => client.post('api-category.listAll', params)
  }
}

/**
 * 获取商品属性列表
 * 
 * @export
 * @param params (description)
 * @returns (description)
 */
export function getAttrList(params) {
  return {
    types: [ATTRLIST, ATTRLIST_SUCCESS, ATTRLIST_FAILURE],
    promise: (client) => client.post('/', params)
  }
}

/**
 * 获取商品品牌列表
 * 
 * @export
 * @param params (description)
 * @returns (description)
 */
export function getBrandList(params) {
  return {
    types: [BRANDLIST, BRANDLIST_SUCCESS, BRANDLIST_FAILURE],
    promise: (client) => client.post('/', params)
  }
}

/**
 * 新增商品提交
 * 
 * @export
 * @param params (description)
 * @returns (description)
 */
export function addPro(params) {
  return {
    types: [ADDPRO, ADDPRO_SUCCESS, ADDPRO_FAILURE],
    promise: (client) => client.post('api- productService.add', params)
  }
}

export default function reducer(state = {result:{}}, action) {
  state = {...state, loading : action.loading};
  switch (action.type) {
    case OUTCATELIST:
    case ATTRLIST:
    case BRANDLIST:
    case ADDPRO:
        return {
            ...state
        }
    case OUTCATELIST_SUCCESS:
        return {
            ...state,
            cateResult: action.result
        }
    case OUTCATELIST_FAILURE:
        return {
            ...state
        }
    case ATTRLIST_SUCCESS:
        return {
            ...state,
            attrResult: action.result
        }
    case ATTRLIST_FAILURE:
        return {
            ...state
        }
    case BRANDLIST_SUCCESS:
        return {
            ...state,
            brandResult: action.result
        }
    case BRANDLIST_FAILURE:
        return {
            ...state
        }
    case ADDPRO_SUCCESS:
        return {
            ...state,
            result: action.result
        }
    case ADDPRO_FAILURE:
        return {
            ...state
        }
    default:
      return state
  }
}
