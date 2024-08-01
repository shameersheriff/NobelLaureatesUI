import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";

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

  return user ? <Component {...rest} /> : <Navigate to="/login" />;
};

export default PrivateRoute;