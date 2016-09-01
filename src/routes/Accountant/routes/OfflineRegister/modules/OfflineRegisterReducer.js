
//获取已登记记录列表
const RECORDEDLIST = 'accountant/RECORDEDLIST';
const RECORDEDLIST_SUCCESS = 'accountant/RECORDEDLIST_SUCCESS';
const RECORDEDLIST_FAILURE = 'accountant/RECORDEDLIST_FAILURE';

//删除该费用
const DELREGISTER = 'accountant/DELREGISTER';
const DELREGISTER_SUCCESS = 'accountant/DELREGISTER_SUCCESS';
const DELREGISTER_FAILURE = 'accountant/DELREGISTER_FAILURE';

//费用登记
const REGISTER = 'accountant/REGISTER';
const REGISTER_SUCCESS = 'accountant/REGISTER_SUCCESS';
const REGISTER_FAILURE = 'accountant/REGISTER_FAILURE';

/**
 * 获取已登记记录列表
 * 
 * @export
 * @param params (description)
 * @returns (description)
 */
export function getRecordedList(params) {
  return {
    types: [RECORDEDLIST, RECORDEDLIST_SUCCESS, RECORDEDLIST_FAILURE],
    promise: (client) => client.post('api-offSale.getRecordedList', params)
  }
}

/**
 * 删除该费用
 * 
 * @export
 * @param params (description)
 * @returns (description)
 */
export function delRegister() {
    return {
        types: [DELREGISTER, DELREGISTER_SUCCESS, DELREGISTER_FAILURE],
        promise: (client) => client.post('api-shop.listEnterpriseShop')
    }
}

/**
 * 获取商品分类
 * 
 * @export
 * @param params (description)
 * @returns (description)
 */
export function register(params) {
  return {
    types: [REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE],
    promise: (client) => client.post('api-category.listAll', params)
  }
}


export default function reducer(state = {result:{}}, action) {
  state = {...state, loading : action.loading};
  switch (action.type) {    
    case RECORDEDLIST:
    case DELREGISTER:
    case REGISTER:
        return {
            ...state
        }    
    case RECORDEDLIST_SUCCESS:
        return {
            ...state,
            result: action.result
        }
    case RECORDEDLIST_FAILURE:
        return {
            ...state
        }
    case DELREGISTER_SUCCESS:
        return {
            ...state,
            delResult: action.result
        }
    case DELREGISTER_FAILURE:
        return {
            ...state
        }
     case REGISTER_SUCCESS:
        return {
            ...state,
            registerResult: action.result
        }
    case REGISTER_FAILURE:
        return {
            ...state
        }
    default:
      return state
  }
}
