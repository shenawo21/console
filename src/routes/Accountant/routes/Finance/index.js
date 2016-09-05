 export default (store) => ({
  breadcrumbName: "财务处理",
  path: 'finance',
  getComponent(nextState, next) {
    require.ensure([], (require) => {
      /*  These modules are lazily evaluated using require hook, and
          will not loaded until the router invokes this callback. */
      const finance = require('./containers/Finance').default
      const reducer = require('./modules/FinanceReducer').default

      store.injectReducer({ key: 'finance', reducer })

      next(null, finance)
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