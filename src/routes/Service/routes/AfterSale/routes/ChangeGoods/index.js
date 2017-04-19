 export default (store) => ({
  breadcrumbName: "订单换货",
  path: 'change(/:oid/:buyerNick/:skuId/:orderId)',
  getComponent(nextState, next) {
    require.ensure([], (require) => {
      /*  These modules are lazily evaluated using require hook, and
          will not loaded until the router invokes this callback. */
      const Info = require('./containers/goods').default
      const reducer = require('./modules/GoodsReducer').default

      store.injectReducer({ key: 'changegoods', reducer })

      next(null, Info)
    })
  }
})