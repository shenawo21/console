/**
 * index.js
 * @date Created on 2016/5/5
 * @author ShenXing(慎行)<shenxing@suneee.com>
 *
 */
export default (store) => ({
  breadcrumbName: "应用编辑",
  path: 'edit',

  getComponents(nextState, next) {
    require.ensure([], (require) => {
      const Edit = require('./containers/Edit').default
      //const reducer = require('./modules/edit').default
      //store.injectReducer({ key: 'edit', reducer })
      next(null, Edit)
    })
  },
  getChildRoutes(location, next) {
    require.ensure([], (require) => {
      next(null, [
        require('./routes/StepChoose').default(store),
        require('./routes/StepBasic').default(store),
        require('./routes/StepStart').default(store),
        require('./routes/StepFunc').default(store),
        require('./routes/StepGenerate').default(store)
      ])
    })
  }
})
