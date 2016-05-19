 export default (store) => ({
  breadcrumbName: "角色列表",
  path: 'role',
  getComponent(nextState, next) {
    require.ensure([], (require) => {
      /*  These modules are lazily evaluated using require hook, and
          will not loaded until the router invokes this callback. */
      const role = require('./containers/Role').default
      const reducer = require('./modules/RoleReducer').default

      store.injectReducer({ key: 'role', reducer })

      next(null, role)
    })
  },
  
  getChildRoutes(location, next) {
      require.ensure([], (require) => {
        next(null, [
          // Provide store for async reducers and middleware
          require('./routes/Edit').default(store)
        ])
      })
  },
})