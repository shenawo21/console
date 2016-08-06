export default (store) => ({
  breadcrumbName: "出库单查询",
  path: 'outgoquery',
  getComponents(nextState, next) {
    require.ensure([], (require) => {
      /*  These modules are lazily evaluated using require hook, and
          will not loaded until the router invokes this callback. */
      const OutgoQuery = require('./containers/OutgoQuery').default
      const reducer = require('./modules/OutgoQueryReducer').default
      store.injectReducer({ key: 'outgoquery', reducer })
      
      next(null, OutgoQuery)
    })
  }
})