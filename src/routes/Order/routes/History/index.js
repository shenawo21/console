 export default (store) => ({
  breadcrumbName: "历史订单",
  path: 'history',
  getComponent(nextState, next) {
    require.ensure([], (require) => {
      const history = require('./containers/History').default
      const reducer = require('./modules/HistoryReducer').default
      store.injectReducer({ key: 'history', reducer })
      next(null, history)
    })
  }
})
