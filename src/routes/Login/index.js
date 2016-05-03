 export default (store) => ({
  breadcrumbName: "Login",
  path: 'login',
  getComponent(nextState, next) {
    require.ensure([], (require) => {
      /*  These modules are lazily evaluated using require hook, and
          will not loaded until the router invokes this callback. */
      const Login = require('./containers/Login').default
      const reducer = require('./modules/login').default

      store.injectReducer({ key: 'login', reducer })

      next(null, Login)
    })
  }
})
