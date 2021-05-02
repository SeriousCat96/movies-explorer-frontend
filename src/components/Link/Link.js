import { Link as RouterLink, NavLink as RouterNavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Link.css';

const isCrossDomainLink = (link) => {
  if (link.startsWith('http')) {
    const url = link instanceof URL ? link : new URL(link);
    return url.hostname !== window.location.hostname;
  }
}

export const Link = ({ activeStyled, className, to, target, rel, children, ...props }) => {
  return (
    isCrossDomainLink(to) ? (
      <a href={to} className={`link${className && ` ${className}`}`} target={target} rel={rel}>
        {children}
      </a>
    ) : (
      activeStyled ? (
        <RouterNavLink to={to} className={`link${className && ` ${className}`}`} {...props}>
          {children}
        </RouterNavLink>
      ) : (
        <RouterLink to={to} className={`link${className && ` ${className}`}`} {...props}>
          {children}
        </RouterLink>
      )
    )
  );
}

Link.defaultProps = {
  activeStyled: false,
  to: window.location.pathname,
  target: '_blank',
  rel: "noreferrer"
}
Link.propTypes = {
  activeStyled: PropTypes.bool,
  to: PropTypes.string.isRequired,
  target: PropTypes.string,
  rel: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]).isRequired
}

export default Link;