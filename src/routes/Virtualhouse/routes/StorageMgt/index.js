export default (store) => ({
  breadcrumbName: "入库管理",
  path: 'storageMgt',
  getComponents(nextState, next) {
    require.ensure([], (require) => {
      /*  These modules are lazily evaluated using require hook, and
          will not loaded until the router invokes this callback. */
      const storageMgt = require('./containers/StorageMgt').default
      const reducer = require('./modules/StorageMgtReducer').default
      store.injectReducer({ key: 'storageMgt', reducer })
      
      next(null, storageMgt)
    })
  },
  getChildRoutes(location, next) {
      require.ensure([], (require) => {
        next(null, [
          // Provide store for async reducers and middleware
          require('./routes/CreateProduct').default(store),
          require('./routes/AdjustStock').default(store)
        ])
      })
  }
})