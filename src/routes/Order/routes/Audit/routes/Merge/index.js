 export default (store) => ({
  breadcrumbName: "Merge",
  path: 'merge/:id',
  getComponent(nextState, next) {
    require.ensure([], (require) => {
      const merge = require('./containers/Merge').default
      const reducer = require('./modules/MergeReducer').default

      store.injectReducer({ key: 'merge', reducer })

      next(null, merge)
    })
  }
})
