export default (store, location) => ({
  breadcrumbName: location.pathname.split('edit/')[1] ? "编辑店铺" : "创建店铺",
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
