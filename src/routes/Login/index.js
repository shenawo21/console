 export default (store) => ({
  breadcrumbName: "Login",
  path: 'login',
  getComponent(nextState, next) {
    require.ensure([], (require) => {
      /*  These modules are lazily evaluated using require hook, and
          will not loaded until the router invokes this callback. */
      const login = require('./containers/LoginContainer').default
      const reducer = require('./modules/LoginReducer').default

      store.injectReducer(store, { key: 'login', reducer })

      next(null, login)
    })
  }
})
