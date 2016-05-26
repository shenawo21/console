 export default (store) => ({
  breadcrumbName: "权限管理",
  path: 'permis/:id',
  getComponent(nextState, next) {
    require.ensure([], (require) => {
      const permis = require('./containers/Permis').default
      const reducer = require('./modules/PermisReducer').default

      store.injectReducer({ key: 'permis', reducer })

      next(null, permis)
    })
  }
})
