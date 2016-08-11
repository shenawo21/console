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
  }
})