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

 if(__DEV__){
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
       icon: 'setting',
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
       icon: 'setting',
       children: [
         {
           title: '店铺仓库',
           url: '/shophouse'
         },
         {
            title: '出入库单查询',
            url: '/shophouse/shopoddquery'
          }
       ]
     }
    )
 }
 return lists;
}

 export default getMenu;
