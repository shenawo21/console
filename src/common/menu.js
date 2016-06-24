// const menuLists = [
//   {
//     title: '企业管理',
//     url: '/enterprise',
//     icon: 'home',
//     when: '',
//     children: [
//       {
//         title: '企业详情',
//         url: '/enterprise',
//         icon: 'wb-dashboard',
//         when: '',
//       }
//     ]
//   }, {
//     title: '账号管理',
//     url: '/accounts',
//     icon: 'user',
//     when: '',
//     children: [
//       {
//         title: '账号列表',
//         url: '/accounts',
//         icon: 'wb-dashboard',
//         when: '',
//       }, {
//         title: '角色',
//         url: '/role',
//         icon: 'wb-dashboard',
//         when: '',
//       }
//     ]
//   },
//   {
//     title: '应用管理',
//     url: '/manage',
//     icon: 'user',
//     when: '',
//     children: [
//       {
//         title: '应用管理',
//         url: '/manage',
//         icon: 'wb-dashboard',
//         when: '',
//       }
//     ]
//   }
// ]

const getMenu = menuLists => {
  const lists = menuLists && menuLists.map(menu => {
      const childrenList = menu.childrenList && menu.childrenList.map(idx => {
        return {
            title: idx.name,
            url: idx.url,
            icon: idx.icon,
            when: idx.when
          }
      })
      return {
          title: menu.name,
          url: menu.url,
          icon: menu.icon,
          when: menu.when,
          children: childrenList || []
      };
  }) || [];

 if(__DEV__){
    lists.push(
      {
       title: 'docs',
       url: '/docs',
       icon: 'user',
       when: '',
       children: [
         {
           title: 'docs',
           url: '/docs',
           icon: 'wb-dashboard',
           when: '',
         }
       ]
     }
    )
 }
 return lists;
}

 export default getMenu;
