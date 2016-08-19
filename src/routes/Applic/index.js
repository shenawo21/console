 export default (store) => ({
  breadcrumbName: "应用管理",
  path: 'applic',
  getComponent(nextState, next) {
    require.ensure([], (require) => {
      const applic = require('./containers/Applic').default
      const reducer = require('./modules/ApplicReducer').default
      store.injectReducer({ key: 'applic', reducer })
      next(null, applic)
    })
  }
})
