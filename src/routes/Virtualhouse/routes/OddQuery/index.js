 export default (store) => ({
  breadcrumbName: "OddQuery",
  path: 'oddQuery',
  getComponent(nextState, next) {
    require.ensure([], (require) => {
      /*  These modules are lazily evaluated using require hook, and
          will not loaded until the router invokes this callback. */
      const oddQuery = require('./containers/OddQuery').default
      const reducer = require('./modules/OddQueryReducer').default

      store.injectReducer({ key: 'oddQuery', reducer })

      next(null, oddQuery)
    })
  }
})