import ListItem from '../ListItem/ListItem';
import PropTypes from 'prop-types';
import './List.css';

function List({ className, children, isOrdered }) {
  const items = children.map((item, i) => (
    <ListItem key={new Date().getTime() + i}>
      {item}
    </ListItem>
  ));

  return (
    isOrdered ? (
      <ol className={`list${className && ` ${className}`}`}>
        {items}
      </ol>
    ) : (
      <ul className={`list${className && ` ${className}`}`}>
        {items}
      </ul>
    )
  );
}

List.propTypes = {
  className: PropTypes.string,
  isOrdered: PropTypes.bool,
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
}

List.defaultProps = {
  isOrdered: false,
}

export default List;