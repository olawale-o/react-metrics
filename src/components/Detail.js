import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSymbol } from '../redux/stocks/stocks';
import stocksSelector from '../redux/stocks/stocksSelector';
import Header from './Header';
import Company from './Company';
import coin from '../assets/coin.svg';
import parseNumber from '../helper/helper';
import LoadingIndicator from './LoadingIndicator';

const Detail = () => {
  const goBack = true;
  const { selected, loading } = useSelector(stocksSelector);
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(getSymbol(id));
  }, []);
  if (!selected) {
    return null;
  }
  const cards = selected.items.map((item) => <Company key={item.id} company={item} />);
  return (
    <div className="Detail">
      <Header title={id} navigate={goBack} />
      {loading && <LoadingIndicator />}
      <div className="main-header">
        <div className="main-header__img">
          <img src={coin} alt="Stock Exchange" className="market-img" />
        </div>
        <div className="main-header__summary">
          <h1 className="category">{id}</h1>
          <h2 className="total">{parseNumber(selected.total)}</h2>
        </div>
      </div>
      <div className="main-content">
        <h3 className="main-content__heading">VOLUME OF SHARES BREAKDOWN - 2021</h3>
        <ul className="company__card-list">
          {cards}
        </ul>
      </div>
    </div>
  );
};

export default Detail;
