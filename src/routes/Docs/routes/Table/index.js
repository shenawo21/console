export default (store) => ({
  breadcrumbName: "table",
  path: 'table',
  getComponents(nextState, next) {
    require.ensure([], (require) => {
      /*  These modules are lazily evaluated using require hook, and
          will not loaded until the router invokes this callback. */
      const Table = require('./containers/Table').default
      const reducer = require('./modules/table').default
      store.injectReducer({ key: 'table', reducer })
      
      next(null, Table)
    })
  }
})