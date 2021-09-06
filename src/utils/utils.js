import get from '../api/api';

const BASE_URI = 'https://financialmodelingprep.com/api/v3/stock-screener?marketCapLowerThan=10000000000000&betaMoreThan=1&volumeMoreThan=100&exchange=';
// const KEY = '76109e81ecec8a4c42637f7a2cead33e';
const KEY = '86e046e6317a741b370a9714c6c095ca';

export const fetchSymbols = async () => {
  const EXCHANGES = ['NYSE', 'NASDAQ', 'AMEX', 'TSX', 'MUTUAL_FUND', 'EURONEXT'].join(',');
  const ENDPOINT = `${EXCHANGES}&apikey=${KEY}`;
  const URI = `${BASE_URI}${ENDPOINT}`;
  const response = await get(URI);
  return response.json();
};

export const symbolDetail = async (symbol) => {
  const ENDPOINT = `${symbol}&apikey=${KEY}`;
  const URI = `${BASE_URI}${ENDPOINT}`;
  const response = await get(URI);
  return response.json();
};
