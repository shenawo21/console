// 地址列表
const REQ_ADDRESS_LIST = 'REQ_ADDRESS_LIST';
const SUC_ADDRESS_LIST = 'SUC_ADDRESS_LIST';
const ERR_ADDRESS_LIST = 'ERR_ADDRESS_LIST';
// 获取单个地址信息
const REQ_ADDRESS_ITEM = 'REQ_ADDRESS_ITEM';
const SUC_ADDRESS_ITEM = 'SUC_ADDRESS_ITEM';
const ERR_ADDRESS_ITEM = 'ERR_ADDRESS_ITEM';
// 删除地址操作
const REQ_ADDRESS = 'REQ_ADDRESS';
const SUC_ADDRESS = 'SUC_ADDRESS';
const ERR_ADDRESS = 'ERR_ADDRESS';
// 添加地址操作
const REQ_ADDADDRESS = 'REQ_ADDADDRESS';
const SUC_ADDADDRESS = 'SUC_ADDADDRESS';
const ERR_ADDADDRESS = 'ERR_ADDADDRESS';
// 编辑地址操作
const REQ_EDITADDRESS = 'REQ_EDITADDRESS';
const SUC_EDITADDRESS = 'SUC_EDITADDRESS';
const ERR_EDITADDRESS = 'ERR_EDITADDRESS';
// 设为默认地址
const REQ_DEFAULT = 'REQ_DEFAULT';
const SUC_DEFAULT = 'SUC_DEFAULT';
const ERR_DEFAULT = 'ERR_DEFAULT';
// 店铺列表
const REQ_SHOPLIST = 'REQ_SHOPLIST';
const SUC_SHOPLIST = 'SUC_SHOPLIST';
const ERR_SHOPLIST = 'ERR_SHOPLIST';
// 区域地址级联
const REQ_LIST = 'REQ_LIST';
const SUC_LIST = 'SUC_LIST';
const ERR_LIST = 'ERR_LIST';

export function gitAddressList() {
  return {
    types: [REQ_ADDRESS_LIST, SUC_ADDRESS_LIST, ERR_ADDRESS_LIST],
    promise: (client) => client.post('api-refundAddress.refundAddressList')
}
}
export function gitAddressItem(params) {
  return {
    types: [REQ_ADDRESS_ITEM, SUC_ADDRESS_ITEM, ERR_ADDRESS_ITEM],
    promise: (client) => client.post('api-refundAddress.getRefundAddressById',params)
}
}
export function delAddress(params) {
  return {
    types: [REQ_ADDRESS, SUC_ADDRESS, ERR_ADDRESS],
    promise: (client) => client.post('api-refundAddress.deleteRefundAddress',params)
}
}
export function addAddress(params) {
  return {
    types: [REQ_ADDADDRESS, SUC_ADDADDRESS, ERR_ADDADDRESS],
    promise: (client) => client.post('api-refundAddress.addRefundAddress',params)
}
}
export function editAddress(params) {
  return {
    types: [REQ_EDITADDRESS, SUC_EDITADDRESS, ERR_EDITADDRESS],
    promise: (client) => client.post('api-refundAddress.updateRefundAddress',params)
}
}
export function setDefault(params) {
  return {
    types: [REQ_DEFAULT, SUC_DEFAULT, ERR_DEFAULT],
    promise: (client) => client.post('api-refundAddress.isDefault',params)
}
}
export function getShopList() {
    return {
        types: [REQ_SHOPLIST, SUC_SHOPLIST, ERR_SHOPLIST],
        promise: (client) => client.post('api-shop.listEnterpriseShop')
    }
}
export function list() {
    return {
        types: [REQ_LIST, SUC_LIST, ERR_LIST],
        promise: (client) => client.post('resources.get?path=static.resource.areas')
    }
}
export default function reducer(state = { result: [] }, action) {
  state = {...state, loading: action.loading };
  switch (action.type) {
    case REQ_ADDRESS_LIST:
      return {
        ...state
      }
    case SUC_ADDRESS_LIST:
      return {
        ...state,
        result: action.result
      }
    case ERR_ADDRESS_LIST:
      return {
        ...state
      }
    case REQ_ADDRESS_ITEM:
      return {
        ...state
      }
    case SUC_ADDRESS_ITEM:
      return {
        ...state,
        addressItem: action.result
      }
    case ERR_ADDRESS_ITEM:
      return {
        ...state
      }  
    case REQ_ADDRESS:
      return {
        ...state
      }
    case SUC_ADDRESS:
      return {
        ...state
      }
    case ERR_ADDRESS:
      return {
        ...state
      }
    case REQ_ADDADDRESS:
      return {
        ...state
      }
    case SUC_ADDADDRESS:
      return {
        ...state
      }
    case ERR_ADDADDRESS:
      return {
        ...state
      }
    case REQ_EDITADDRESS:
      return {
        ...state
      }
    case SUC_EDITADDRESS:
      return {
        ...state
      }
    case ERR_EDITADDRESS:
      return {
        ...state
      }
    case REQ_DEFAULT:
      return {
        ...state
      }
    case SUC_DEFAULT:
      return {
        ...state
      }
    case ERR_DEFAULT:
      return {
        ...state
      }   
    case REQ_SHOPLIST:
        return {
            ...state
        }    
    case SUC_SHOPLIST:
        return {
            ...state,
            shoplist: action.result
        }
    case ERR_SHOPLIST:
        return {
            ...state
    }

    case REQ_LIST:
        return {
            ...state
        }    
    case SUC_LIST:
        return {
            ...state,
            addresslist: action.result
        }
    case ERR_LIST:
        return {
            ...state
    } 

    default:
      return state
  }
}
