//企业详情
const VIEW = 'edit/VIEW';
const VIEW_SUCCESS = 'edit/VIEW_SUCCESS';
const VIEW_FAILURE = 'edit/VIEW_FAILURE';

//企业审核
const AUDIT = 'edit/AUDIT';
const AUDIT_SUCCESS = 'edit/AUDIT_SUCCESS';
const AUDIT_FAILURE = 'edit/AUDIT_FAILURE';

//企业入驻
const ADD = 'edit/ADD';
const ADD_SUCCESS = 'edit/ADD_SUCCESS';
const ADD_FAILURE = 'edit/ADD_FAILURE';


/**
 * 企业详情
 *
 * @export
 * @param params (description)
 * @returns (description)
 */
export function view(params) {
  return {
    types: [VIEW, VIEW_SUCCESS, VIEW_FAILURE],
    promise: (client) => client.post('/suneee-cloud/api-enterprise.get', params)
  }
}

/**
 * 企业审核
 *
 * @export
 * @param params (description)
 * @returns (description)
 */
export function audit(params) {
  return {
    types: [AUDIT, AUDIT_SUCCESS, AUDIT_FAILURE],
    promise: (client) => client.post('/suneee-cloud/api-enterprise.successAudit', params)
  }
}

/**
 * 企业入驻
 *
 * @export
 * @param params (description)
 * @returns (description)
 */
export function addItem(params) {
  return {
    types: [ADD, ADD_SUCCESS, ADD_FAILURE],
    promise: (client) => client.post('/suneee-cloud/api-enterprise.add', params)
  }
}

export default function reducer(state = {result:{}}, action) {
  state = {...state, loading : action.loading};
  switch (action.type) {
    case VIEW:
    case AUDIT:
    case ADD:
        return {
            ...state
        }
    case VIEW_SUCCESS:
        return {
            //...state,
            loading : action.loading,
            result: action.result
        }
    case VIEW_FAILURE:
        return {
            ...state
        }
    case AUDIT_SUCCESS:
        return {
            //...state,
            result: action.result
        }
    case AUDIT_FAILURE:
        return {
            ...state
        }
    case ADD_SUCCESS:
        return {
            //...state,
            result: action.result
        }
    case ADD_FAILURE:
        return {
            ...state
        }
    default:
      return state
  }
}
