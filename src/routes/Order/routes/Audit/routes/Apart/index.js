 export default (store) => ({
  breadcrumbName: "拆单",
  path: 'apart/:id',
  getComponent(nextState, next) {
    require.ensure([], (require) => {
      const apart = require('./containers/Apart').default
      const reducer = require('./modules/ApartReducer').default
      store.injectReducer({ key: 'apart', reducer })
      next(null, apart)
    })
  }
})
