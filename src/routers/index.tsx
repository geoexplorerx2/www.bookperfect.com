import { Suspense, useEffect } from "react";
import {
  Switch, 
  Route,
  Redirect,
  useLocation,
  useHistory
} from 'react-router-dom';
import auths from "../api/auths";
import { ErrorPage } from "../views";
import AuthRoutes from "./AuthRouter";
import viewsUrls from "./routes";
// import warning from "tiny-warning";

function Routers() {
  const location = useLocation();
  const urlHistory = useHistory();

  var auth = auths;
  var isAuthUser = auth.isAuthenticated();

  useEffect(() => {
    
    const isValid = viewsUrls.find(e => e.path == location.pathname);
    // if (!isValid) {
    //     urlHistory.push("/404");
    // }
    // if(location.pathname != window.location.pathname) window.location.reload();
  }, [location.pathname]);

  return (
    
      <Switch>
        
        {/* <HeaderActions links = { links }/> */}
        {
          viewsUrls.map(({ component, path, exact, type}) => {
            return (
              // <Route
              //   key={path}
              //   component={component}
              //   exact={!!exact}
              //   path={path}
              // />
              <AuthRoutes
                exact={!!exact}
                path={path}
                isAuthUser={isAuthUser}
                type={type}
                component={component}
              />
            );
          })
        }

        <Route component = { ErrorPage } />
        {/* <Redirect to="/404" /> */}

      </Switch>
    // </Suspense>
  );
}

export default Routers;
