// We only need to import the modules necessary for initial render
import CoreLayout from '../layouts/CoreLayout/CoreLayout'
import Home from './Home'
import {load, isAuthed} from '../store/auth'

export const createRoutes = (store) => {
  /*  Note: Instead of using JSX, we are using react-router PlainRoute,
      a simple javascript object to provide route definitions.
      When creating a new async route, pass the instantiated store!   */
  const requireLogin = (nextState, replace, cb) => {
    function checkAuth() {
      const {auth: {user}} = store.getState()
      if (!user) {
        // not logged in,so can't be there
        replace('/login')
      }
      cb();
    }

    if (!isAuthed(store.getState())) {
      store.dispatch(load()).then(checkAuth)
    } else {
      checkAuth()
    }

  }
  const routes = {
    breadcrumbName: "首页",
    path: '/',
    component: CoreLayout,
    indexRoute: Home,
    // onEnter: requireLogin,
    getChildRoutes(location, next) {
      require.ensure([], (require) => {
        next(null, [
          // Provide store for async reducers and middleware
          require('./Repo').default(store),
          require('./NotFound').default
        ])
      })
    }
  }

  return routes
}

export default createRoutes
