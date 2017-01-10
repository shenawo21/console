//账号组列表
const QUERY = 'group/QUERY';
const QUERY_SUCCESS = 'group/QUERY_SUCCESS';
const QUERY_FAILURE = 'group/QUERY_FAILURE';
// 账号组新增
const ADD = 'group/ADD';
const ADD_SUCCESS = 'group/ADD_SUCCESS';
const ADD_FAILURE = 'group/ADD_FAILURE';

//账号组删除
const DELETE = 'group/DELETE';
const DELETE_SUCCESS = 'group/DELETE_SUCCESS';
const DELETE_FAILURE = 'group/DELETE_FAILURE';

// 账号组编辑
const EIDT = 'group/EIDT';
const EIDT_SUCCESS = 'group/EIDT_SUCCESS';
const EIDT_FAILURE = 'group/EIDT_FAILURE';

/**账号组列表 */
export function queryList(params) {
  return {
    types: [QUERY, QUERY_SUCCESS, QUERY_FAILURE],
    promise: (client) => client.post('api-department.queryDePartMentList', params,{'hasMsg' : true})
  }
}
// 账号组新增
export function addItem(params) {
  return {
    types: [ADD, ADD_SUCCESS, ADD_FAILURE],
    promise: (client) => client.post('api-department.insertDePartMentInfo', params,{'hasMsg' : true})
  }
}
/**
 * 删除
 */
export function deleteItem(params) {
  return {
    types: [DELETE, DELETE_SUCCESS, DELETE_FAILURE],
    promise: (client) => client.post('api-department.deleteDePartMentInfo', params, {'hasMsg' : true})
  }
}
// 编辑
export function editItem(params) {
  return {
    types: [EIDT, EIDT_SUCCESS, EIDT_FAILURE],
    promise: (client) => client.post('api-department.updateDePartMentInfo', params,{'hasMsg' : true})
  }
}
export default function reducer(state = {result: []}, action) {
  state = {...state, loading: action.loading};
  switch (action.type) {
    case EIDT:
    case DELETE:
    case ADD:
    case QUERY:
      return {
        ...state
      }
    case ADD_SUCCESS:
      return {
        ...state
      }
    case ADD_FAILURE:
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
    case EIDT_SUCCESS:
      return {
        ...state
      }
    case EIDT_FAILURE:
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
