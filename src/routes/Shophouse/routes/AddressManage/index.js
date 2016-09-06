export default (store) => ({
    breadcrumbName:'退货地址管理',
    path:'address',
    getChildRoutes(location, next) {
        require.ensure([], (require) => {
            next(null, [
                require('./routes/add').default(store),
                require('./routes/edit').default(store)
            ])
        })
    },
    getComponents(nextState,next){
        require.ensure([],(require) => {
            const container = require('./containers/AddressManage').default
            const reducer = require('./modules/addressmanage').default
            store.injectReducer({key:'addressmanage',reducer})
            next(null,container)
        })
    }
})