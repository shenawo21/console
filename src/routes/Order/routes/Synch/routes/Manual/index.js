 export default (store) => ({
  breadcrumbName: "人工同步订单",
  path: 'manual',
  getComponent(nextState, next) {
    require.ensure([], (require) => {
      const manual = require('./containers/Manual').default
      const reducer = require('./modules/ManualReducer').default
      store.injectReducer({ key: 'manual', reducer })
      next(null, manual)
    })
  }
})
