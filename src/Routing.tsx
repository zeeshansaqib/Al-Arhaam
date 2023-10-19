import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { ROUTES } from "./pages/routes";

// Constant for user_info
const USER_INFO_KEY = "user_info";

// Utility function to check authentication
export const isAuthenticated = (): boolean => {
  const userData = JSON.parse(localStorage.getItem(USER_INFO_KEY) || "{}");
  return Boolean(userData.accessToken);
};

interface RouteProps {
  children: React.ReactNode;
  redirectTo: string;
  guard?: ((children: React.ReactNode) => React.ReactNode) | null;
}

// ProtectedRoute
export const ProtectedRoute: React.FC<RouteProps> = ({
  children,
  redirectTo,
}) => {
  const isAuth = isAuthenticated();
  if (!isAuth) return <Navigate to={redirectTo} />;
  return <>{children}</>;
};

// PrivateRoute
export const PrivateRoute: React.FC<RouteProps> = ({
  children,
  redirectTo,
}) => {
  const isAuth = isAuthenticated();
  if (isAuth) return <Navigate to={redirectTo} />;
  return <>{children}</>;
};

const Routing: React.FC = () => (
  <Routes>
    {ROUTES.map(
      ({ path, component: Component, isProtected, redirectTo }, index) => (
        <Route
          key={index}
          path={path}
          element={
            isProtected ? (
              <ProtectedRoute redirectTo={redirectTo}>
                <Component />
              </ProtectedRoute>
            ) : (
              <PrivateRoute redirectTo={redirectTo}>
                <Component />
              </PrivateRoute>
            )
          }
        />
      )
    )}
    <Route path="*" element={<Navigate to="/login" replace />} />
  </Routes>
);

export default Routing;
