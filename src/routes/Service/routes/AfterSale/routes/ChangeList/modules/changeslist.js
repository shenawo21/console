// 查询需要换货订单
const REQ_SEARCHLIST = 'REQ_SEARCHLIST';
const SUC_SEARCHLIST = 'SUC_SEARCHLIST';
const ERR_SEARCHLIST = 'ERR_SEARCHLIST';


// 查询需要换货订单
const REQ_SEARCH = 'REQ_SEARCH';
const SUC_SEARCH = 'SUC_SEARCH';
const ERR_SEARCH = 'ERR_SEARCH';

export function getSearchList(params) {
    return {
        types: [REQ_SEARCHLIST, SUC_SEARCHLIST, ERR_SEARCHLIST],
        promise: (client) => client.post('api-offSale.getChangeGoodsOrder',params)
    }
}
export function getSearch(params) {
    return {
        types: [REQ_SEARCH, SUC_SEARCH, ERR_SEARCH],
        promise: (client) => client.post('api-offSale.getChangeGoodsOrder',params)
    }
}
export default function reducer(state = {result:[]}, action) {
  state = {...state, loading : action.loading};
  switch (action.type) {    
    case REQ_SEARCHLIST:
        return {
            ...state
        }    
    case SUC_SEARCHLIST:
        return {
            ...state,
            result: action.result
        }
    case ERR_SEARCHLIST:
        return {
            ...state
        }

    case REQ_SEARCH:
        return {
            ...state
        }    
    case SUC_SEARCH:
        return {
            ...state,
        }
    case ERR_SEARCH:
        return {
            ...state
        }    
    default:
      return state
  }
}
