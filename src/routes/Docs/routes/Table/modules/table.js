const REQ_TABLE = 'REQ_TABLE';
const SUC_TABLE = 'SUC_TABLE';
const ERR_TABLE = 'ERR_TABLE';


export function queryItemList(params) {
  return {
    types: [REQ_TABLE, SUC_TABLE, ERR_TABLE],
    promise: (client) => client.post('api-iteminfo.queryItemList', params)
  }
}

export default function reducer(state = {result:{}}, action) {
  state = {...state, loading : action.loading};
  switch (action.type) {
    case REQ_TABLE:
      return {
        ...state,
      }
    case SUC_TABLE:
      return {
        ...state,
        result: action.result,
      }
    case ERR_TABLE:
      return {
        ...state,
      }

    default:
      return state
  }
}
