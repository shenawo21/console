
// 查询需要换货订单
const REQ_SEARCH = 'REQ_SEARCH';
const SUC_SEARCH = 'SUC_SEARCH';
const ERR_SEARCH = 'ERR_SEARCH';

export function getSearch(params) {
    return {
        types: [REQ_SEARCH, SUC_SEARCH, ERR_SEARCH],
        promise: (client) => client.post('api-offSale.getChangeGoodsOrder',params)
    }
}
export default function reducer(state = {result:{}}, action) {
  state = {...state, loading : action.loading};
  switch (action.type) {    
    case REQ_SEARCH:
        return {
            ...state
        }    
    case SUC_SEARCH:
        return {
            ...state,
            result: action.result
        }
    case ERR_SEARCH:
        return {
            ...state
        }    
    default:
      return state
  }
}
