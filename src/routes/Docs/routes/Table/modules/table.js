const REQ_TABLE = 'REQ_TABLE';
const SUC_TABLE = 'SUC_TABLE';
const ERR_TABLE = 'ERR_TABLE';


export function getBrand(params) {
  return {
    types: [REQ_TABLE, SUC_TABLE, ERR_TABLE],
    promise: (client) => client.get('api-brand.get', {'params' : params})
  }
}

export default function reducer(state = {item:[]}, action) {
  state = {...state, loading : action.loading};
  switch (action.type) {
    case REQ_TABLE:
      return {
        ...state,
      }
    case SUC_TABLE:
      return {
        ...state,
        item: action.result.data,
      }
    case ERR_TABLE:
      return {
        ...state,
      }

    default:
      return state
  }
}
