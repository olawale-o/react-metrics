import { createStore, combineReducers } from 'redux';
import stocksReducer from './stocks/stocks';
import composedEnhancers from './enhancers';

const reducer = combineReducers({ stcoks: stocksReducer });
const configureStore = createStore(reducer, composedEnhancers);

export default configureStore;
