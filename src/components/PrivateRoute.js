import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAuthedUserId } from '../utils/selectors';

export default function PrivateRoute() {
  const authedUser = useSelector(selectAuthedUserId);
  const location = useLocation();
  
  if (!authedUser) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  
  return <Outlet />;
}