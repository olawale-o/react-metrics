import { fetchSymbols, symbolDetail } from '../../utils/utils';

export const LOADING = 'stock/stocks/LOADING';
export const ERROR = 'stock/stocks/ERROR';
export const LOAD_SYMBOLS = 'stock/stocks/LOADSTOCKS';
export const LOAD_SYMBOL = 'stock/stocks/LOADSTOCK';

export const loading = () => ({
  type: LOADING,
});

export const setError = (payload) => ({
  type: ERROR,
  payload,
});

export const loadSymbols = (payload) => ({
  type: LOAD_SYMBOLS,
  payload,
});

export const loadSymbol = (payload) => ({
  type: LOAD_SYMBOL,
  payload,
});

const symobolsReducer = (previous, { exchangeShortName, volume, exchange }) => {
  let { total } = previous;
  const { items, exchanges } = previous;
  total += volume;
  if (exchangeShortName in exchanges) {
    exchanges[exchangeShortName].value.volume += volume;
  } else {
    exchanges[exchangeShortName] = { value: { volume, exchange } };
    items.push({ id: exchangeShortName, value: exchanges[exchangeShortName].value });
  }
  return {
    total,
    items,
    exchanges,
  };
};

const singleSymbolReducer = (previous, { symbol, volume }) => {
  let { total } = previous;
  const { items, symbols } = previous;
  total += volume;
  if (symbol in symbols) {
    symbols[symbol] += volume;
  } else {
    symbols[symbol] = volume;
    items.push({ id: symbol, value: symbols[symbol] });
  }

  return {
    total,
    items,
    symbols,
  };
};

export const getSymbols = () => (
  async function getSymbols(dispatch) {
    try {
      dispatch(loading());
      const allSymbols = await fetchSymbols();
      const { total, items } = allSymbols.reduce(symobolsReducer,
        { total: 0, items: [], exchanges: {} });
      const overall = {
        total,
        items,
      };
      dispatch(loadSymbols(overall));
    } catch (e) {
      if (e instanceof Error) {
        dispatch(setError('Failed fetching symbols'));
      } else {
        dispatch(setError('Unknown error'));
      }
    }
  }
);

export const getSymbol = (symbol, limit) => (
  async function getSymbol(dispatch) {
    try {
      dispatch(loading());
      const allSymbols = await symbolDetail(symbol, limit);
      const { total, items } = allSymbols.reduce(singleSymbolReducer,
        { total: 0, items: [], symbols: {} });
      const overall = {
        total,
        items,
      };
      dispatch(loadSymbol(overall));
    } catch (e) {
      if (e instanceof Error) {
        dispatch(setError('Failed fetching symbol details'));
      } else {
        dispatch(setError('Unknown error'));
      }
    }
  }
);

const initialState = {
  items: [],
  total: 0,
  selected: null,
  loading: false,
  error: null,
};

const symbolsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_SYMBOLS: {
      return {
        ...state,
        total: action.payload.total,
        items: action.payload.items,
        loading: false,
        error: null,
      };
    }
    case LOAD_SYMBOL:
      return {
        ...state,
        selected: action.payload,
        loading: false,
        error: null,
      };
    case LOADING:
      return { ...state, loading: true };
    case ERROR:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default symbolsReducer;
