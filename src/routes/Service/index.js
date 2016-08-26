 export default (store) => {
   const GoodsRoute = require('./routes/aftersale').default(store);
   const route = {
      breadcrumbName: "售后服务",
      path : 'service',
      getChildRoutes(location, next) {
          require.ensure([], (require) => {
            next(null, [
              // Provide store for async reducers and middleware
              require('./routes/aftersale').default(store),
             // require('./routes/warehouse').default(store),
             // require('./routes/history').default(store)
            ])
          })
      }
   }
  return Object.assign({}, GoodsRoute, route);
}
