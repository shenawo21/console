
//获取待验收商品列表
const NOCHECKLIST = 'service/NOCHECKLIST';
const NOCHECKLIST_SUCCESS = 'service/NOCHECKLIST_SUCCESS';
const NOCHECKLIST_FAILURE = 'service/NOCHECKLIST_FAILURE';

//获取已验收商品列表
const CHECKEDLIST = 'service/CHECKEDLIST';
const CHECKEDLIST_SUCCESS = 'service/CHECKEDLIST_SUCCESS';
const CHECKEDLIST_FAILURE = 'service/CHECKEDLIST_FAILURE';


//获取所属平台列表
const PLATLIST = 'service/PLATLIST';
const PLATLIST_SUCCESS = 'service/PLATLIST_SUCCESS';
const PLATLIST_FAILURE = 'service/PLATLIST_FAILURE';

/**
 * 获取待验收商品列表
 * 
 * @export
 * @param params (description)
 * @returns (description)
 */
export function getNoCheckList(params) {
  return {
    types: [NOCHECKLIST, NOCHECKLIST_SUCCESS, NOCHECKLIST_FAILURE],
    promise: (client) => client.post('api-warehouseDispose.getNotCheckedList', params)
  }
}

/**
 * 获取已验收商品列表
 * 
 * @export
 * @param params (description)
 * @returns (description)
 */
export function getCheckedList(params) {
  return {
    types: [CHECKEDLIST, CHECKEDLIST_SUCCESS, CHECKEDLIST_FAILURE],
    promise: (client) => client.post('api-warehouseDispose.getCheckedList', params)
  }
}


/**
 * 获取所属平台列表
 * 
 * @export
 * @param params (description)
 * @returns (description)
 */
export function getPlatList(params) {
    return {
        types: [PLATLIST, PLATLIST_SUCCESS, PLATLIST_FAILURE],
        promise: (client) => client.post('api-channel.listChannel', params)
    }
}

export default function reducer(state = {result:{}}, action) {
  state = {...state, loading : action.loading};
  switch (action.type) {    
    case NOCHECKLIST:
    case CHECKEDLIST:
    case PLATLIST:
        return {
            ...state
        }    
    case NOCHECKLIST_SUCCESS:
        return {
            ...state,
            result: action.result
        }
    case NOCHECKLIST_FAILURE:
        return {
            ...state
        }
    case CHECKEDLIST_SUCCESS:
        return {
            ...state,
            result: action.result
        }
    case CHECKEDLIST_FAILURE:
        return {
            ...state
        }     
    case PLATLIST_SUCCESS:
        return {
            ...state,
            platlistResult: action.result
        }
    case PLATLIST_FAILURE:
        return {
            ...state
        }
    default:
      return state
  }
}
