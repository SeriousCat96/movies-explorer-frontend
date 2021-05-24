import PropTypes from 'prop-types';
import cx from 'classnames';
import './List.css';

function List({ className, itemClassName, children, isOrdered }) {
  const items = children.map((item) => (
    <li key={item.key || item.props.id} className={cx('list__item', itemClassName)} >
      {item}
    </li>
  ));

  return (
    isOrdered ? (
      <ol className={cx('list', className)}>
        {items}
      </ol>
    ) : (
      <ul className={cx('list', className)}>
        {items}
      </ul>
    )
  );
}

List.propTypes = {
  className: PropTypes.string,
  itemClassName: PropTypes.string,
  isOrdered: PropTypes.bool,
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
}

List.defaultProps = {
  isOrdered: false,
}

export default List;