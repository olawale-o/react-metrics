import { fetchSymbols } from '../../utils/utils';

export const LOAD_SYMBOLS = 'stock/stocks/LOADSTOCKS';

export const loadSymbols = (payload) => ({
  type: LOAD_SYMBOLS,
  payload,
});

export const getSymbols = () => (
  async function getSymbols(dispatch) {
    const allSymbols = await fetchSymbols();
    dispatch(loadSymbols(allSymbols));
  }
);

const symbolsReducer = (state = [], action = {}) => {
  switch (action.type) {
    case LOAD_SYMBOLS:
      return state.concat(action.payload);
    default:
      return state;
  }
};

export default symbolsReducer;
