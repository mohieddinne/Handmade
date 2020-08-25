import {createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk'
import rootreducer from './reducers.js/rootReducer'
const initState = {};
const middleware = [thunk];
const store = createStore(rootreducer,initState,composeWithDevTools(
    applyMiddleware(...middleware)
));
export default store