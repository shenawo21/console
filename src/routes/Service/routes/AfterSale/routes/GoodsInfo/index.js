 export default (store) => ({
  breadcrumbName: "订单退款",
  path: 'applyGoods(/:refundId)',
  getComponent(nextState, next) {
    require.ensure([], (require) => {
      /*  These modules are lazily evaluated using require hook, and
          will not loaded until the router invokes this callback. */
      const Goodsinfo = require('./containers/Goodsinfo').default
      const reducer = require('./modules/goodsinfo').default

      store.injectReducer({ key: 'goodsinfo', reducer })

      next(null, Goodsinfo)
    })
  }
})