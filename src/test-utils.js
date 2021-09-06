import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render as rtlRender } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleWare from 'redux-thunk';
import stocksReducers from './redux/stocks/stocks';

const middlewares = [thunkMiddleWare];
const middlewareEnhancers = applyMiddleware(...middlewares);

const reducer = combineReducers({ stocks: stocksReducers });
const store = createStore(reducer, middlewareEnhancers);

const Wrapper = ({ children }) => (
  <BrowserRouter>
    <Provider store={store}>{children}</Provider>
  </BrowserRouter>
);
const render = (ui, options) => {
  return rtlRender(ui, { wrapper: Wrapper, ...options });
}
  
export * from '@testing-library/react';
export { render };
