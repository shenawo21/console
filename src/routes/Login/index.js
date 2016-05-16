 export default (store) => ({
  breadcrumbName: "Login",
  path: 'login',
  getComponent(nextState, next) {
    require.ensure([], (require) => {
      /*  These modules are lazily evaluated using require hook, and
          will not loaded until the router invokes this callback. */

      next(null, require('./containers/Login').default)
    })
  }
})
