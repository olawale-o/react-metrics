import React from 'react';
import PropType from 'prop-types';
import { BrowserRouter } from 'react-router-dom';
import { render as rtlRender } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleWare from 'redux-thunk';
import stocksReducers, { LOAD_SYMBOLS } from './redux/stocks/stocks';

const middlewares = [thunkMiddleWare];
const middlewareEnhancers = applyMiddleware(...middlewares);

const reducer = combineReducers({ stocks: stocksReducers });
const store = createStore(reducer, middlewareEnhancers);

const stocksCreator = (payload) => ({
  type: LOAD_SYMBOLS,
  payload,
});

const marketData = [
  { id: 'NYSE', value: { volume: 23, exchange: 'New York Stock Exchange Area' } },
  { id: 'TSX', value: { volume: 25, exchange: 'Toronto Exchange' } },
  { id: 'AMEX', value: { volume: 10, exchange: 'AMERICA EXPRESS' } },
  { id: 'NASDAQ', value: { volume: 80, exchange: 'NASDAQ Exchange' } },
  { id: 'EURONEXT', value: { volume: 90, exchange: 'Euro Exchange' } },
];

store.dispatch(stocksCreator({ total: 228, items: marketData }));

const Wrapper = ({ children }) => (
  <BrowserRouter>
    <Provider store={store}>{children}</Provider>
  </BrowserRouter>
);

Wrapper.propTypes = {
  children: PropType.node.isRequired,
};

const render = (ui, options) => rtlRender(ui, { wrapper: Wrapper, ...options });

export * from '@testing-library/react';
export { render };
