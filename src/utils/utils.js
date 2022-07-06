import get from '../api/api';

const BASE_URI = 'https://financialmodelingprep.com/api/v3/stock-screener?marketCapLowerThan=10000000000000&betaMoreThan=1&volumeMoreThan=100&exchange=';
const KEY = process.env.REACT_APP_KEY;

export const fetchSymbols = async () => {
  const EXCHANGES = ['AMEX', 'TSX', 'EURONEXT', 'NYSE', 'NASDAQ'].join(',');
  const ENDPOINT = `${EXCHANGES}&apikey=${KEY}`;
  const URI = `${BASE_URI}${ENDPOINT}`;
  const response = await get(URI);
  return response.json();
};

export const symbolDetail = async (symbol, limit) => {
  const ENDPOINT = `${symbol}&limit=${limit}&apikey=${KEY}`;
  const URI = `${BASE_URI}${ENDPOINT}`;
  const response = await get(URI);
  return response.json();
};
