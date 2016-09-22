 export default (store) => ({
  breadcrumbName: "订单详情",
  path: 'goodsdetail/:id',
  getComponent(nextState, next) {
    require.ensure([], (require) => {
      const detail = require('../../../../../Order/routes/Audit/routes/Detail/containers/Detail').default
      const reducer = require('../../../../../Order/routes/Audit/routes/Detail/modules/DetailReducer').default
      store.injectReducer({ key: 'detail', reducer })
      next(null, detail)
    })
  }
})
