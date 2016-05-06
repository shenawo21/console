/**
 * index.js
 * @date Created on 2016/5/6
 * @author ShenXing(慎行)<shenxing@suneee.com>
 *
 */
export default (store) => ({
  breadcrumbName: "选择模板",
  path: 'choose',

  getComponents(nextState, next) {
    require.ensure([], (require) => {
      const Choose = require('./containers/Choose').default
      //const reducer = require('./modules/edit').default
      //store.injectReducer({ key: 'edit', reducer })
      next(null, Choose)
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
