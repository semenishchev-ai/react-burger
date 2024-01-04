import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfo } from '../../services/actions/auth-actions';
import PropTypes from 'prop-types';

export const ProtectedRoute = ({ element }) => {
  const [isUserLoaded, setUserLoaded] = useState(false);
  const auth = useSelector((store) => store.authReducer.isAuthorized);
  const dispatch = useDispatch();

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

  return auth ? element : <Navigate to="/login" replace/>;
}

ProtectedRoute.propTypes = {
  element: PropTypes.element,
}

export default ProtectedRoute;