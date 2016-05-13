// ------------------------------------
// Constants
// ------------------------------------
const LOAD = 'ENTERPRISE/LOAD'
const LOAD_SUCCESS = 'ENTERPRISE/LOAD_SUCCESS'
const LOAD_FAILURE = 'ENTERPRISE/LOAD_FAILURE'


export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAILURE],
    promise: (client) => client.get('user/enterprise')
  }
}

const DELETE_REQUEST = 'DELETE_REQUEST'
const DELETE_SUCCESS = 'DELETE_SUCCESS'
const DELETE_FAILURE = 'DELETE_FAILURE'

export function remove(owner, repo) {
  return {
    types: [DELETE_REQUEST, DELETE_SUCCESS, DELETE_FAILURE],
    promise: (client) => client.delete(`repos/${owner}/${repo}`)
  }
}

export default function reducer(state = {
  repo: []
}, action) {
  console.log(action);
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      }
    case LOAD_SUCCESS:
      return {
        ...state,
        repo: action.result.data,
        loading: false
      }
    case LOAD_FAILURE:
      return {
        ...state,
        loading: false
      }

    case DELETE_SUCCESS:
      return {
        ...state,
        deleted: true
      }
    case DELETE_FAILURE:
      return {
        ...state,
        deleted: false
      }
    default:
      return state
  }
}
