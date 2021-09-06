import stocksReducer , { loadSymbols, loadSymbol, loading } from '../redux/stocks/stocks';

describe('Reducer', () => {
  test('Should return intialState', () => {
    const initialState = {
      items: [],
      total: 0,
      selected: null,
      loading: false,
    }
    const newState = stocksReducer(undefined, {});

    expect(newState).toEqual(initialState);
  });

  test('Should handle loading state', () => {
    const nextState = {
      items: [],
      total: 0,
      selected: null,
      loading: true,
    };
    const newState = stocksReducer(undefined, loading(true));
    expect(newState).toEqual(nextState);
  });

  test('Should add symbols', () => {
    const prevState = {
      items: [],
      total: 0,
      selected: null,
      loading: false,
    };

    const symbols = [
      { id: 'NYSE', value: { volume: 23, exchange: 'New York Stock Exchange Arca' } },
      { id: 'TSX', value: { volume: 25, exchange: 'Toronto' } },
    ];
    const payload = {
      items: symbols,
      total: 48,
    }
    const nextState = {
      items: symbols,
      total: 48,
      selected: null,
      loading: false,
    };
    const newState = stocksReducer(prevState, loadSymbols(payload));
    expect(newState).toEqual(nextState);
  });

  test('Should add sub symbols when a symbol is selected', () => {
    const fetchedDetailedSymbols = [
      { id: 'VIT', value: 10 },
      { id: 'JPM', value: 13 },
    ];

    const symbols = [
      { id: 'NYSE', value: { volume: 23, exchange: 'New York Stock Exchange Arca' } },
      { id: 'TSX', value: { volume: 25, exchange: 'Toronto' } },
    ];

    const selected = {
      items: fetchedDetailedSymbols,
      total: 23,
    };

    const prevState = {
      items: symbols,
      total: 48,
      selected: null,
      loading: false,
    };

    const payload = {
      items: fetchedDetailedSymbols,
      total: 23,
    };

    const nextState = {
      items: symbols,
      total: 48,
      selected,
      loading: false,
    };
    const newState = stocksReducer(prevState, loadSymbol(payload));
    expect(newState).toEqual(nextState);
  });

});