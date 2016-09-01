 export default (store) => ({
  breadcrumbName: "线下登记",
  path: 'offlineRegister',
  getComponent(nextState, next) {
    require.ensure([], (require) => {
      /*  These modules are lazily evaluated using require hook, and
          will not loaded until the router invokes this callback. */
      const Warehouse = require('./containers/OfflineRegister').default
      const reducer = require('./modules/OfflineRegisterReducer').default

      store.injectReducer({ key: 'offlineRegister', reducer })

      next(null, Warehouse)
    })
  }
})