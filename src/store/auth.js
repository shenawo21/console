import immutable from 'immutable'

const LOAD = 'auth/LOAD';
const LOAD_SUCCESS = 'auth/LOAD_SUCCESS';
const LOAD_FAILURE = 'auth/LOAD_FAILURE';
const LOGIN = 'auth/LOGIN';
const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
const LOGIN_FAILURE = 'auth/LOGIN_FAILURE';
const LOGOUT = 'auth/LOGOUT';
const LOGOUT_SUCCESS = 'auth/LOGOUT_SUCCESS';
const LOGOUT_FAILURE = 'auth/LOGOUT_FAILURE';

const VCODE = 'auth/VCODE';
const VCODE_SUCCESS = 'auth/VCODE_SUCCESS';
const VCODE_FAILURE = 'auth/VCODE_FAILURE'

const TIMEOUT_SESSION = 'auth/TIMEOUT_SESSION';

export function load(params) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAILURE],
    promise: (client) => client.post('api-userLogin.checkLogin', params, {'hasMsg' : true})
  }
}

export function vCode(params) {
  return {
    types: [VCODE, VCODE_SUCCESS, VCODE_FAILURE],
    promise: (client) => client.get('imageServlet', params, {'hasMsg' : true})
  }
}

export function login(params) {
  return {
    types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE],
    promise: (client) => client.post('api-userLogin.loginEn', params),
    sKey : 'USER'
  }
}

export function logout(params) {
  return {
    types: [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAILURE],
    promise: (client) => client.post('api-userLogin.loginOut', params, {'hasMsg' : '登出成功'})
  }
}
/**
 * isAuthed
 * @param  {any} globalState
 */
export function isAuthed(globalState) {
  return globalState.auth && globalState.auth.user
}

export default function reducer(state = {}, action = {}) {
  state = {...state, loading : action.loading};
  switch (action.type) {
    case LOAD:
    case LOGIN:
    case LOGOUT:
    case VCODE:
      return {
        ...state
      };
    case LOAD_SUCCESS:
      return {
        // ...state,
        user: action.result
      };
    case LOAD_FAILURE:
      return {
        ...state,
        error: action.error
      };    
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.result,
        logoutResult : false
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        user: null,
        loginError: action.error
      };
    case LOGOUT_SUCCESS:
      return {
        logoutResult: true,
        user : null
      };
    case LOGOUT_FAILURE:
      return {
        ...state,
        logoutError: action.error
      };
    case TIMEOUT_SESSION:
      return {
         logoutResult : action.result
      }
    case VCODE_SUCCESS:
      return {
        vcodeResult: true
      };
    case VCODE_FAILURE:
      return {
        ...state,
        vcodeError: action.error
      };
    default:
      return state;
  }
}

