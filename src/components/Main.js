import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getSymbols } from '../redux/stocks/stocks';
import stocksSelector from '../redux/stocks/stocksSelector';
import SingleCard from './Card';
import Header from './Header';
import stock from '../assets/stock.png';
import parseNumber from '../helper/helper';

const Main = () => {
  const dispatch = useDispatch();
  const { items, total } = useSelector(stocksSelector);
  useEffect(() => {
    if (items.length < 1) {
      dispatch(getSymbols());
    }
  }, []);

  const companies = items.map((stock) => (
    <SingleCard key={stock.id} company={stock} />
  ));

  return (
    <div className="Main">
      <Header title="Shares Volume" />
      <div className="main-header">
        <div className="main-header__img">
          <img src={stock} alt="Stock Exchange" className="market-img" />
        </div>
        <div className="main-header__summary">
          <h1 className="category">Volume of Shares</h1>
          <h2 className="total">{parseNumber(total)}</h2>
        </div>
      </div>
      <div className="main-content">
        <h3 className="main-content__heading">VOLUME OF SHARES BY EXCHANGE</h3>
        <ul className="main-content__card-list">
          {companies}
        </ul>
      </div>
    </div>
  );
};

export default Main;
