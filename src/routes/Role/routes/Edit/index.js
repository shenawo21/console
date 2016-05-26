export default (store) => ({
  breadcrumbName: "角色编辑",
  path: 'edit(/:id)',
  getComponent(nextState, next) {
    require.ensure([], (require) => {
      const edit = require('./containers/Edit').default
      const reducer = require('./modules/EditReducer').default
      store.injectReducer({ key: 'edit', reducer })
      next(null, edit)
    })
  }
})
