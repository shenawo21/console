 export default (store) => ({
  breadcrumbName: "手动出库",
  path: 'outgoManual',
  getComponent(nextState, next) {
    require.ensure([], (require) => {
      /*  These modules are lazily evaluated using require hook, and
          will not loaded until the router invokes this callback. */
      const outgoManual = require('./containers/OutgoManual').default
      const reducer = require('./modules/OutgoManualReducer').default

      store.injectReducer({ key: 'outgoManual', reducer })

      next(null, outgoManual)
    })
  }
})