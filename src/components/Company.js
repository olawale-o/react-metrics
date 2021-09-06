import PropType from 'prop-types';
import parseNumber from '../helper/helper';

const Company = ({ company }) => {
  const { id, value } = company;
  return (
    <li className="company__card">
      <div className="company__card-div">
        <h5 className="symbol">{id}</h5>
        <div className="price">
          <span className="value">{parseNumber(value)}</span>
          <i className="bx bx-right-arrow-circle" />
        </div>
      </div>
    </li>
  );
};

export default Company;

Company.propTypes = {
  company: PropType.shape({
    id: PropType.string.isRequired,
    value: PropType.number.isRequired,
  }).isRequired,
};
