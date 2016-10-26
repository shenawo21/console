 export default (store) => ({
  breadcrumbName: "角色列表",
  path: 'role',
  getComponent(nextState, next) {
    require.ensure([], (require) => {
      const role = require('./containers/Role').default
      const reducer = require('./modules/RoleReducer').default

      store.injectReducer({ key: 'role', reducer })

      next(null, role)
    })
  },
   getChildRoutes(location, next) {
     require.ensure([], (require) => {
       next(null, [
         require('./routes/Edit').default(store, location),
         require('./routes/Permis').default(store)
       ])
     })
   }
})
