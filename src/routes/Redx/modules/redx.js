const REQ_DOCS = 'REQ_DOCS';
const SUC_DOCS = 'SUC_DOCS';
const ERR_DOCS = 'ERR_DOCS';

export function getBrand(params) {
  return {
    types: [REQ_DOCS, SUC_DOCS, ERR_DOCS],
    promise: (client) => {
      console.log(client,params)
      return client.get('api-brand.get', params)
    }
  }
}

export default function reducer(state = {data:{aaa:11,b:22,c:33}}, action) {
  switch (action.type) {
    case REQ_DOCS:
      return {
        ...state,
        loading: true
      }
    case SUC_DOCS:
      return {
        ...state,
        data: action.data,
        loading: false
      }
    case ERR_DOCS:
      return {
        ...state,
        loading: false
      }
    default:
      return state
  }
}
