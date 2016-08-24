export default (store) => ({
  breadcrumbName: "店铺创建",
  path: 'edit(/:id)',
  getComponent(nextState, next) {
    require.ensure([], (require) => {
      const edit = require('./containers/Edit').default
      const reducer = require('./modules/EditReducer').default
      store.injectReducer({key: 'edit', reducer})
      next(null, edit)
    })
  }
})
