export default (store) => ({
    breadcrumbName:'编辑地址',
    path:'edit(/:id)',
    getComponents(nextState,next){
        require.ensure([],(require) => {
            const container = require('./containers/AddressEdit').default
            const reducer = require('./modules/addressEdit').default
            store.injectReducer({key:'addressEdit',reducer})
            next(null,container)
        })
    }
})