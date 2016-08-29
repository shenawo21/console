 export default (store) => ({
  breadcrumbName: "审单",
  path: 'audit',
  getComponent(nextState, next) {
    require.ensure([], (require) => {
      const audit = require('./containers/Audit').default
      const reducer = require('./modules/AuditReducer').default
      store.injectReducer({ key: 'audit', reducer })
      next(null, audit)
    })
  },
   getChildRoutes(location, next) {
     require.ensure([], (require) => {
       next(null, [
         require('./routes/Detail').default(store),
         require('./routes/Deal').default(store),
         require('./routes/Apart').default(store),
         require('./routes/Merge').default(store)
       ])
     })
   }
})
