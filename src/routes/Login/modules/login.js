const LOAD_REQ = 'Login/LOAD_REQUEST';
const LOAD_SUC = 'Login/LOAD_SUCCESS';
const LOAD_ERR = 'Login/LOAD_ERROR';

export function doLoad(params) {
  return {
    types: [LOAD_REQ, LOAD_SUC, LOAD_ERR],
    promise: (client) => client.post('api-user.login', params)
  }
}

export default function reducer(state = {data : {}, isLoggedIn : false}, action) {
  switch (action.type) {
    case LOAD_REQ:
      return {
        ...state,
        loading: true
      }
    case LOAD_SUC:
      return {
        ...state,
        result: action.result.data,
        loading: false,
        isLoggedIn : true
      }
    case LOAD_ERR:
      return {
        ...state,
        loading: false
      }
    default:
      return state
  }
}

