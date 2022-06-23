import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import stocksSelector from '../redux/stocks/stocksSelector';
import SingleCard from './Card';
import Header from './Header';
import stock from '../assets/stock.png';
import { parseNumber } from '../helper/helper';
import LoadingIndicator from './LoadingIndicator';

const Main = () => {
  const [filterBy, setFilterBy] = useState({
    marketName: '',
    sortBy: 'all',
  });
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
    setMarkets(matchedMarkets);
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
                Sort by
              </button>
              <ul className={`filter__list menu-1 ${dropDown && 'active'}`}>
                <li className="list__item">
                  <button className="list__button" type="button">A - Z</button>
                </li>
                <li className="list__item">
                  <button className="list__button" type="button">Z - A</button>
                </li>
                <li className="list__item">
                  <button className="list__button" type="button">Volume</button>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <ul className="main-content__card-list">
          {companies}
        </ul>
      </div>
    </div>
  );
};

export default Main;
