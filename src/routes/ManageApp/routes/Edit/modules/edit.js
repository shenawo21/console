/**
 * edit.js
 * @date Created on 2016/5/5
 * @author ShenXing(慎行)<shenxing@suneee.com>
 *
 */
export const GET_INFOR = 'GET_INFOR';
export const GET_SUCCESS = 'GET_SUCCESS';
export const GET_FAIL = 'GET_FAIL';
export function getInfor(params) {
  return {
    types: [GET_INFOR, GET_SUCCESS, GET_FAIL],
    promise: (client) => client.get('get.infor',params)
  }
}
export default function reducer(state = {
  app: [],
  date:{userName:'mmm',textarea:null}
}, action) {
  switch (action.type) {
    case GET_INFOR:
      return {
        ...state,
        loading: true
      };
    case GET_SUCCESS:
      return {
        ...state,
        repo: action.result.data,
        loading: false
      };
    case GET_FAIL:
      return {
        ...state,
        loading: false
      }
    default:
      return state
  }
}
