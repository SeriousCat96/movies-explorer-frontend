import { Link as RouterLink, NavLink as RouterNavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import cx from 'classnames';
import './Link.css';

const isCrossDomainLink = (link) => {
  if (link.startsWith('http')) {
    const url = link instanceof URL ? link : new URL(link);
    return url.hostname !== window.location.hostname;
  }
}

export const Link = ({ activeClassName, className, to, target, rel, children, ...props }) => {
  const classNames = cx('link', className);

  return (
    isCrossDomainLink(to) ? (
      <a href={to} className={classNames} target={target} rel={rel}>
        {children}
      </a>
    ) : (
      activeClassName ? (
        <RouterNavLink to={to} className={classNames} activeClassName={activeClassName} {...props}>
          {children}
        </RouterNavLink>
      ) : (
        <RouterLink to={to} className={classNames} {...props}>
          {children}
        </RouterLink>
      )
    )
  );
}

Link.defaultProps = {
  to: window.location.pathname,
  target: '_blank',
  rel: "noreferrer"
}
Link.propTypes = {
  activeClassName: PropTypes.string,
  to: PropTypes.string.isRequired,
  target: PropTypes.string,
  rel: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.element,
  ]).isRequired
}

export default Link;