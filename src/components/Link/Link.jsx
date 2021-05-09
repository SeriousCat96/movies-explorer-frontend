import { urlRegex } from '../../utils/regex';
import { Link as RouterLink, NavLink as RouterNavLink } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import PropTypes from 'prop-types';
import cx from 'classnames';
import './Link.css';

const isURL = (link) => urlRegex.test(link);
const isRoute = (link) => link.startsWith('/');

export const Link = ({ activeClassName, className, to, href, target, rel, children, ...props }) => {
  const classNames = cx('link', className);

  return (
    isURL(to) ? (
      <a href={to} className={classNames} target={target} rel={rel}>
          {children}
      </a>
    ) : (
      isRoute(to) ? (
        activeClassName ? (
          <RouterNavLink to={to} className={classNames} activeClassName={activeClassName} {...props}>
            {children}
          </RouterNavLink>
        ) : (
          <RouterLink to={to} className={classNames} {...props}>
            {children}
          </RouterLink>
        )
      ) : (
        <ScrollLink to={to} className={classNames} href={href} {...props}>
          {children}
        </ScrollLink>
      )
    )
  );
}

Link.defaultProps = {
  to: window.location.pathname,
  href: window.location.pathname,
  target: '_blank',
  rel: "noreferrer"
}
Link.propTypes = {
  activeClassName: PropTypes.string,
  to: PropTypes.string.isRequired,
  href: PropTypes.string,
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