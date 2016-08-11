
const OUTPROLIST = 'shophouse/OUTPROLIST';
const OUTPROLIST_SUCCESS = 'shophouse/OUTPROLIST_SUCCESS';
const OUTPROLIST_FAILURE = 'shophouse/OUTPROLIST_FAILURE';

const OUTPRODEL = 'shophouse/OUTPRODEL';
const OUTPRODEL_SUCCESS = 'shophouse/OUTPRODEL_SUCCESS';
const OUTPRODEL_FAILURE = 'shophouse/OUTPRODEL_FAILURE';

const OUTMANUAL = 'shophouse/OUTMANUAL';
const OUTMANUAL_SUCCESS = 'shophouse/OUTMANUAL_SUCCESS';
const OUTMANUAL_FAILURE = 'shophouse/OUTMANUAL_FAILURE';


/**
 * 新增
 * 
 * @export
 * @param params (description)
 * @returns (description)
 */
export function outProList(params) {
  return {
    types: [OUTPROLIST, OUTPROLIST_SUCCESS, OUTPROLIST_FAILURE],
    promise: (client) => client.post('/', params)
  }
}

/**
 * 删除
 * 
 * @export
 * @param params (description)
 * @returns (description)
 */
export function outProDel(params) {
  return {
    types: [OUTPRODEL, OUTPRODEL_SUCCESS, OUTPRODEL_FAILURE],
    promise: (client) => client.post('/', params)
  }
}

/**
 * 修改
 * 
 * @export
 * @param params (description)
 * @returns (description)
 */
export function outManual(params) {
  return {
    types: [OUTMANUAL, OUTMANUAL_SUCCESS, OUTMANUAL_FAILURE],
    promise: (client) => client.post('/', params)
  }
}

export default function reducer(state = {result:{}}, action) {
  state = {...state, loading : action.loading};
  switch (action.type) {
    case OUTPROLIST:
    case OUTPRODEL:
    case OUTMANUAL:
        return {
            ...state
        }
    case OUTPROLIST_SUCCESS:
        return {
            //...state,
            result: action.result
        }
    case OUTPROLIST_FAILURE:
        return {
            ...state
        }
    case OUTPRODEL_SUCCESS:
        return {
            //...state,
            result: action.result
        }
    case OUTPRODEL_FAILURE:
        return {
            ...state
        }
    case OUTMANUAL_SUCCESS:
        return {
            //...state,
            result: action.result
        }
    case OUTMANUAL_FAILURE:
        return {
            ...state
        }
    default:
      return state
  }
}
