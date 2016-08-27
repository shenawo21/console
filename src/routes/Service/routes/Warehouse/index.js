 export default (store) => ({
  breadcrumbName: "仓库处理",
  path: 'warehouse',
  getComponent(nextState, next) {
    require.ensure([], (require) => {
      /*  These modules are lazily evaluated using require hook, and
          will not loaded until the router invokes this callback. */
      const Warehouse = require('./containers/Warehouse').default
      const reducer = require('./modules/WarehouseReducer').default

      store.injectReducer({ key: 'Warehouse', reducer })

      next(null, Warehouse)
    })
  },
  getChildRoutes(location, next) {
      require.ensure([], (require) => {
        next(null, [
          // Provide store for async reducers and middleware
          require('./routes/Info').default(store)
        ])
      })
  }
})