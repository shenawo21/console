export default (store) => ({
  breadcrumbName: "商品规格值管理",
  path: 'specificationMgt',
  getComponents(nextState, next) {
    require.ensure([], (require) => {
      /*  These modules are lazily evaluated using require hook, and
          will not loaded until the router invokes this callback. */
      const specificationMgt = require('./containers/SpecificationMgt').default
      const reducer = require('./modules/SpecificationMgtReducer').default
      store.injectReducer({ key: 'specificationMgt', reducer })
      
      next(null, specificationMgt)
    })
  }
})