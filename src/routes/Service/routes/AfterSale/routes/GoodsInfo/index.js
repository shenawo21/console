 export default (store) => ({
  breadcrumbName: "订单退货",
  path: 'applyGoods(/:refundId)',
  getComponent(nextState, next) {
    require.ensure([], (require) => {
      /*  These modules are lazily evaluated using require hook, and
          will not loaded until the router invokes this callback. */
      const Goodsinfo = require('../Info/containers/Info').default
      const reducer = require('../Info/modules/InfoReducer').default

      store.injectReducer({ key: 'moneyinfo', reducer })

      next(null, Goodsinfo)
    })
  }
})