 export default (store) => ({
  breadcrumbName: "帐号列表",
  path: 'accounts',
  getComponent(nextState, next) {
    require.ensure([], (require) => {
      /*  These modules are lazily evaluated using require hook, and
          will not loaded until the router invokes this callback. */
      const accounts = require('./containers/Accounts').default
      const reducer = require('./modules/AccountsReducer').default

      store.injectReducer({ key: 'accounts', reducer })

      next(null, accounts)
    })
  }
})