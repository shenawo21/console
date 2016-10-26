export default (store, location) => ({
    breadcrumbName: location.pathname.split('edit/')[1] ? "编辑账号" : "新增帐号",
    path: 'edit(/:id)',
    getComponents(nextState, next) {
      require.ensure([], (require) => {
        /*  These modules are lazily evaluated using require hook, and
            will not loaded until the router invokes this callback. */
        const Edit = require('./containers/Edit').default
        const reducer = require('./modules/EditReducer').default
        store.injectReducer({ key: 'edit', reducer })

        next(null, Edit)
      })
    }
  })