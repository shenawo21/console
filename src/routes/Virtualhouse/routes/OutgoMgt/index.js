export default (store) => ({
  breadcrumbName: "出库管理",
  path: 'outgoMgt',
  getComponents(nextState, next) {
    require.ensure([], (require) => {
      /*  These modules are lazily evaluated using require hook, and
          will not loaded until the router invokes this callback. */
      const outgoMgt = require('./containers/OutgoMgt').default
      const reducer = require('./modules/OutgoMgtReducer').default
      store.injectReducer({ key: 'outgoMgt', reducer })

      next(null, outgoMgt)
    })
  }
})
