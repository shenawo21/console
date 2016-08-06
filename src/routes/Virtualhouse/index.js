 export default (store) => ({
  breadcrumbName: "虚拟总仓",
  path: 'virtualhouse',
  getComponent(nextState, next) {
    require.ensure([], (require) => {
      /*  These modules are lazily evaluated using require hook, and
          will not loaded until the router invokes this callback. */
      const virtualhouse = require('./containers/virtualhouse').default
      const reducer = require('./modules/virtualhouseReducer').default

      store.injectReducer({ key: 'virtualhouse', reducer })

      next(null, virtualhouse)
    })
  },
  
  getChildRoutes(location, next) {
      require.ensure([], (require) => {
        next(null, [
          // Provide store for async reducers and middleware
          require('./routes/OddQuery').default(store),
          require('./routes/OutgoMgt').default(store),
          require('./routes/StorageMgt').default(store)
        ])
      })
  },
})