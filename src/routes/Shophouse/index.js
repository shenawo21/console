 export default (store) => ({
  breadcrumbName: "店铺仓库管理",
  path: 'shophouse',
  getComponent(nextState, next) {
    require.ensure([], (require) => {
      /*  These modules are lazily evaluated using require hook, and
          will not loaded until the router invokes this callback. */
      const shophouse = require('./containers/shophouse').default
      const reducer = require('./modules/ShophouseReducer').default

      store.injectReducer({ key: 'shophouse', reducer })

      next(null, shophouse)
    })
  },
  
  getChildRoutes(location, next) {
      require.ensure([], (require) => {
        next(null, [
          // Provide store for async reducers and middleware
          require('./routes/OddQuery').default(store),
          require('./routes/AdjustPrice').default(store),
          require('./routes/OutgoManual').default(store),
          require('./routes/AddressManage').default(store)
        ])
      })
  }
})