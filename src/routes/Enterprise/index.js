 export default (store) => ({
  breadcrumbName: "企业列表",
  path: 'enterprise',
  getComponent(nextState, next) {
    require.ensure([], (require) => {
      const enterprise = require('./containers/Enterprise').default
      const reducer = require('./modules/EnterpriseReducer').default

      store.injectReducer({ key: 'enterprise', reducer })

      next(null, enterprise)
    })
  },
   getChildRoutes(location, next) {
     require.ensure([], (require) => {
       next(null, [
         require('./routes/Edit').default(store)
       ])
     })
   }
})
