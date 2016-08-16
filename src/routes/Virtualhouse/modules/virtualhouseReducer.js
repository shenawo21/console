
//列表查询
const VIRHOUSEQUERY = 'virtualhouse/VIRHOUSEQUERY';
const VIRHOUSEQUERY_SUCCESS = 'virtualhouse/VIRHOUSEQUERY_SUCCESS';
const VIRHOUSEQUERY_FAILURE = 'virtualhouse/VIRHOUSEQUERY_FAILURE';
//导出
const EXPORTVIR = 'virtualhouse/EXPORTVIR';
const EXPORTVIR_SUCCESS = 'virtualhouse/EXPORTVIR_SUCCESS';
const EXPORTVIR_FAILURE = 'virtualhouse/EXPORTVIR_FAILURE';

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
    promise: (client) => client.post('api-productService.ListVirtualDepot', params)
  }
}
/**
 * 列表勾选导出
 *
 * @export
 * @param params (description)
 * @returns (description)
 */
export function exportVir(params) {
  return {
    types: [EXPORTVIR, EXPORTVIR_SUCCESS, EXPORTVIR_FAILURE],
    promise: (client) => client.post('api-productService.ListVirtualDepot', params)
  }
}

export default function reducer(state = {result:{}}, action) {
  state = {...state, loading : action.loading};
  switch (action.type) {
    case VIRHOUSEQUERY:
    case EXPORTVIR:
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
    case EXPORTVIR_SUCCESS:
        return {
            ...state,
            result: action.result
        }
    case EXPORTVIR_FAILURE:
        return {
            ...state
        }
    default:
      return state
  }
}
