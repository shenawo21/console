const menuLists = [
  {
    title: '企业管理',
    url: '/',
    icon: 'home',
    when: '',
    children: [
      {
        title: '企业列表',
        url: '/enterprise',
        icon: 'wb-dashboard',
        when: '',
      }, {
        title: '企业申请入驻',
        url: '/enterprise/edit',
        icon: 'wb-dashboard',
        when: ''
      }
    ]
  }, {
    title: '账号管理',
    url: '/accounts',
    icon: 'user',
    when: '',
    children: [
      {
        title: '账号列表',
        url: '/accounts',
        icon: 'wb-dashboard',
        when: '',
      }, {
        title: '角色',
        url: '/role',
        icon: 'wb-dashboard',
        when: '',
      }
    ]
  }
]


 if(__DEV__){
    menuLists.push(
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
 
 export default menuLists;