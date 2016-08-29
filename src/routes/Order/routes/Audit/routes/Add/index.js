 export default (store) => ({
  breadcrumbName: "Add",
  path: 'add',
  getComponent(nextState, next) {
    require.ensure([], (require) => {
      /*  These modules are lazily evaluated using require hook, and
          will not loaded until the router invokes this callback. */
      const add = require('./containers/Add').default
      const reducer = require('./modules/AddReducer').default

      store.injectReducer({ key: 'add', reducer })

      next(null, add)
    })
  }
})