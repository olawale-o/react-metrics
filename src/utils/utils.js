import get from '../api/api';

const BASE_URI = 'https://financialmodelingprep.com/api/v3';
const PARAMS = '76109e81ecec8a4c42637f7a2cead33e';

export const fetchSymbols = async () => {
  const ENDPOINT = `/stock/list?apikey=${PARAMS}`;
  const URI = `${BASE_URI}${ENDPOINT}`;
  const response = await get(URI);
  return response.json();
};

export const symbolDetail = async (symbol) => {
  const ENDPOINT = `/profile/${symbol}?apikey=${PARAMS}`;
  const URI = `${BASE_URI}${ENDPOINT}`;
  const response = await get(URI);
  return response.json();
};
