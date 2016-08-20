/**
 * index.js
 * @date Created on 2016/8/19
 * @author ShenXing(慎行)<shenxing@suneee.com>
 *
 */
export default (store) => ({
  breadcrumbName: "订单管理",
  path: 'order',
  getChildRoutes(location, next) {
    require.ensure([], (require) => {
      next(null, [
        require('./routes/Synch').default(store),
        require('./routes/Audit').default(store),
        require('./routes/Invoice').default(store),
        require('./routes/History').default(store)
      ])
    })
  }
})
