 export default (store) => ({
  breadcrumbName: "PubPassword",
  path: 'pubPassword/:id/:type',
  getComponent(nextState, next) {
    require.ensure([], (require) => {
      const pubPassword = require('./containers/PubPassword').default
      const reducer = require('./modules/PubPasswordReducer').default

      store.injectReducer({ key: 'pubPassword', reducer })

      next(null, pubPassword)
    })
  }
})
