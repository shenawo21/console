import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import authReducer from './auth';

export const reducers = (asyncReducers) => {
  return combineReducers({
    // Add sync reducers here
    router,
    auth: authReducer,
    ...asyncReducers })
}
/**
 * 异步添加reducer
 * @param  {Object} store
 * @param  {string} {key
 * @param  {Function} reducer}
 */
export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer
  store.replaceReducer(reducers(store.asyncReducers))
}

export default reducers
