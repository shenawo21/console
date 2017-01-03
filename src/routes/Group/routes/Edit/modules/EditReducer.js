//类目新增
const ADD = 'edit/ADD';
const ADD_SUCCESS = 'edit/ADD_SUCCESS';
const ADD_FAILURE = 'edit/ADD_FAILURE';

//类目详情
const VIEW = 'edit/VIEW';
const VIEW_SUCCESS = 'edit/VIEW_SUCCESS';
const VIEW_FAILURE = 'edit/VIEW_FAILURE';

//类目修改
const MODIFY = 'edit/MODIFY';
const MODIFY_SUCCESS = 'edit/MODIFY_SUCCESS';
const MODIFY_FAILURE = 'edit/MODIFY_FAILURE';

//类目列表
const QUERY = 'category/QUERY';
const QUERY_SUCCESS = 'category/QUERY_SUCCESS';
const QUERY_FAILURE = 'category/QUERY_FAILURE';
/**
 * 类目新增
 *api-category.addCategory
 * @export
 * @param params (description)
 * @returns (description)
 */
export function addItem(params) {
  return {
    types: [ADD, ADD_SUCCESS, ADD_FAILURE],
    promise: (client) => client.post('api-category.addCategory', params)
  }
}
/**
 * 类目详情
 *api-category.getCategory
 * @export
 * @param params (description)
 * @returns (description)
 */
export function view(params) {
  return {
    types: [VIEW, VIEW_SUCCESS, VIEW_FAILURE],
    promise: (client) => client.post('api-category.getCategory', params)
  }
}
/**
 * 类目修改
 *api-category.updateCategory
 * @export
 * @param params (description)
 * @returns (description)
 */
export function modifyItem(params) {
  return {
    types: [MODIFY, MODIFY_SUCCESS, MODIFY_FAILURE],
    promise: (client) => client.post('api-category.updateCategory', params)
  }
}
/**
 * 类目管理列表 所有
 *api-category.listAll
 * @export
 * @param params (description)
 * @returns (description)
 */
export function queryList(params) {
  return {
    types: [QUERY, QUERY_SUCCESS, QUERY_FAILURE],
    promise: (client) => client.post('api-category.listAll', params)
  }
}

export default function reducer(state = {result: {}}, action) {
  state = {...state, loading: action.loading};
  switch (action.type) {
    case ADD:
    case VIEW:
    case MODIFY:
    case QUERY:
      return {
        ...state,
        isJump: false
      }
    case ADD_SUCCESS:
      return {
        ...state,
        addResult: action.result,
        isJump: true
      }
    case ADD_FAILURE:
      return {
        ...state
      }
    case VIEW_SUCCESS:
      return {
        ...state,
        result: action.result
      }
    case VIEW_FAILURE:
      return {
        ...state
      }
    case MODIFY_SUCCESS:
      return {
        //...state,
        //mResult: action.result,
        isJump: true
      }
    case MODIFY_FAILURE:
      return {
        ...state
      }
    case QUERY_SUCCESS:
      return {
        ...state,
        cResult: action.result
      }
    case QUERY_FAILURE:
      return {
        ...state
      }
    default:
      return state
  }
}
