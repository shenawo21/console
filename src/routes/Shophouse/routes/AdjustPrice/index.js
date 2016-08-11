 export default (store) => ({
  breadcrumbName: "价格调整",
  path: 'adjustPrice',
  getComponent(nextState, next) {
    require.ensure([], (require) => {
      /*  These modules are lazily evaluated using require hook, and
          will not loaded until the router invokes this callback. */
      const adjustPrice = require('./containers/AdjustPrice').default
      const reducer = require('./modules/AdjustPriceReducer').default

      store.injectReducer({ key: 'adjustPrice', reducer })

      next(null, adjustPrice)
    })
  }
})