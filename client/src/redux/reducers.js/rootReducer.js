import { combineReducers } from 'redux';
import authReducer from './auth'
import profileReducer from './profile'
import productReducer from './product'
import cartReducer from './cart'
import alertReducer from './alert'

export default combineReducers({
auth:     authReducer,
company:  profileReducer,
produit:  productReducer,
cart: cartReducer ,
alert: alertReducer
});