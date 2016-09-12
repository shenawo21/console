 export default (store) => ({
  breadcrumbName: "订单换货",
  path: 'orderChange(/:tid)',
  getComponent(nextState, next) {
    require.ensure([], (require) => {
      const Changelist = require('./containers/Changelist').default
      const reducer = require('./modules/changeslist').default

      store.injectReducer({ key: 'changeslist', reducer })

      next(null, Changelist)
    })
  }
  // getChildRoutes(location, next) {
  //     require.ensure([], (require) => {
  //       next(null, [
  //         // Provide store for async reducers and middleware
  //         require('./routes/Info').default(store),
  //         require('./routes/GoodsInfo').default(store),
  //         require('./routes/endGoods').default(store),
  //         require('./routes/ChangeGoods').default(store)
  //       ])
  //     })
  // }
})