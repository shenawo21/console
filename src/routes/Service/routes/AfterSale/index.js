 export default (store) => ({
  breadcrumbName: "售后处理",
  path: 'aftersale',
  getComponent(nextState, next) {
    require.ensure([], (require) => {
      /*  These modules are lazily evaluated using require hook, and
          will not loaded until the router invokes this callback. */
      const afterSale = require('./containers/AfterSale').default
      const reducer = require('./modules/AfterSaleReducer').default

      store.injectReducer({ key: 'aftersale', reducer })

      next(null, afterSale)
    })
  }
})