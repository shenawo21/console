 export default (store) => ({
  breadcrumbName: "店铺对接",
  path: 'joint/:id',
  getComponent(nextState, next) {
    require.ensure([], (require) => {
      const joint = require('./containers/Joint').default
      const reducer = require('./modules/JointReducer').default
      store.injectReducer({ key: 'joint', reducer })
      next(null, joint)
    })
  }
})
