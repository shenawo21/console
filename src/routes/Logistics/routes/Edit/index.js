 export default (store) => ({
  breadcrumbName: "添加物流公司",
  path: 'edit(/:id)',
  getComponent(nextState, next) {
    require.ensure([], (require) => {
      /*  These modules are lazily evaluated using require hook, and
          will not loaded until the router invokes this callback. */
      const edit = require('./containers/Edit').default
      const reducer = require('./modules/EditReducer').default

      store.injectReducer({ key: 'edit', reducer })

      next(null, edit)
    })
  }
})