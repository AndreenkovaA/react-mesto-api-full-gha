import React from 'react';
import { Navigate } from "react-router-dom";

const ProtectedRouteElement = ({ loggedIn, children }) => {
  if (loggedIn) {
    return children;
  }

  return <Navigate to="/sign-in" replace />;
}

export default ProtectedRouteElement;