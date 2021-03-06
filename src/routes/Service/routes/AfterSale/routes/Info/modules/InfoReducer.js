
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

// 通知财务退款
const REQ_MONEY = 'REQ_MONEY';
const SUC_MONEY = 'SUC_MONEY';
const ERR_MONEY = 'ERR_MONEY';

// 发货
const REQ_RETURN = 'REQ_RETURN';
const SUC_RETURN = 'SUC_RETURN';
const ERR_RETURN = 'ERR_RETURN';




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
export function addressList(params) {
    return {
        types: [REQ_ADDRESS, SUC_ADDRESS, ERR_ADDRESS],
        promise: (client) => client.post('api-refundAddress.getEnterpriseRefundList',params)
    }
}
export function getMoney(params) {
    return {
        types: [REQ_MONEY, SUC_ADDRESS, ERR_ADDRESS],
        promise: (client) => client.post('api-offSale.doRefundNotice',params)
    }
}
export function returnBack(params) {
    return {
        types: [REQ_RETURN, SUC_RETURN, ERR_RETURN],
        promise: (client) => client.post('api-offSale.updateRefundTradesInfo',params)
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

    case REQ_MONEY:
        return {
            ...state
        }
    case SUC_MONEY:
        return {
            ...state,
        }
    case ERR_MONEY:
        return {
            ...state
        }
    case REQ_RETURN:
        return {
            ...state
        }    
    case SUC_RETURN:
        return {
            ...state
        }
    case ERR_RETURN:
        return {
            ...state
        }    
    default:
      return state
  }
}
