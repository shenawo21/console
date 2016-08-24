//获取商品类目
const CATELIST = 'virtualhouse/CATELIST';
const CATELIST_SUCCESS = 'virtualhouse/CATELIST_SUCCESS';
const CATELIST_FAILURE = 'virtualhouse/CATELIST_FAILURE';

//根据商品类目获取规格属性列表
const SPECLIST = 'virtualhouse/SPECLIST';
const SPECLIST_SUCCESS = 'virtualhouse/SPECLIST_SUCCESS';
const SPECLIST_FAILURE = 'virtualhouse/SPECLIST_FAILURE';

//保存属性规格值
const ADDSPEC = 'virtualhouse/ADDSPEC';
const ADDSPEC_SUCCESS = 'virtualhouse/ADDSPEC_SUCCESS';
const ADDSPEC_FAILURE = 'virtualhouse/ADDSPEC_FAILURE';

/**
 * 获取商品类目
 *
 * @export
 * @param params (description)
 * @returns (description)
 */
export function getCateList(params) {
  return {
    types: [CATELIST, CATELIST_SUCCESS, CATELIST_FAILURE],
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
    promise: (client) => client.post('api-spec.getSpecByCategoryCode', params)
  }
}

/**
 * 保存属性规格值
 *
 * @export
 * @param params (description)
 * @returns (description)
 */
export function addSpec(params) {
  return {
    types: [ADDSPEC, ADDSPEC_SUCCESS, ADDSPEC_FAILURE],
    promise: (client) => client.post('api-enterpriseSpec.addEnterpriseSpec', params)
  }
}

export default function reducer(state = {result:{}}, action) {
  state = {...state, loading : action.loading};
  switch (action.type) {
    case CATELIST:
    case SPECLIST:
    case ADDSPEC:
        return {
            ...state
        }
    case CATELIST_SUCCESS:
        return {
            ...state,
            cateListResult: action.result
        }
    case CATELIST_FAILURE:
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
    case ADDSPEC_SUCCESS:
        return {
            ...state,
            result: action.result
        }
    case ADDSPEC_FAILURE:
        return {
            ...state
        }
    default:
      return state
  }
}
