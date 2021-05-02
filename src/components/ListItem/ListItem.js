import PropTypes from 'prop-types';

const ListItem = ({ children, className }) => {
  return (
    <li className={className}>
      {children}
    </li>
  );
}

ListItem.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
}

export default ListItem;
