

const REQ_USER_ADD = 'REQ_USER_ADD';
const SUC_USER_ADD = 'SUC_USER_ADD';
const ERR_USER_ADD = 'ERR_USER_ADD';


export function addUser(params) {
  return {
    types: [REQ_USER_ADD, SUC_USER_ADD, ERR_USER_ADD],
    promise: (client) => client.post('', {...params, method:'admin/User/addUserMessage'})
}
}

export default function reducer(state = { result: {} }, action) {
  state = {...state, loading: action.loading };
  switch (action.type) {
    case REQ_USER_ADD:
      return {
        ...state
      }
    case SUC_USER_ADD:
      return {
        ...state
      }
    case ERR_USER_ADD:
      return {
        ...state
      }
    default:
      return state
  }
}
