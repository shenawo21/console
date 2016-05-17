
// ------------------------------------
// Constants
// ------------------------------------
const REQ_EDIT = 'REQ_EDIT';
const SUC_EDIT = 'SUC_EDIT';
const ERR_EDIT = 'ERR_EDIT';



export function load() {
  return {
    types: [REQ_EDIT, SUC_EDIT, ERR_EDIT],
    promise: (client) => client.get('user/repos')
  }
}

export default function reducer(state = {item:[]}, action) {
  state = {...state, loading : action.loading};
  switch (action.type) {
    case REQ_EDIT:
      return {
        ...state,
      }
    case SUC_EDIT:
      return {
        ...state,
        item: action.result.data,
      }
    case ERR_EDIT:
      return {
        ...state,
      }

    default:
      return state
  }
}
