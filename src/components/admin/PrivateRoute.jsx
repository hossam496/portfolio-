import { Navigate, useLocation } from 'react-router-dom';

export function PrivateRoute({ children }) {
  const token = localStorage.getItem('portfolio_token');
  const loc = useLocation();
  if (!token) {
    return <Navigate to="/admin/login" replace state={{ from: loc }} />;
  }
  return children;
}
