const getMenu = menuLists => {
  const lists = menuLists && menuLists.map(menu => {
      /*三级菜单
      const thirdList = menu.childrenList.childrenList && menu.childrenList.childrenList.map(i => {
          return {
            title: i.name,
            url: i.url
          }
        })*/
      //console.log('thirdList',thirdList);
      const secondList = menu.childrenList && menu.childrenList.map(idx => {
          return {
            title: idx.name,
            url: idx.uri,
            //children: thirdList || null
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
        title: 'Docs',
        url: '/docs',
        icon: 'user',
        children: [
          {
            title: 'docs',
            url: '/docs'
          }
        ]
      }
    )
  }
  return lists;
}

export default getMenu;
