/**
 * index.js
 * @date Created on 2016/5/6
 * @author ShenXing(慎行)<shenxing@suneee.com>
 *
 */
export default (store) => ({
  breadcrumbName: "基本信息",
  path: 'basic',

  getComponents(nextState, next) {
    require.ensure([], (require) => {
      const Basic = require('./containers/Basic').default
      //const reducer = require('./modules/edit').default
      //store.injectReducer({ key: 'edit', reducer })
      next(null, Basic)
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
