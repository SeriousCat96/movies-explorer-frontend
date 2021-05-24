import React from 'react';
import { Route, Redirect } from "react-router-dom";
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

const AuthRoute = ({ children, ...rest  }) => {
  const loggedInUser = React.useContext(CurrentUserContext);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        loggedInUser ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

export default AuthRoute;