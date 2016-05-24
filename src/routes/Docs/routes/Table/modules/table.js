const REQ_TABLE = 'REQ_TABLE';
const SUC_TABLE = 'SUC_TABLE';
const ERR_TABLE = 'ERR_TABLE';




/**
 * (请求aciton)
 * 
 * @export
 * @param params (接口参数)
 * @ example 
 * 
 * 1、当需要指定控制提示消息时，在client.post('api-iteminfo.queryItemList', params,{'hasMsg' : true})中加入{'hasMsg' : true}
 * 2、需要缓存数据时，配置sKey这个值，比如：sKey : 'Menu'，此配置请求一次后不会再请求
 * 
 * @returns (description)
 */

export function queryItemList(params) {
  return {
    types: [REQ_TABLE, SUC_TABLE, ERR_TABLE],
    promise: (client) => client.post('api-iteminfo.queryItemList', params),
    //sKey : 'Menu'  //需要缓存数据时，配置sKey这个值，请求一次后不会再请求
  }
}

export default function reducer(state = {result:{}}, action) {
  state = {...state, loading : action.loading};
  switch (action.type) {
    case REQ_TABLE:
      return {
        ...state,
      }
    case SUC_TABLE:
      return {
        ...state,
        result: action.result,
      }
    case ERR_TABLE:
      return {
        ...state,
      }

    default:
      return state
  }
}
