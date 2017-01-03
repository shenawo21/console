//类目管理列表
const QUERY = 'category/QUERY';
const QUERY_SUCCESS = 'category/QUERY_SUCCESS';
const QUERY_FAILURE = 'category/QUERY_FAILURE';

//类目删除
const DELETE = 'category/DELETE';
const DELETE_SUCCESS = 'category/DELETE_SUCCESS';
const DELETE_FAILURE = 'category/DELETE_FAILURE';

/**
 * 类目管理列表 根据类目名称模糊查询符合的数据
 *api-category.findCategory
 * @export
 * @param params (description)
 * @returns (description)
 */
export function queryList(params) {
  return {
    types: [QUERY, QUERY_SUCCESS, QUERY_FAILURE],
    promise: (client) => client.post('api-category.findCategory', params,{'hasMsg' : true})
  }
}

/**
 * 删除
 *api-category.deleteCategory
 * @export
 * @param params (description)
 * @returns (description)
 */
export function deleteItem(params) {
  return {
    types: [DELETE, DELETE_SUCCESS, DELETE_FAILURE],
    promise: (client) => client.post('api-category.deleteCategory', params, {'hasMsg' : true})
  }
}

export default function reducer(state = {result: []}, action) {
  state = {...state, loading: action.loading};
  switch (action.type) {
    case DELETE:
    case QUERY:
      return {
        ...state
      }
    case DELETE_SUCCESS:
      return {
        ...state,
        delResult: action.result
      }
    case DELETE_FAILURE:
      return {
        ...state
      }
    case QUERY_SUCCESS:
      return {
        result: action.result
      }
    case QUERY_FAILURE:
      return {
        ...state
      }
    default:
      return state
  }
}
