 export default (store) => ({
  breadcrumbName: "历史售后订单",
  path: 'history',
  getComponent(nextState, next) {
    require.ensure([], (require) => {
      /*  These modules are lazily evaluated using require hook, and
          will not loaded until the router invokes this callback. */
      const History = require('./containers/HistoryContainer').default
      const reducer = require('./modules/history').default

      store.injectReducer({ key: 'history', reducer })

      next(null, History)
    })
  }
  
})