
// 获取单笔退款详情
const VIEW = 'accountant/VIEW';
const VIEW_SUCCESS = 'accountant/VIEW_SUCCESS';
const VIEW_FAILURE = 'accountant/VIEW_FAILURE';

// 同意退款并打款
const AGREE = 'accountant/AGREE';
const AGREE_SUCCESS = 'accountant/AGREE_SUCCESS';
const AGREE_FAILURE = 'accountant/AGREE_FAILURE';

// 拒绝退款
const REFUSE = 'accountant/REFUSE';
const REFUSE_SUCCESS = 'accountant/REFUSE_SUCCESS';
const REFUSE_FAILURE = 'accountant/REFUSE_FAILURE';

// 退货通过
const REQ_AGREE = 'REQ_AGREE';
const SUC_AGREE = 'SUC_AGREE';
const ERR_AGREE = 'ERR_AGREE';

/**
 * 退货通过jump
 * 
 * @export
 * @param params (description)
 * @returns (description)
 */
export function getAgree(params) {
  return {
    types: [REQ_AGREE, SUC_AGREE, ERR_AGREE],
    promise: (client) => client.post('api-offSale.cwDoAgreeRefundGoods', params, {'hasMsg' : true})
  }
}
/**
 * 获取单笔退款详情
 * 
 * @export
 * @param params (description)
 * @returns (description)
 */
export function view(params) {
  return {
    types: [VIEW, VIEW_SUCCESS, VIEW_FAILURE],
    promise: (client) => client.post('api-offSale.getRefundApply', params)
  }
}

/**
 * 退款同意并打款
 * 
 * @export
 * @param params (description)
 * @returns (description)
 */
export function doAgreeRemit(params) {
  return {
    types: [AGREE, AGREE_SUCCESS, AGREE_FAILURE],
    promise: (client) => client.post('api-offSale.doAgreeRemit', params, {'hasMsg' : true})
  }
}

/**
 * 拒绝退款
 * 
 * @export
 * @param params (description)
 * @returns (description)
 */
export function doRefuseRemit(params) {
    return {
        types: [REFUSE, REFUSE_SUCCESS, REFUSE_FAILURE],
        promise: (client) => client.post('api-offSale.doRefuseRemit', params)
    }
}

export default function reducer(state = {result:{}}, action) {
  state = {...state, loading : action.loading};
  switch (action.type) {
    case VIEW:
    case AGREE:
    case REFUSE:
        return {
            ...state,
            jump : false
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
    case AGREE_SUCCESS:
        return {
            ...state,
            jump : true,
            result: action.result,
        }    
    case AGREE_FAILURE:
        return {
            ...state
        }
    case REFUSE_SUCCESS:
        return {
            ...state,
            jump : true,
            result: action.result,
        }    
    case REFUSE_FAILURE:
        return {
            ...state
        }
       case REQ_AGREE:
        return {
            ...state
        }    
    case SUC_AGREE:
        return {
            ...state
        }    
    case ERR_AGREE:
        return {
            ...state
        }   
    default:
      return state
  }
}
