import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import stocksSelector from '../redux/stocks/stocksSelector';
import SingleCard from './Card';
import Header from './Header';
import stock from '../assets/stock.png';
import { parseNumber, orderBy } from '../helper/helper';
import LoadingIndicator from './LoadingIndicator';
import { getSymbols } from '../redux/stocks/stocks';

const sortButtons = [
  { key: 'all', text: 'Sort by' },
  { key: 'id', order: 'asc', text: 'A - Z' },
  { key: 'id', order: 'desc', text: 'Z - A' },
  { key: 'volume', order: 'asc', text: 'Volume - Lowest' },
  { key: 'volume', order: 'desc', text: 'Volume - Highest' },
];

const Main = () => {
  const dispatch = useDispatch();
  const [filterBy, setFilterBy] = useState({
    marketName: '',
    filterBtnText: 'Sort by',
  });
  const [currentFilter, setCurrentFilter] = useState({});
  const { items, total, loading } = useSelector(stocksSelector);
  const [markets, setMarkets] = useState(items);
  const [dropDown, setDropDown] = useState(false);
  useEffect(() => {
    setMarkets(items);
  }, [items]);

  const companies = markets.map((stock) => (
    <SingleCard key={stock.id} company={stock} />
  ));

  const onMarketChange = (e) => {
    setFilterBy((prevState) => ({ ...prevState, marketName: e.target.value.toUpperCase() }));
    const matchedMarkets = items.filter((item) => item.id.startsWith(e.target.value.toUpperCase()));
    const matchedOrderedMarkets = orderBy(matchedMarkets, currentFilter);
    setMarkets(matchedOrderedMarkets);
  };

  const sortBy = (options) => {
    if (options.key === 'all') {
      dispatch(getSymbols());
    } else {
      const newMarkets = orderBy(markets, options);
      setMarkets(newMarkets);
    }
    setFilterBy((prevState) => ({ ...prevState, filterBtnText: options.text }));
    setDropDown(!dropDown);
    setCurrentFilter(options);
  };

  return (
    <div className="Main">
      <Header title="Shares Volume" />
      {loading && <LoadingIndicator />}
      <div className="main-header">
        <div className="main-header__img">
          <img src={stock} alt="Stock Exchange" className="market-img" />
        </div>
        <div className="main-header__summary">
          <h1 className="category">Volume of Shares Traded</h1>
          <h2 className="total">{parseNumber(total)}</h2>
        </div>
      </div>
      <div className="main-content">
        <div className="filter-section">
          <h3 className="main-content__heading">VOLUME OF SHARES BY EXCHANGE</h3>
          <div className="filter-section__filter">
            <input className="input filter-section__input" value={filterBy.marketName} onChange={onMarketChange} placeholder="Search Market" />
            <div className="filter">
              <button
                type="button"
                className="filter__button"
                onClick={() => {
                  setDropDown(!dropDown);
                }}
              >
                {filterBy.filterBtnText}
              </button>
              <ul className={`filter__list menu-1 ${dropDown && 'active'}`}>
                {sortButtons.map((option) => (
                  <li
                    key={option.text}
                    className="list__item"
                  >
                    <button
                      type="button"
                      className="list__button"
                      onClick={() => sortBy(option)}
                    >
                      {option.text}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <ul className="main-content__card-list">
          {companies.length && companies}
          {!companies.length && <h3 className="no-data">No market available</h3>}
        </ul>
      </div>
    </div>
  );
};

export default Main;
