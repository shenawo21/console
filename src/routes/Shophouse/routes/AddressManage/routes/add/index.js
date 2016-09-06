export default (store) => ({
    breadcrumbName:'添加地址',
    path:'add',
    getComponents(nextState,next){
        require.ensure([],(require) => {
            const container = require('./containers/AddressAdd').default
            const reducer = require('./modules/addressadd').default
            store.injectReducer({key:'addressAdd',reducer})
            next(null,container)
        })
    }
})