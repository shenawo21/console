 export default (store) => ({
  breadcrumbName: "店铺管理",
  path: 'applic',
  getComponent(nextState, next) {
    require.ensure([], (require) => {
      const applic = require('./containers/Applic').default
      const reducer = require('./modules/ApplicReducer').default
      store.injectReducer({ key: 'applic', reducer })
      next(null, applic)
    })
  },
   getChildRoutes(location, next) {
     require.ensure([], (require) => {
       next(null, [
         require('./routes/Edit').default(store, location),
         require('./routes/Joint').default(store),
         require('./routes/Add').default(store)
       ])
     })
   }
})
