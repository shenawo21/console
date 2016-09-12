 export default (store) => ({
  breadcrumbName: "结束商品退货",
  path: 'endGoods(/:refundId)',
  getComponent(nextState, next) {
    require.ensure([], (require) => {
      /*  These modules are lazily evaluated using require hook, and
          will not loaded until the router invokes this callback. */
      const EndGoods = require('./containers/EndGoods').default
      const reducer = require('./modules/endgoods').default

      store.injectReducer({ key: 'endgoodsinfo', reducer })

      next(null, EndGoods)
    })
  }
})