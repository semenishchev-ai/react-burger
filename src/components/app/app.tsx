import { Routes, Route, Navigate, useLocation, useNavigate, useNavigationType } from 'react-router-dom';
import HomePage from '../../pages/home';
import LoginPage from '../../pages/login';
import RegisterPage from '../../pages/register';
import ForgotPasswordPage from '../../pages/forgot-password';
import ResetPasswordPage from '../../pages/reset-password';
import ProfilePage from '../../pages/profile';
import ProtectedRoute from '../protected-route/protected-route';
import IngredientPage from '../../pages/ingredient-page';
import { fetchIngredients } from '../../services/actions/actions';
import { useEffect } from 'react';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredients-details/ingredient-details';
import ActionTypes from '../../services/actions';
import AppHeader from '../app-header/app-header';
import { useSelector } from '../../hooks/useSelector';
import { useDispatch } from '../../hooks/useDispatch';

function App () {
    const loggedIn = useSelector((store) => store.authReducer.isAuthorized);
    const navigate = useNavigate();
    const navType = useNavigationType();
    const location = useLocation();
    const background = (navType === 'POP' ? undefined : location.state?.background);
    const from = location.state?.from || '/';

    const dispatch = useDispatch();

    const modalHeader = 'Детали ингредиента';
    const item = useSelector(state => state.mainReducer.currentIngredient);
    const isNextStep = (from.pathname === '/forgot-password');

    function onClose() {
        dispatch({
            type: ActionTypes.DELETE_INGREDIENT_DETAILS,
        })
        navigate(-1);
    }

    useEffect(() => {
        dispatch(fetchIngredients())
    }, [dispatch])
    

    return (
        <>
            <AppHeader />
            <Routes location={background || location}>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={loggedIn ? <Navigate to={from} /> : <LoginPage />}/>
                <Route path="/register" element={loggedIn ? <Navigate to={from} /> : <RegisterPage />} />
                <Route path="/forgot-password" element={loggedIn ? <Navigate to={from} /> : <ForgotPasswordPage />} />
                <Route path="/reset-password" element={!isNextStep ? <Navigate to={from} /> : <ResetPasswordPage />} />
                <Route path="/profile" element={<ProtectedRoute element={<ProfilePage />} />} />
                <Route path="/ingredients/:id" element={<IngredientPage />} />
            </Routes>
            {background && (
                <Routes>
                    <Route path="/ingredients/:id" element={
                        <Modal header={modalHeader} onClose={onClose}>
                            <IngredientDetails ingredient={item} />
                        </Modal>}
                    />
                </Routes>
            )}
        </>        
    )
}

export default App;