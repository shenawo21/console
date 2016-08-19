 export default (store) => ({
  breadcrumbName: "打单发货",
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
