 export default (store) => {
   const AccountantRoute = require('./routes/finance').default(store);
   const route = {
      breadcrumbName: "财务结算",
      path : 'accountant',
      getChildRoutes(location, next) {
          require.ensure([], (require) => {
            next(null, [
              // Provide store for async reducers and middleware
              require('./routes/finance').default(store),
              require('./routes/offlineRegister').default(store)
            ])
          })
      }
   }
  return Object.assign({}, AccountantRoute, route);
}
