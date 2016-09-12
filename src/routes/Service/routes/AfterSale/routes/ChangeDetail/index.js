 export default (store) => ({
  breadcrumbName: "换货处理详情",
  path: 'changedetail(/:refundId)',
  getComponent(nextState, next) {
    require.ensure([], (require) => {
      /*  These modules are lazily evaluated using require hook, and
          will not loaded until the router invokes this callback. */
      const ChangeDetail = require('./containers/ChangeDetail').default
      const reducer = require('./modules/changedetail').default

      store.injectReducer({ key: 'changedetail', reducer })

      next(null, ChangeDetail)
    })
  }
})