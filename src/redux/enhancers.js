import { applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleWare from 'redux-thunk';
import logger from 'redux-logger';

const middlewares = [thunkMiddleWare, logger];
const middlewareEnhancers = applyMiddleware(...middlewares);
const composedEnhancers = composeWithDevTools(middlewareEnhancers);

export default composedEnhancers;
