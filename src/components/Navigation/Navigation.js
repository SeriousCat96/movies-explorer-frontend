import PropTypes from 'prop-types';
import List from '../List/List';
import './Navigation.css';

function Navigation({ children, className }) {
  return (
    <nav>
      <List className={`nav${className && ` ${className}`}`}>
        {children}
      </List>
    </nav>
  );
}

Navigation.propTypes = {
  className: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
}

export default Navigation;
