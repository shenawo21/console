import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import authReducer from './auth';

const reducers = (asyncReducers) => {
  return combineReducers({
    // Add sync reducers here
      router,
      auth: authReducer,
      ...asyncReducers 
  })
}


export const rootReducer = (state, action) => {
    
  // if (action.type === 'auth/LOGOUT_SUCCESS') {
  //     state = undefined
  // }
  // if(action.type === 'auth/TIMEOUT_SESSION'){
  //     state = {
  //        logoutResult : true,
  //     }
  // }
  
  return reducers()(state, action)
}


/**
 *
 * 异步添加reducer
 *
 * @param  {Object} store
 * @param  {Object} key,reducer
 *
 */
export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer
  store.replaceReducer(reducers(store.asyncReducers))
}

export default rootReducer
