
// ------------------------------------
// Constants
// ------------------------------------
const REQ_DOCS = 'REQ_DOCS';
const SUC_DOCS = 'SUC_DOCS';
const ERR_DOCS = 'ERR_DOCS';



export function load() {
  return {
    types: [REQ_DOCS, SUC_DOCS, ERR_DOCS],
    promise: (client) => client.get('user/repos')
  }
}

export default function reducer(state = {item:[]}, action) {
  switch (action.type) {
    case REQ_DOCS:
      return {
        ...state,
        loading: true
      }
    case SUC_DOCS:
      return {
        ...state,
        item: action.result.data,
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
