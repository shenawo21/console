 export default (store) => ({
  breadcrumbName: "企业列表",
  path: 'enterprise',
  getComponent(nextState, next) {
    require.ensure([], (require) => {
      /*  These modules are lazily evaluated using require hook, and
          will not loaded until the router invokes this callback. */
      const Enterprise = require('./containers/EnterpriseContainer').default
      const reducer = require('./modules/enterprise').default

      store.injectReducer({ key: 'enterprise', reducer })

      next(null, Enterprise)
    })
  }
})
