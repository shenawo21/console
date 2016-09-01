
//退款详情信息
const REQ_REFUNDDETAIL = 'REQ_REFUNDDETAIL';
const SUC_REFUNDDETAIL = 'SUC_REFUNDDETAIL';
const ERR_REFUNDDETAIL = 'ERR_REFUNDDETAIL';

// 客服审批退款单
const REQ_VERIFY = 'REQ_VERIFY';
const SUC_VERIFY = 'SUC_VERIFY';
const ERR_VERIFY = 'ERR_VERIFY';

export function refundDetail(params) {
    return {
        types: [REQ_REFUNDDETAIL, SUC_REFUNDDETAIL, ERR_REFUNDDETAIL],
        promise: (client) => client.post('api-offSale.getRefundApply',params)
    }
}

export function verify(params) {
    return {
        types: [REQ_VERIFY, SUC_VERIFY, ERR_VERIFY],
        promise: (client) => client.post('api-offSale.doVerify',params)
    }
}

export default function reducer(state = {result:{}}, action) {
  state = {...state, loading : action.loading};
  switch (action.type) {
    case REQ_REFUNDDETAIL:
        return {
            ...state
        }
    case SUC_REFUNDDETAIL:
        return {
            ...state,
            result: action.result
        }
    case ERR_REFUNDDETAIL:
        return {
            ...state
        }

    case REQ_VERIFY:
        return {
            ...state
        }
    case SUC_VERIFY:
        return {
            ...state,
        }
    case ERR_VERIFY:
        return {
            ...state
        }
    default:
      return state
  }
}
