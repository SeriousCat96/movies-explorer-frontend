import PropTypes from 'prop-types';
import cx from 'classnames';
import './Button.css';

export const Button = ({ className, children, onClick, ...props }) => {
  return (
    <button className={cx('button', className)} onClick={onClick} {...props}>
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onClick: PropTypes.func,
}

export default Button;