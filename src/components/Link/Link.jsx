import { isURL, isCrossDomainLink, isRoute, getPathName } from '../../utils/url';
import { Link as ReactRouterLink, NavLink as ReactRouterNavLink } from 'react-router-dom';
import { Link as ReactScrollLink } from 'react-scroll';
import PropTypes from 'prop-types';
import cx from 'classnames';
import './Link.css';

export const RouterLink = ({activeClassName, className, to, children, ...props}) => {
  return (
    activeClassName ? (
      <ReactRouterNavLink to={to} className={className} activeClassName={activeClassName} {...props}>
        {children}
      </ReactRouterNavLink>
    ) : (
      <ReactRouterLink to={to} className={className} {...props}>
        {children}
      </ReactRouterLink>
    )
  );
}

export const ScrollLink = ({to, className, href, children, ...props}) => {
  return (
    <ReactScrollLink to={to} className={className} href={href} {...props}>
      {children}
    </ReactScrollLink>
  );
}

export const Link = ({ activeClassName, className, to, href, target, rel, children, ...props }) => {
  const classNames = cx('link', className);

  return (
    isURL(to) ? (
      isCrossDomainLink(to) ? (
        <a href={to} className={classNames} target={target} rel={rel}>
          {children}
        </a>
      ) : (
        <RouterLink to={getPathName(to)} className={classNames} activeClassName={activeClassName} {...props}>
          {children}
        </RouterLink>
      )
    ) : (
      isRoute(to) ? (
        <RouterLink to={to} className={classNames} activeClassName={activeClassName} {...props}>
          {children}
        </RouterLink>
      ) : (
        <ScrollLink to={to} className={classNames} href={href} {...props}>
          {children}
        </ScrollLink>
      )
    )
  );
}

RouterLink.defaultProps = {
  to: '/',
};

Link.defaultProps = {
  to: window.location.pathname,
  href: window.location.pathname,
  target: '_blank',
  rel: "noreferrer"
};

RouterLink.propTypes = {
  to: PropTypes.string.isRequired,
  activeClassName: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.element,
  ]).isRequired
};

ScrollLink.propTypes = {
  to: PropTypes.string.isRequired,
  className: PropTypes.string,
  activeClass: PropTypes.string,
  smooth: PropTypes.bool,
  spy: PropTypes.bool,
  href: PropTypes.string,
  duration: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.func,
  ]),
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.element,
  ]).isRequired
};

Link.propTypes = {
  to: PropTypes.string.isRequired,
  activeClassName: PropTypes.string,
  href: PropTypes.string,
  target: PropTypes.string,
  rel: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.element,
  ]).isRequired
};

export default Link;