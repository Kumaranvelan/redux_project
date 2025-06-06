import React from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  isAuthenticated: boolean;
  children: React.ReactNode;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({
  isAuthenticated,
  children,
}) => {
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};
