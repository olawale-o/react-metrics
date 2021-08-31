export const LOAD_SYMBOLS = 'stock/stocks/LOADSTOCKS';

export const loadSymbols = (payload) => ({
  type: LOAD_SYMBOLS,
  payload,
});
