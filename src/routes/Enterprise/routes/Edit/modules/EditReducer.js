//企业详情
const VIEW = 'edit/VIEW';
const VIEW_SUCCESS = 'edit/VIEW_SUCCESS';
const VIEW_FAILURE = 'edit/VIEW_FAILURE';

//企业审核-通过
const AUDITS = 'edit/AUDITS';
const AUDITS_SUCCESS = 'edit/AUDITS_SUCCESS';
const AUDITS_FAILURE = 'edit/AUDITS_FAILURE';

//企业审核-不通过
const AUDITF = 'edit/AUDITF';
const AUDITF_SUCCESS = 'edit/AUDITF_SUCCESS';
const AUDITF_FAILURE = 'edit/AUDITF_FAILURE';

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
    promise: (client) => client.post('api-enterprise.get', params)
  }
}

/**
 * 企业审核-通过
 *
 * @export
 * @param params (description)
 * @returns (description)
 */
export function auditS(params) {
  return {
    types: [AUDITS, AUDITS_SUCCESS, AUDITS_FAILURE],
    promise: (client) => client.post('api-enterprise.successAudit', params)
  }
}

/**
 * 企业审核-不通过
 *
 * @export
 * @param params (description)
 * @returns (description)
 */
export function auditF(params) {
  return {
    types: [AUDITF, AUDITF_SUCCESS, AUDITF_FAILURE],
    promise: (client) => client.post('api-enterprise.failureAudit', params)
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
    promise: (client) => client.post('api-enterprise.add', params)
  }
}

export default function reducer(state = {result: {}}, action) {
  state = {...state, loading: action.loading};
  switch (action.type) {
    case VIEW:
    case AUDITS:
    case AUDITF:
    case ADD:
      return {
        ...state
      }
    case VIEW_SUCCESS:
      return {
        //...state,
        loading: action.loading,
        result: action.result
      }
    case VIEW_FAILURE:
      return {
        ...state
      }
    case AUDITS_SUCCESS:
      return {
        //...state,
        result: action.result
      }
    case AUDITS_FAILURE:
      return {
        ...state
      }
    case AUDITF_SUCCESS:
      return {
        //...state,
        result: action.result
      }
    case AUDITF_FAILURE:
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
