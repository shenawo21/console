export default (store) => ({
  breadcrumbName: "修改密码",
  path: 'updpwd(/:level)',
  getComponents(nextState, next) {
    require.ensure([], (require) => {
      /*  These modules are lazily evaluated using require hook, and
          will not loaded until the router invokes this callback. */
      const UpdPwd = require('./containers/UpdPwd').default
      const reducer = require('./modules/UpdPwdReducer').default
      store.injectReducer({ key: 'edit', reducer })
      
      next(null, UpdPwd)
    })
  }
})