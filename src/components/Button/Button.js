import PropTypes from 'prop-types';
import './Button.css';

export const Button = ({ className, children, onClick, ...props }) => {
  return (
    <button className={`button${className && ` ${className}`}`} onClick={onClick} {...props}>
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.element
  ]),
  className: PropTypes.string,
  onClick: PropTypes.func,
}

export default Button;