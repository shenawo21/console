 export default (store) => ({
  breadcrumbName: "新建订单",
  path: 'add',
  getComponent(nextState, next) {
    require.ensure([], (require) => {4
      const add = require('./containers/Add').default
      const reducer = require('./modules/AddReducer').default
      store.injectReducer({ key: 'add', reducer })
      next(null, add)
    })
  }
})
