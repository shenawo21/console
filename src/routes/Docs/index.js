export default (store) => ({
  breadcrumbName: "Docs",
  path: 'docs',
  getComponent(nextState, next) {
    require.ensure([], (require) => {
      /*  These modules are lazily evaluated using require hook, and
          will not loaded until the router invokes this callback. */
      const Docs = require('./containers/Docs').default
      const reducer = require('./modules/docs').default

      store.injectReducer({ key: 'docs', reducer })

      next(null, Docs)
    })
  }
})
