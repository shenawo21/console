export default (store) => ({
  breadcrumbName: "企业虚拟仓库管理",
  path: 'storagequery',
  getComponents(nextState, next) {
    require.ensure([], (require) => {
      /*  These modules are lazily evaluated using require hook, and
          will not loaded until the router invokes this callback. */
      const storagequery = require('./containers/StorageQuery').default
      const reducer = require('./modules/StorageQueryReducer').default
      store.injectReducer({ key: 'storagequery', reducer })
      
      next(null, storagequery)
    })
  }
}) 