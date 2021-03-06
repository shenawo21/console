 export default (store) => ({
  breadcrumbName: "物流管理",
  path: 'logistics',
  getComponent(nextState, next) {
    require.ensure([], (require) => {
      /*  These modules are lazily evaluated using require hook, and
          will not loaded until the router invokes this callback. */
      const logistics = require('./containers/Logistics').default
      const reducer = require('./modules/LogisticsReducer').default

      store.injectReducer({ key: 'logistics', reducer })

      next(null, logistics)
    })
  },
  getChildRoutes(location, next) {
    require.ensure([], (require) => {
      next(null, [
        require('./routes/Add').default(store),
      ])
    })
  }
})
