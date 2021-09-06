export const fetchSymbols = async () => Promise.resolve(
  [
    { exchangeShortName: 'NYSE', volume: 23, exchange: 'New York Stock Exchange Arca' },
    { exchangeShortName: 'TSX', volume: 25, exchange: 'Toronto' },
  ],
);

export const symbolDetail = async () => Promise.resolve(
  [
    { symbol: 'VIT', volume: 10 },
    { symbol: 'JPM', volume: 13 },
  ],
);
