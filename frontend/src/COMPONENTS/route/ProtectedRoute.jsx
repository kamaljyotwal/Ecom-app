import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectedRoute({ children, adminRoute, ...rest }) {
  const { isAuthenticated, loading, user } = useSelector((state) => state.user);

  return (
    <>
      {loading === false && (
        <Route
          {...rest}
          render={(props) => {
            if (isAuthenticated === false) {
              return <Redirect to={"/login"} />;
            }
            if (adminRoute && user.role !== "admin") {
              return <Redirect to="/" />;
            }
            return children;
          }}
        />
      )}
    </>
  );
}
