/**
 * index.js
 * @date Created on 2016/5/5
 * @author ShenXing(慎行)<shenxing@suneee.com>
 *
 */
export default (store) => ({
  breadcrumbName: "我的应用列表",
  path: 'trashlist',

  getComponents(nextState, next) {
    require.ensure([], (require) => {
      const TrashList = require('./containers/TrashList').default;
      //const reducer = require('./TrashList/modules/list').default;
      //store.injectReducer({ key: 'list', reducer });
      next(null, TrashList)
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
