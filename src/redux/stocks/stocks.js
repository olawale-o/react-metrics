import { fetchSymbols, symbolDetail } from '../../utils/utils';

export const LOADING = 'stock/stocks/LOADING';
export const LOAD_SYMBOLS = 'stock/stocks/LOADSTOCKS';
export const LOAD_SYMBOL = 'stock/stocks/LOADSTOCK';

export const loading = (payload) => ({
  type: LOADING,
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
    dispatch(loading(true));
    const allSymbols = await fetchSymbols();
    const { total, items } = allSymbols.reduce(symobolsReducer,
      { total: 0, items: [], exchanges: {} });
    const overall = {
      total,
      items,
    };
    dispatch(loadSymbols(overall));
  }
);

export const getSymbol = (symbol) => (
  async function getSymbol(dispatch) {
    dispatch(loading(true));
    const allSymbols = await symbolDetail(symbol);
    const { total, items } = allSymbols.reduce(singleSymbolReducer,
      { total: 0, items: [], symbols: {} });
    const overall = {
      total,
      items,
    };
    dispatch(loadSymbol(overall));
  }
);

const initialState = {
  items: [],
  total: 0,
  selected: null,
  loading: false,
};

const symbolsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_SYMBOLS: {
      return {
        ...state, total: action.payload.total, items: action.payload.items, loading: false,
      };
    }
    case LOAD_SYMBOL:
      return { ...state, selected: action.payload, loading: false };
    case LOADING:
      return { ...state, loading: true };
    default:
      return state;
  }
};

export default symbolsReducer;
