 export default (store) => ({
  breadcrumbName: "订单退款",
  path: 'info(/:id/:state)',
  getComponent(nextState, next) {
    require.ensure([], (require) => {
      /*  These modules are lazily evaluated using require hook, and
          will not loaded until the router invokes this callback. */
      const Info = require('./containers/Info').default
      const reducer = require('./modules/InfoReducer').default

      store.injectReducer({ key: 'info', reducer })

      next(null, Info)
    })
  }
})