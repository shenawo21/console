/**
 * index.js
 * @date Created on 2016/5/6
 * @author ShenXing(慎行)<shenxing@suneee.com>
 *
 */
export default (store) => ({
  breadcrumbName: "启动画面",
  path: 'start',

  getComponents(nextState, next) {
    require.ensure([], (require) => {
      const Start = require('./containers/Start').default
      //const reducer = require('./modules/edit').default
      //store.injectReducer({ key: 'edit', reducer })
      next(null, Start)
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
