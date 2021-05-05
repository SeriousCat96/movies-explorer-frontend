import PropTypes from 'prop-types';
import List from '../List/List.jsx';
import cx from 'classnames';
import './Navigation.css';

function Navigation({ children, className, itemsClassName }) {
  return (
    <nav className={cx('nav', className)}>
      <List className={itemsClassName}>
        {children}
      </List>
    </nav>
  );
}

Navigation.propTypes = {
  className: PropTypes.string,
  itemsClassName: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
}

export default Navigation;
