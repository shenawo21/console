 export default (store) => ({
  getComponent(nextState, next) {
    require.ensure([], (require) => {
      const choose = require('./containers/Choose').default
      const reducer = require('./modules/ChooseReducer').default
      store.injectReducer({ key: 'choose', reducer })
      next(null, choose)
    })
  }
})
