//获取商品类目列表
const OUTCATELIST = 'virtualhouse/OUTCATELIST';
const OUTCATELIST_SUCCESS = 'virtualhouse/OUTCATELIST_SUCCESS';
const OUTCATELIST_FAILURE = 'virtualhouse/OUTCATELIST_FAILURE';

//新增商品提交
const ADDPRO = 'createProduct/ADDPRO';
const ADDPRO_SUCCESS = 'createProduct/ADDPRO_SUCCESS';
const ADDPRO_FAILURE = 'createProduct/ADDPRO_FAILURE';

//获取spu商品列表
const LISTVIEW = 'virtualhouse/LISTVIEW';
const LISTVIEW_SUCCESS = 'virtualhouse/LISTVIEW_SUCCESS';
const LISTVIEW_FAILURE = 'virtualhouse/LISTVIEW_FAILURE';

//根据商品类目获取规格属性列表
const SPECLIST = 'virtualhouse/SPECLIST';
const SPECLIST_SUCCESS = 'virtualhouse/SPECLIST_SUCCESS';
const SPECLIST_FAILURE = 'virtualhouse/SPECLIST_FAILURE';

//根据已选spuId获取该条数据的属性列表
const SPUSPECLIST = 'virtualhouse/SPUSPECLIST';
const SPUSPECLIST_SUCCESS = 'virtualhouse/SPUSPECLIST_SUCCESS';
const SPUSPECLIST_FAILURE = 'virtualhouse/SPUSPECLIST_FAILURE';

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
 * 根据商品类目获取规格属性列表
 *
 * @export
 * @param params (description)
 * @returns (description)
 */
export function getSpecByCateList(params) {
  return {
    types: [SPECLIST, SPECLIST_SUCCESS, SPECLIST_FAILURE],
    promise: (client) => client.post('api-enterpriseSpec.listView', params)
  }
}

/**
 * 根据已选spuId获取该条数据的属性列表
 *
 * @export
 * @param params (description)
 * @returns (description)
 */
export function getSpecBySpu(params) {
  return {
    types: [SPUSPECLIST, SPUSPECLIST_SUCCESS, SPUSPECLIST_FAILURE],
    promise: (client) => client.post('api-enterpriseSpec.getSpuSpecList', params)
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
    promise: (client) => client.post('api-productService.add', params)
  }
}

/**
 * 获取spu商品列表
 *
 * @export
 * @param params (description)
 * @returns (description)
 */
export function listView(params) {
  return {
    types: [LISTVIEW, LISTVIEW_SUCCESS, LISTVIEW_FAILURE],
    promise: (client) => client.post('api-productService.listView', params)
  }
}

export default function reducer(state = {result:{}}, action) {
  state = {...state, loading : action.loading};
  switch (action.type) {
    case OUTCATELIST:
    case SPECLIST:
    case SPUSPECLIST:
    case ADDPRO:
    case LISTVIEW:
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
    case SPECLIST_SUCCESS:
        return {
            ...state,
            specListResult: action.result
        }
    case SPECLIST_FAILURE:
        return {
            ...state
        }
    case SPUSPECLIST_SUCCESS:
        return {
            ...state,
            specListResult: action.result
        }
    case SPUSPECLIST_FAILURE:
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
    case LISTVIEW_SUCCESS:
        return {
            ...state,
            listViewResult: action.result
        }
     case LISTVIEW_FAILURE:
        return {
            ...state
        }
    default:
      return state
  }
}
