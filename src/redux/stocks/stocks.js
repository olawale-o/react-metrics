import { fetchSymbols } from '../../utils/utils';

// export const LOADING = 'stock/stocks/LOADING';
export const LOAD_SYMBOLS = 'stock/stocks/LOADSTOCKS';
export const LOAD_SYMBOL = 'stock/stocks/LOADSTOCK';

// export const loading = (payload) => ({
//   type: LOADING,
//   payload,
// });

export const loadSymbols = (payload) => ({
  type: LOAD_SYMBOLS,
  payload,
});

export const loadSymbol = (payload) => ({
  type: LOAD_SYMBOL,
  payload,
});

export const getSymbols = () => (
  async function getSymbols(dispatch) {
    let total = 0;
    const exchangesObj = {};
    const overall = {
      total: 0,
      items: [],
    };
    const allSymbols = await fetchSymbols();

    allSymbols.forEach(({ exchangeShortName, volume, exchange }) => {
      total += volume;
      if (exchangeShortName in exchangesObj) {
        exchangesObj[exchangeShortName].volume += volume;
      } else {
        exchangesObj[exchangeShortName] = { volume, exchange };
      }
    });

    const items = Object.entries(exchangesObj).map(([key, value]) => (
      {
        id: key,
        value,
      }
    ));
    Object.assign(overall, { total, items });
    dispatch(loadSymbols(overall));
  }
);

const initialState = {
  items: [],
  total: 0,
  selected: null,
};

const symbolsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_SYMBOLS:
      return action.payload;
    case LOAD_SYMBOL:
      return { ...state, selected: action.payload };
    default:
      return state;
  }
};

export default symbolsReducer;
