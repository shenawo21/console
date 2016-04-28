 export default (store) => ({
  breadcrumbName: "<%= pascalEntityName %>",
  path: '<%= camelEntityName %>',
  getComponent(nextState, next) {
    require.ensure([], (require) => {
      /*  These modules are lazily evaluated using require hook, and
          will not loaded until the router invokes this callback. */
      const <%= camelEntityName %> = require('./containers/<%= pascalEntityName %>Container').default
      const reducer = require('./modules/<%= pascalEntityName %>Reducer').default

      store.injectReducer({ key: '<%= camelEntityName %>', reducer })

      next(null, <%= camelEntityName %>)
    })
  }
})
