 export default (store) => ({
  breadcrumbName: "Merge",
  path: 'merge',
  getComponent(nextState, next) {
    require.ensure([], (require) => {
      /*  These modules are lazily evaluated using require hook, and
          will not loaded until the router invokes this callback. */
      const merge = require('./containers/Merge').default
      const reducer = require('./modules/MergeReducer').default

      store.injectReducer({ key: 'merge', reducer })

      next(null, merge)
    })
  }
})