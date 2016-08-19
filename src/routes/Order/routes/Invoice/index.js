 export default (store) => ({
  breadcrumbName: "打单发货",
  path: 'invoice',
  getComponent(nextState, next) {
    require.ensure([], (require) => {
      const invoice = require('./containers/Invoice').default
      const reducer = require('./modules/InvoiceReducer').default
      store.injectReducer({ key: 'invoice', reducer })
      next(null, invoice)
    })
  }
})
