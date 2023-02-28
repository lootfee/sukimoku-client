import { useLocation, Navigate } from 'react-router-dom';
import { useUser } from '../contexts/UserProvider';

function PrivateRoute({ children }) {
  const { user } = useUser();
  const location = useLocation();

  if (user === undefined) {
    return null;
  }
  else if (user) {
    return children;
  }
  else {
    const url = location.pathname + location.search + location.hash;
    return <Navigate to="/login" state={{next: url}} />
  }
}

export default PrivateRoute;