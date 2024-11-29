import {combineReducers} from 'redux'
import ProductReducer from './productReducer'

const rooReducer = combineReducers({
    products: ProductReducer
}) 
export default rooReducer