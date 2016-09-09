
//退款详情信息
const REQ_REFUNDDETAIL = 'REQ_REFUNDDETAIL';
const SUC_REFUNDDETAIL = 'SUC_REFUNDDETAIL';
const ERR_REFUNDDETAIL = 'ERR_REFUNDDETAIL';

// 客服审批退款单
const REQ_VERIFY = 'REQ_VERIFY';
const SUC_VERIFY = 'SUC_VERIFY';
const ERR_VERIFY = 'ERR_VERIFY';

// 地址列表
const REQ_ADDRESS = 'REQ_ADDRESS';
const SUC_ADDRESS = 'SUC_ADDRESS';
const ERR_ADDRESS = 'ERR_ADDRESS';


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
export function addressList() {
    return {
        types: [REQ_ADDRESS, SUC_ADDRESS, ERR_ADDRESS],
        promise: (client) => client.post('api-refundAddress.refundAddressList')
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
    case REQ_ADDRESS:
        return {
            ...state
        }
    case SUC_ADDRESS:
        return {
            ...state,
            addressLlist : action.result
        }
    case ERR_ADDRESS:
        return {
            ...state
        }
    default:
      return state
  }
}
