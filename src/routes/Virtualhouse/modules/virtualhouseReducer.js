
//列表查询
const VIRHOUSEQUERY = 'virtualhouse/VIRHOUSEQUERY';
const VIRHOUSEQUERY_SUCCESS = 'virtualhouse/VIRHOUSEQUERY_SUCCESS';
const VIRHOUSEQUERY_FAILURE = 'virtualhouse/VIRHOUSEQUERY_FAILURE';


/**
 * 列表查询
 *
 * @export
 * @param params (description)
 * @returns (description)
 */
export function virhoustQueryList(params) {
  return {
    types: [VIRHOUSEQUERY, VIRHOUSEQUERY_SUCCESS, VIRHOUSEQUERY_FAILURE],
    promise: (client) => client.post('api-administrator.list', params)
  }
}


export default function reducer(state = {result:{}}, action) {
  state = {...state, loading : action.loading};
  switch (action.type) {
    case VIRHOUSEQUERY:
        return {
            ...state
        }
    case VIRHOUSEQUERY_SUCCESS:
        return {
            ...state,
            result: action.result
        }
    case VIRHOUSEQUERY_FAILURE:
        return {
            ...state
        }
    default:
      return state
  }
}
