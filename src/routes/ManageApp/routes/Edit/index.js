/**
 * index.js
 * @date Created on 2016/5/5
 * @author ShenXing(慎行)<shenxing@suneee.com>
 *
 */
export default (store) => ({
  breadcrumbName: "应用编辑",
  path: 'edit(/:id)',

  getComponents(nextState, next) {
    require.ensure([], (require) => {
      //const Edit = require('./Edit/containers/Edit').default
      //const reducer = require('./Edit/modules/edit').default
      store.injectReducer({ key: 'edit', reducer })
      next(null, Edit)
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
