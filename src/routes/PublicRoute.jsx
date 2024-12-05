
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PublicRoute = ({ children }) => {
  const { currentUser } = useSelector((state) => state.user);
  if (currentUser) {
    return <Navigate to="/home" />;
  }
  return children;
};

export default PublicRoute;
