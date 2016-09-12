
//退款详情信息
const REQ_ENDDETAIL = 'REQ_ENDDETAIL';
const SUC_ENDDETAIL = 'SUC_ENDDETAIL';
const ERR_ENDDETAIL = 'ERR_ENDDETAIL';

// 客服审批退款单
const REQ_END = 'REQ_END';
const SUC_END = 'SUC_END';
const ERR_END = 'ERR_END';


export function endDetail(params) {
    return {
        types: [REQ_ENDDETAIL, SUC_ENDDETAIL, ERR_ENDDETAIL],
        promise: (client) => client.post('api-offSale.getEndRefundPage',params)
    }
}

export function end(params) {
    return {
        types: [REQ_END, SUC_END, ERR_END],
        promise: (client) => client.post('api-offSale.doEndRefund',params)
    }
}

export default function reducer(state = {result:{}}, action) {
  state = {...state, loading : action.loading};
  switch (action.type) {
    case REQ_ENDDETAIL:
        return {
            ...state
        }
    case SUC_ENDDETAIL:
        return {
            ...state,
            result: action.result
        }
    case ERR_ENDDETAIL:
        return {
            ...state
        }

    case REQ_END:
        return {
            ...state
        }
    case SUC_END:
        return {
            ...state,
        }
    case ERR_END:
        return {
            ...state
        }
    default:
      return state
  }
}
