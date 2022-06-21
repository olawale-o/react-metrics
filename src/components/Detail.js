import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSymbol } from '../redux/stocks/stocks';
import stocksSelector from '../redux/stocks/stocksSelector';
import Header from './Header';
import Company from './Company';
import coin from '../assets/coin.svg';
import { parseNumber } from '../helper/helper';
import LoadingIndicator from './LoadingIndicator';

const Detail = () => {
  const goBack = true;
  const showYear = false;
  const { selected, loading, error } = useSelector(stocksSelector);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [limit, setLimit] = useState(5);
  const loader = useRef();

  const loadMore = () => {
    setLimit((prevLimit) => prevLimit + 5);
  };

  const handleObserver = (entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      loadMore();
    }
  };
  useEffect(() => {
    dispatch(getSymbol(id, limit));
  }, [limit, id]);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '20px',
      threshold: 1,
    };
    const observer = new IntersectionObserver(handleObserver, options);
    if (loader.current) {
      observer.observe(loader.current);
    }
    return () => observer.disconnect();
  }, [loading]);

  if (loading && !selected) return (<LoadingIndicator />);

  if (error) return (<div>{error}</div>);

  if (!selected) return null;

  return (
    <div className="Detail">
      <Header title={id} navigate={goBack} showYear={showYear} />
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
          {selected.items.map((item) => <Company key={item.id} company={item} />)}
        </ul>
        <LoadingIndicator ref={loader} isSmall />
      </div>
    </div>
  );
};

export default Detail;
