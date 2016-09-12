 export default (store) => ({
  breadcrumbName: "售后处理",
  path: 'aftersale',
  getComponent(nextState, next) {
    require.ensure([], (require) => {
      /*  These modules are lazily evaluated using require hook, and
          will not loaded until the router invokes this callback. */
      const afterSale = require('./containers/AfterSale').default
      const reducer = require('./modules/AfterSaleReducer').default

      store.injectReducer({ key: 'aftersale', reducer })

      next(null, afterSale)
    })
  },
  getChildRoutes(location, next) {
      require.ensure([], (require) => {
        next(null, [
          // Provide store for async reducers and middleware
          require('./routes/Info').default(store),                      //退款退货详情/处理
          require('./routes/GoodsInfo').default(store),                 //退货处理路由
          require('./routes/EndReturnGoods').default(store),            //结束退货财务处理
          require('./routes/ChangeGoods').default(store),               //换货登记处理
          require('./routes/ChangeList').default(store),                // 查询跳转换货列表
          require('./routes/ChangeDetail').default(store),              // 换货处理详情/结束换货
        ])
      })
  }
})