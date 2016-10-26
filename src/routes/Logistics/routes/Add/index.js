
export default (store) => ({
  breadcrumbName: "选择物流公司",
  path: 'add',
  getComponent(nextState, next) {
    require.ensure([], (require) => {
      const permis = require('./containers/Add').default
      const reducer = require('./modules/AddReducer').default

      store.injectReducer({ key: 'addLogistics', reducer })

      next(null, permis)
    })
  }
})