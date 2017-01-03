export default (store, location) => ({
  breadcrumbName: location.pathname.split('edit/')[1] ?  "商品类目编辑" : "商品类目新增",
  path: 'edit(/:type/:id/:rate)',
  getComponent(nextState, next) {
    require.ensure([], (require) => {
      const edit = require('./containers/Edit').default
      const reducer = require('./modules/EditReducer').default

      store.injectReducer({key: 'edit', reducer})

      next(null, edit)
    })
  }
})
