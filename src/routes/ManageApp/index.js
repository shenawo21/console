/**
 * index.js
 * @date Created on 2016/5/5
 * @author ShenXing(慎行)<shenxing@suneee.com>
 *
 */
export default (store) => ({
  breadcrumbName: "应用管理",
  path: 'manage',

  getComponents(nextState, next) {
    require.ensure([], (require) => {
      const Manage = require('./containers/Manage').default;
      const reducer = require('./modules/manage').default;
      store.injectReducer({ key: 'manage', reducer });
      next(null, Manage)
    })
  },
  getChildRoutes(location, next) {
    require.ensure([], (require) => {
      next(null, [
        require('./routes/Edit').default(store),
        require('./routes/Add').default(store)
      ])
    })
  }
})
