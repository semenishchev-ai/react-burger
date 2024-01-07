import { Navigate, useLocation } from 'react-router-dom';
import { FC, JSXElementConstructor, ReactElement, ReactNode, useEffect, useState } from 'react';
import { getUserInfo } from '../../services/actions/auth-actions';
import PropTypes from 'prop-types';
import { useSelector } from '../../hooks/useSelector';
import { useDispatch } from '../../hooks/useDispatch';

interface IProtectedRouteProps {
  element: ReactElement;
}

export const ProtectedRoute: FC<IProtectedRouteProps> = ({ element }) => {
  const [isUserLoaded, setUserLoaded] = useState(false);
  const auth = useSelector((store) => store.authReducer.isAuthorized);
  const dispatch = useDispatch();
  const location = useLocation();

  const init = async () => {
    dispatch(getUserInfo());
    setUserLoaded(true);
  };

  useEffect(() => {
    init();
  }, []);

  if (!isUserLoaded) {
    return null;
  }

  return auth ? element : <Navigate to="/login" state={{ from: location}}/>;
}

export default ProtectedRoute;