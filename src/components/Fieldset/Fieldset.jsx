import PropTypes from 'prop-types';
import cx from 'classnames';
import './Fieldset.css';

function Fieldset({className, children, ...props}) {
  return (
    <fieldset
      className={cx('fieldset', className) }
      {...props}
    >
      {children}
    </fieldset>
  );
}

Fieldset.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export default Fieldset;
