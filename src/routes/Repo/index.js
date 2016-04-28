 export default (store) => ({
  breadcrumbName: "Repository",
  path: 'repo',
  getComponent(nextState, next) {
    require.ensure([], (require) => {
      /*  These modules are lazily evaluated using require hook, and
          will not loaded until the router invokes this callback. */
      const Repo = require('./containers/RepoContainer').default
      const reducer = require('./modules/repo').default

      store.injectReducer({ key: 'repo', reducer })

      next(null, Repo)
    })
  }
})
