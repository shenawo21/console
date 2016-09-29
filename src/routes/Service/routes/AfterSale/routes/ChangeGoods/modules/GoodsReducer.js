
//换货详情信息
const REQ_CHANGEDETAIL = 'REQ_CHANGEDETAIL';
const SUC_CHANGEDETAIL = 'SUC_CHANGEDETAIL';
const ERR_CHANGEDETAIL = 'ERR_CHANGEDETAIL';

// 客服审批换货
const REQ_CHANGEVERIFY = 'REQ_CHANGEVERIFY';
const SUC_CHANGEVERIFY = 'SUC_CHANGEVERIFY';
const ERR_CHANGEVERIFY = 'ERR_CHANGEVERIFY';

// 结束换货
const REQ_CHANGEEND = 'REQ_CHANGEEND';
const SUC_CHANGEEND = 'SUC_CHANGEEND';
const ERR_CHANGEEND = 'ERR_CHANGEEND';

// 商品列表
const REQ_LIST = 'REQ_LIST';
const SUC_LIST = 'SUC_LIST';
const ERR_LIST = 'ERR_LIST';

// 物流列表
const REQ_LOGISTIC = 'REQ_LOGISTIC';
const SUC_LOGISTIC = 'SUC_LOGISTIC';
const ERR_LOGISTIC = 'ERR_LOGISTIC';

export function chagenDetail(params) {
    return {
        types: [REQ_CHANGEDETAIL, SUC_CHANGEDETAIL, ERR_CHANGEDETAIL],
        promise: (client) => client.post('api-offSale.getTradeOrder',params)
    }
}

export function changeVerify(params) {
    return {
        types: [REQ_CHANGEVERIFY, SUC_CHANGEVERIFY, ERR_CHANGEVERIFY],
        promise: (client) => client.post('api-offSale.doVerifyChangeGoods',params)
    }
}
export function changeEnd(params) {
    return {
        types: [REQ_CHANGEEND, SUC_CHANGEEND, ERR_CHANGEEND],
        promise: (client) => client.post('api-offSale.getEndRefundPage',params)
    }
}

export function shopList(params) {
    return {
        types: [REQ_LIST, SUC_LIST, ERR_LIST],
        promise: (client) => client.post('api-productService.mapView',params)
    }
}

export function Logistic() {
    return {
        types: [REQ_LOGISTIC, SUC_LOGISTIC, ERR_LOGISTIC],
        promise: (client) => client.post('api-logistic.listLogisticEn')
    }
}
export default function reducer(state = {result:{}}, action) {
  state = {...state, loading : action.loading};
  switch (action.type) {
    case REQ_CHANGEDETAIL:
        return {
            ...state
        }
    case SUC_CHANGEDETAIL:
        return {
            ...state,
            result: action.result
        }
    case ERR_CHANGEDETAIL:
        return {
            ...state
        }

    case REQ_CHANGEVERIFY:
        return {
            ...state
        }
    case SUC_CHANGEVERIFY:
        return {
            ...state,
        }
    case ERR_CHANGEVERIFY:
        return {
            ...state
        }

     case REQ_CHANGEEND:
        return {
            ...state
        }
    case SUC_CHANGEEND:
        return {
            ...state,
        }
    case ERR_CHANGEEND:
        return {
            ...state
        }
    case REQ_LIST:
        return {
            ...state
        }
    case SUC_LIST:
        return {
            ...state,
            list: action.result
        }
    case ERR_LIST:
        return {
            ...state
        }
    case REQ_LOGISTIC:
        return {
            ...state
        }
    case SUC_LOGISTIC:
        return {
            ...state,
            logistic: action.result
        }
    case ERR_LOGISTIC:
        return {
            ...state
        }             
    default:
      return state
  }
}
