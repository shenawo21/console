 export default (store) => ({
  breadcrumbName: "调整入库",
  path: 'adjustStock',
  getComponent(nextState, next) {
    require.ensure([], (require) => {
      /*  These modules are lazily evaluated using require hook, and
          will not loaded until the router invokes this callback. */
      const adjustStock = require('./containers/AdjustStock').default
      const reducer = require('./modules/AdjustStockReducer').default

      store.injectReducer({ key: 'adjustStock', reducer })

      next(null, adjustStock)
    })
  }
})