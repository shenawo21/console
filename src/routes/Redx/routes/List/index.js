export default (store) => ({
  breadcrumbName: "List",
  path: 'list',
  getComponent(nextState, next) {
    require.ensure([], (require) => {
      /*  These modules are lazily evaluated using require hook, and
          will not loaded until the router invokes this callback. */
      const List = require('./containers/List').default
      const reducer = require('./modules/list').default

      store.injectReducer({ key: 'list', reducer })

      next(null, List)
    })
  }
})