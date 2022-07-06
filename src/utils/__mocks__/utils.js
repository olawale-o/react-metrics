export const fetchSymbols = async () => Promise.resolve(
  [
    { id: 'NYSE', value: { volume: 23, exchange: 'New York Stock Exchange Area' } },
    { id: 'TSX', value: { volume: 25, exchange: 'Toronto Exchange' } },
    { id: 'AMEX', value: { volume: 10, exchange: 'AMERICA EXPRESS' } },
    { id: 'NASDAQ', value: { volume: 100, exchange: 'NASDAQ Exchange' } },
    { id: 'EURONEXT', value: { volume: 90, exchange: 'Euro Exchange' } },
  ],
);

export const symbolDetail = async () => Promise.resolve(
  [
    { symbol: 'VIT', volume: 10 },
    { symbol: 'JPM', volume: 13 },
  ],
);
