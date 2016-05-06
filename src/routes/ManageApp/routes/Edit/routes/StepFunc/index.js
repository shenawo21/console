/**
 * index.js
 * @date Created on 2016/5/6
 * @author ShenXing(慎行)<shenxing@suneee.com>
 *
 */
export default (store) => ({
  breadcrumbName: "功能设置",
  path: 'func',

  getComponents(nextState, next) {
    require.ensure([], (require) => {
      const Func = require('./containers/Func').default
      //const reducer = require('./modules/edit').default
      //store.injectReducer({ key: 'edit', reducer })
      next(null, Func)
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
