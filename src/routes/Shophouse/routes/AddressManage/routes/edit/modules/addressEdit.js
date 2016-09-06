
// ------------------------------------
// Constants
// ------------------------------------


const REQ_USER_INFO = 'REQ_USER_INFO';
const SUC_USER_INFO = 'SUC_USER_INFO';
const ERR_USER_INFO = 'ERR_USER_INFO';
const REQ_USER_EDIT = 'REQ_USER_EDIT';
const SUC_USER_EDIT = 'SUC_USER_EDIT';
const ERR_USER_EDIT = 'ERR_USER_EDIT';

export function getUserInfo(params) {
  return {
    types: [REQ_USER_INFO, SUC_USER_INFO, ERR_USER_INFO],
    promise: (client) => client.post('', {...params, method:'admin/User/showUserMessage'}, { 'hasMsg': true })
}
}

export function editUser(params) {
  return {
    types: [REQ_USER_EDIT, SUC_USER_EDIT, ERR_USER_EDIT],
    promise: (client) => client.post('', {...params, method:'admin/User/editUserMessage'})
}
}


export default function reducer(state = { result: {} }, action) {
  state = {...state, loading: action.loading };
  switch (action.type) {
    case REQ_USER_INFO:
      return {
        ...state
      }
    case SUC_USER_INFO:
      return {
        ...state,
        result: action.result
      }
    case ERR_USER_INFO:
      return {
        ...state
      }

    case REQ_USER_EDIT:
      return {
        ...state
      }
    case SUC_USER_EDIT:
      return {
        ...state
      }
    case ERR_USER_EDIT:
      return {
        ...state
      }
    default:
      return state
  }
}
