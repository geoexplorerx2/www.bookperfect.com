import React, { Fragment } from "react";
import { Redirect, Route } from "react-router-dom";


const AuthRoutes = (props: any) => {

  var { path, isAuthUser, type, component } = props;
  let Component = component;

  return (
    <Route {...props} render={(props: any) =>
    (
      type === "private" && isAuthUser ? (
        <Fragment>
          <Component {...props} />
        </Fragment>
      ) : <Redirect to={{
        pathname: "/",
        state: {
          prevLocation: path,
        }
      }}
      />
    )
    } />
  );
};

export default AuthRoutes;