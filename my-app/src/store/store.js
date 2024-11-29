import {createStore, applyMiddleware, compose} from 'redux'
import rooReducer from '../reducer/index'
import {thunk} from 'redux-thunk'

const composeEnhancer = compose(applyMiddleware(thunk))

const store = createStore(rooReducer, composeEnhancer)

export default store;