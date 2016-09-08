// const menuLists = [
//   {
//     title: '企业管理',
//     url: '/enterprise',
//     icon: 'home'
//     children: [
//       {
//         title: '企业详情',
//         url: '/enterprise',
//         icon: 'wb-dashboard'
//       }
//     ]
//   }, {
//     title: '账号管理',
//     url: '/accounts',
//     icon: 'user'
//     children: [
//       {
//         title: '账号列表',
//         url: '/accounts',
//         icon: 'wb-dashboard'
//       }, {
//         title: '角色',
//         url: '/role',
//         icon: 'wb-dashboard'
//       }
//     ]
//   },
//   {
//     title: '应用管理',
//     url: '/manage',
//     icon: 'user',
//     children: [
//       {
//         title: '应用管理',
//         url: '/manage',
//         icon: 'wb-dashboard'
//       }
//     ]
//   }
// ]

const getMenu = menuLists => {
  const lists = menuLists && menuLists.map(menu => {
      const thirdList = menu.childrenList.childrenList && menu.childrenList.childrenList.map(i => {
          return {
            title: i.name,
            url: i.url
          }
        })
      //console.log('thirdList',thirdList);
      const secondList = menu.childrenList && menu.childrenList.map(idx => {
          return {
            title: idx.name,
            url: idx.url,
            children: thirdList || null
          }
        })
      //console.log('secondList',secondList);
      return {
        title: menu.name,
        icon: menu.icon,
        children: secondList || []
      };
    }) || [];

  if (__DEV__) {
    lists.push(
      {
        title: 'docs',
        url: '/docs',
        icon: 'user',
        children: [
          {
            title: 'docs',
            url: '/docs'
          }
        ]
      },
      {
        title: '虚拟总仓管理',
        icon: 'home',
        children: [
          {
            title: '虚拟总仓',
            url: 'virtualhouse'
          },
          {
            title: '出入库单查询',
            url: '/virtualhouse/OddQuery'
          },
          {
            title: '商品规格值管理',
            url: '/virtualhouse/specificationMgt'
          }
        ]
      },
      {
        title: '店铺仓库管理',
        icon: 'home',
        children: [
          {
            title: '店铺仓库',
            url: '/shophouse'
          },
          {
            title: '出入库单查询',
            url: '/shophouse/shopoddquery'
          },
          {
            title: '退货地址管理',
            url: '/shophouse/address'
          }
        ]
      },
      {
        title: '订单管理',
        icon: 'shopping-cart',
        children: [
          {
            title: '同步订单',
            url: '/order/synch'
          },
          {
            title: '审单',
            url: '/order/audit'
          },
          {
            title: '打单发货',
            url: '/order/invoice'
          },
          {
            title: '历史订单',
            url: '/order/history'
          },
          {
            title: '新建订单',
            url: '/order/add'
          }
        ]
      },
      {
        title: '应用管理',
        icon: 'hdd',
        children: [
          {
            title: '我的应用',
            url: '/applic'
          }
        ]
      },
      {
        title: '售后服务',
        icon: 'customerservice',
        children: [
          {
            title: '售后处理',
            url: '/service/aftersale'
          },
          {
            title: '仓库处理',
            url: '/service/warehouse'
          },
          {
            title: '历史售后订单',
            url: '/service/history'
          }
        ]
      },
      {
        title: '财务结算',
        icon: 'calculator',
        children: [
          {
            title: '财务处理',
            url: '/accountant/finance'
          },
          {
            title: '线下登记',
            url: '/accountant/offlineRegister'
          }
        ]
      },
      {
        title: '物流管理',
        icon: 'calculator',
        children: [
          {
            title: '物流公司管理',
            url: '/logistics'
          },
          {
            title: '物流公司新增／修改',
            url: '/logistics/edit'
          }
        ]
      }
    )
  }
  return lists;
}

export default getMenu;
