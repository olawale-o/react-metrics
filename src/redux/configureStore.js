import { createStore, combineReducers } from 'redux';
import stocksReducer from './stocks/stocks';
import composedEnhancers from './enhancers';

const reducer = combineReducers({ stocks: stocksReducer });
const configureStore = createStore(reducer, composedEnhancers);

export default configureStore;
