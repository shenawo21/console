
//退款详情信息
const REQ_ENDCHANGEDETAIL = 'REQ_ENDCHANGEDETAIL';
const SUC_ENDCHANGEDETAIL = 'SUC_ENDCHANGEDETAIL';
const ERR_ENDCHANGEDETAIL = 'ERR_ENDCHANGEDETAIL';

// 结束退货
const REQ_ENDCHANGE = 'REQ_ENDCHANGE';
const SUC_ENDCHANGE = 'SUC_ENDCHANGE';
const ERR_ENDCHANGE = 'ERR_ENDCHANGE';


export function endDetail(params) {
    return {
        types: [REQ_ENDCHANGEDETAIL, SUC_ENDCHANGEDETAIL, ERR_ENDCHANGEDETAIL],
        promise: (client) => client.post('api-offSale.getEndRefundPage',params)
    }
}

export function endChange(params) {
    return {
        types: [REQ_ENDCHANGE, SUC_ENDCHANGE, ERR_ENDCHANGE],
        promise: (client) => client.post('api-offSale.doEndChangeGoods',params)
    }
}
export default function reducer(state = {result:{}}, action) {
  state = {...state, loading : action.loading};
  switch (action.type) {
    case REQ_ENDCHANGEDETAIL:
        return {
            ...state
        }
    case SUC_ENDCHANGEDETAIL:
        return {
            ...state,
            result: action.result
        }
    case ERR_ENDCHANGEDETAIL:
        return {
            ...state
        }
    case REQ_ENDCHANGE:
        return {
            ...state
        }
    case SUC_ENDCHANGE:
        return {
            ...state,
        }
    case ERR_ENDCHANGE:
        return {
            ...state
        }    
    default:
      return state
  }
}
