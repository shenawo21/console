/**
 * index.js
 * @date Created on 2016/5/5
 * @author ShenXing(慎行)<shenxing@suneee.com>
 *
 */
export default (store) => ({
  breadcrumbName: "应用创建",
  path: 'add(/:id)',

  getComponents(nextState, next) {
    require.ensure([], (require) => {
      const Add = require('./Add/containers/Add').default;
      const reducer = require('./Add/modules/add').default;
      store.injectReducer({ key: 'add', reducer });
      next(null, Add)
    })
  },
  getChildRoutes(location, next) {
    require.ensure([], (require) => {
      next(null, [
        //require('./routes/Edit').default(store)
      ])
    })
  }
})
