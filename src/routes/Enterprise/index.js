 export default (store) => ({
  breadcrumbName: "企业管理",
  path: 'enterprise',
  getComponent(nextState, next) {
    require.ensure([], (require) => {
      const enterprise = require('./containers/Enterprise').default
      const reducer = require('./modules/EnterpriseReducer').default

      store.injectReducer({ key: 'enterprise', reducer })

      next(null, enterprise)
    })
  }
})
