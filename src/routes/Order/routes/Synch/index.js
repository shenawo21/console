 export default (store) => ({
  breadcrumbName: "同步订单",
  path: 'synch',
  getComponent(nextState, next) {
    require.ensure([], (require) => {
      const synch = require('./containers/Synch').default
      const reducer = require('./modules/SynchReducer').default
      store.injectReducer({ key: 'synch', reducer })
      next(null, synch)
    })
  },
   getChildRoutes(location, next) {
     require.ensure([], (require) => {
       next(null, [
         require('./routes/Manual').default(store)
       ])
     })
   }
})
