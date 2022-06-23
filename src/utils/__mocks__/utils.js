export const fetchSymbols = async () => Promise.resolve(
  [
    { exchangeShortName: 'NYSE', volume: 23, exchange: 'New York Stock Exchange Arca' },
    { exchangeShortName: 'TSX', volume: 25, exchange: 'Toronto Exchange' },
    { exchangeShortName: 'AMEX', volume: 12, exchange: 'Toronto Exchange' },
    { exchangeShortName: 'NASDAQ', volume: 100, exchange: 'Toronto Exchange' },
    { exchangeShortName: 'EURONEX', volume: 90, exchange: 'Toronto Exchange' },
  ],
);

export const symbolDetail = async () => Promise.resolve(
  [
    { symbol: 'VIT', volume: 10 },
    { symbol: 'JPM', volume: 13 },
  ],
);
