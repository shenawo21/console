 export default (store) => ({
  breadcrumbName: "Edit",
  path: 'edit',
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