export default (store) => ({
  breadcrumbName: "出入库单查询",
  path: 'oddquery',
  getComponents(nextState, next) {
    require.ensure([], (require) => {
      /*  These modules are lazily evaluated using require hook, and
          will not loaded until the router invokes this callback. */
      const OddQuery = require('./components/OddQueryView').default
      // const reducer = require('./modules/OddQueryReducer').default
      // store.injectReducer({ key: 'oddquery', reducer })
      
      next(null, OddQuery)
    })
  }
})