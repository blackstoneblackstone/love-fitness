import {combineReducers} from 'redux'
import locationReducer from './location'
import userInfoReducer from './userinfo'

export const makeRootReducer = (asyncReducers) => {
    return combineReducers({
        location: locationReducer,
        userInfo: userInfoReducer,
        ...asyncReducers
    })
}

export const injectReducer = (store, {key, reducer}) => {
    store.asyncReducers[key] = reducer
    store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
