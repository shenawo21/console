//列表查询
const OUTQUERY = 'virtualhouse/OUTQUERY';
const OUTQUERY_SUCCESS = 'virtualhouse/OUTQUERY_SUCCESS';
const OUTQUERY_FAILURE = 'virtualhouse/OUTQUERY_FAILURE';


/**
 * 列表查询
 *
 * @export
 * @param params (description)
 * @returns (description)
 */
export function outgoQueryList(params) {
  return {
    types: [OUTQUERY, OUTQUERY_SUCCESS, OUTQUERY_FAILURE],
    promise: (client) => client.post('api-administrator.list', params)
  }
}



export default function reducer(state = {result:{}}, action) {
  state = {...state, loading : action.loading};
  switch (action.type) {
    case OUTQUERY:
        return {
            ...state
        }
    case OUTQUERY_SUCCESS:
        return {
            ...state,
            result: action.result
        }
    case OUTQUERY_FAILURE:
        return {
            ...state
        }
    default:
      return state
  }
}
