 export default (store) => ({
  getComponent(nextState, next) {
    require.ensure([], (require) => {
      const home = require('./containers/Home').default
      const reducer = require('./modules/HomeReducer').default
      store.injectReducer({ key: 'home', reducer })
      next(null, home)
    })
  }
})
