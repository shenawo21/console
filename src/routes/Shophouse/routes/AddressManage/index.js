export default (store) => ({
    breadcrumbName:'退货地址管理',
    path:'address',
    getComponents(nextState,next){
        require.ensure([],(require) => {
            const container = require('./containers/AddressManage').default
            const reducer = require('./modules/addressmanage').default
            store.injectReducer({key:'addressmanage',reducer})
            next(null,container)
        })
    }
})