export default (store) => ({
  breadcrumbName: "账号组",
  path: 'group',
  getComponent(nextState, next) {
    require.ensure([], (require) => {
      const group = require('./containers/Group').default;
      const reducer = require('./modules/GroupReducer').default;

      store.injectReducer({key: 'accountgroup', reducer})

      next(null, group)
    })
  }
})
