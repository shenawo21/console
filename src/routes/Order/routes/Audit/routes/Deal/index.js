 export default (store) => ({
  breadcrumbName: "审单处理",
  path: 'deal/:id',
  getComponent(nextState, next) {
    require.ensure([], (require) => {
      const deal = require('./containers/Deal').default
      const reducer = require('./modules/DealReducer').default
      store.injectReducer({ key: 'deal', reducer })
      next(null, deal)
    })
  }
})
