import { injectReducer } from '../../store/reducers'

export default (store) => ({
  breadcrumbName: "Repository",
  path: 'repo',
  getComponent(nextState, next) {
    require.ensure([
      './containers/RepoContainer',
      './modules/repo'
    ], (require) => {
      /*  These modules are lazily evaluated using require hook, and
          will not loaded until the router invokes this callback. */
      const Repo = require('./containers/RepoContainer').default
      const reducer = require('./modules/repo').default

      injectReducer(store, { key: 'repo', reducer })

      next(null, Repo)
    })
  }
})
