import PropType from 'prop-types';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = ({
  showYear, title, navigate,
}) => (
  <header className="header">
    <nav className="nav">
      <div className="nav__left">
        {navigate && (
          <Link to="/">
            <span><i className="bx bxs-chevron-left"> </i></span>
          </Link>
        )}
        {!navigate && <span><i className="bx bxs-chevron-left"> </i></span>}
        {showYear && <span className="year">2021</span>}
      </div>
      <h5 className="nav-brand">{title}</h5>
      <div className="settings">
        <i className="bx bx-microphone"> </i>
        <i className="bx bx-cog"> </i>
      </div>
    </nav>
  </header>
);

export default Header;

Header.defaultProps = {
  showYear: true,
  navigate: false,
};

Header.propTypes = {
  showYear: PropType.bool,
  title: PropType.string.isRequired,
  navigate: PropType.bool,
};
