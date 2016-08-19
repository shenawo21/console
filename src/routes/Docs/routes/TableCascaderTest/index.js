 export default (store) => ({
  breadcrumbName: "TableCascaderTest",
  path: 'tableCascaderTest',
  getComponent(nextState, next) {
    require.ensure([], (require) => {
      /*  These modules are lazily evaluated using require hook, and
          will not loaded until the router invokes this callback. */
      const tableCascaderTest = require('./containers/TableCascaderTest').default
      const reducer = require('./modules/TableCascaderTestReducer').default

      store.injectReducer({ key: 'tableCascaderTest', reducer })

      next(null, tableCascaderTest)
    })
  }
})