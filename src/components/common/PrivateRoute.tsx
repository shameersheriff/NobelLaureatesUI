import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import { ScreenRoute } from "../../Routers";

interface PrivateRouteProps {
  component: React.ComponentType<any>;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
  ...rest
}) => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    return <div>Error: AuthContext is not provided</div>;
  }

  const { user } = authContext;

  return user ? <Component {...rest} /> : <Navigate to={ScreenRoute.Login} />;
};

export default PrivateRoute;
