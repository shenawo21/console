export default (store) => ({
  breadcrumbName: "Redx",
  path: 'redx',
  getComponent(nextState, next) {
    require.ensure([], (require) => {
      /*  These modules are lazily evaluated using require hook, and
          will not loaded until the router invokes this callback. */
      const Redx = require('./containers/Redx').default
      const reducer = require('./modules/redx').default

      store.injectReducer({ key: 'redx', reducer })

      next(null, Redx)
    })
  },
  getChildRoutes(location, next) {
      require.ensure([], (require) => {
        next(null, [
          // Provide store for async reducers and middleware
          require('./routes/List').default(store)
        ])
      })
  },
})
