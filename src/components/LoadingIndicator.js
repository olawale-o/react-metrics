import { forwardRef } from 'react';
import PropType from 'prop-types';

const LoadingIndicator = forwardRef(({ isSmall }, ref) => (
  <div className={`loading-container ${isSmall ? 'loading-container_s' : 'loading-container_h'}`} ref={ref}>
    <div className="loader" />
  </div>
));

LoadingIndicator.displayName = 'LoadingIndicator';

export default LoadingIndicator;

LoadingIndicator.defaultProps = {
  isSmall: false,
};

LoadingIndicator.propTypes = {
  isSmall: PropType.bool,
};
