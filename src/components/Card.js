import { Link } from 'react-router-dom';
import PropType from 'prop-types';
import coin from '../assets/coin.svg';
import { parseNumber, parseText } from '../helper/helper';
import './Card.css';

const SingleCard = ({ company }) => {
  const { id, value } = company;
  return (
    <li className="grid-card">
      <Link to={`/${id}`}>
        <div className="grid-card-div">
          <i className="bx bx-right-arrow-circle nav-icon arrow-icon" />
          <div className="grid-card-img">
            <img src={coin} alt="Market" className="coin-img" />
          </div>
          <div className="grid-card-details">
            <h1 className="symbol">{parseText(id)}</h1>
            <h2 className="price">{parseNumber(value.volume)}</h2>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default SingleCard;

SingleCard.propTypes = {
  company: PropType.shape({
    id: PropType.string.isRequired,
    value: PropType.shape({
      volume: PropType.number.isRequired,
      exchange: PropType.string.isRequired,
    }).isRequired,
  }).isRequired,
};
