export default (store) => {
  console.log(store);
  return {
    breadcrumbName: "新增商品",
    path: 'createProduct',
    getComponent(nextState, next) {
      require.ensure([], (require) => {
        /*  These modules are lazily evaluated using require hook, and
            will not loaded until the router invokes this callback. */
        const createProduct = require('./containers/CreateProduct').default
        const reducer = require('./modules/CreateProductReducer').default

        store.injectReducer({ key: 'createProduct', reducer })

        next(null, createProduct)
      })
    }
  }
}