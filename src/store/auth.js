import immutable from 'immutable'

const LOAD_AUTH_REQUEST = 'LOAD_AUTH_REQUEST'
const LOAD_AUTH_SUCCESS = 'LOAD_AUTH_SUCCESS'
const LOAD_AUTH_FAILURE = 'LOAD_AUTH_FAILURE'

export function load() {
  return {
    types: [LOAD_AUTH_REQUEST, LOAD_AUTH_SUCCESS, LOAD_AUTH_FAILURE],
    promise: (client) => client.post('checkLogin')
  }
}


const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
const LOGOUT_FAILURE = 'LOGOUT_FAILURE'
export function logout() {
  return {
    types: [LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE],
    promise: (client) => client.post('logout')
  }
}
/**
 * isAuthed
 * @param  {any} globalState
 */
export function isAuthed(globalState) {
  return globalState.auth && globalState.auth.loaded
}

export default function reducer(state = { loaded: false }, action) {
  switch (action.types) {
    case LOAD_AUTH_REQUEST:
      return {
        ...state,
        loading: true
      }
    default:
      return state;
  }
}
