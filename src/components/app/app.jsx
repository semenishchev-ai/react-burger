import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigationType, useNavigate } from 'react-router-dom';
import HomePage from '../../pages/home';
import LoginPage from '../../pages/login';
import RegisterPage from '../../pages/register';
import ForgotPasswordPage from '../../pages/forgot-password';
import ResetPasswordPage from '../../pages/reset-password';
import ProfilePage from '../../pages/profile';
import ProtectedRoute from '../protected-route/protected-route';
import { useDispatch, useSelector } from 'react-redux';
import IngredientPage from '../../pages/ingredient-page';
import { fetchIngredients } from '../../services/actions/actions';
import { useEffect } from 'react';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredients-details/ingredient-details';
import { DELETE_INGREDIENT_DETAILS } from '../../services/actions';

function App () {
    const dispatch = useDispatch();
    const loggedIn = useSelector((store) => store.authReducer.isAuthorized);
    const navigate = useNavigate();
    
    const navType = useNavigationType();
    const modalHeader = 'Детали ингредиента';
    const item = useSelector(state => state.mainReducer.currentIngredient);

    function onClose() {
        dispatch({
            type: DELETE_INGREDIENT_DETAILS,
        })
        navigate(-1);
    }

    useEffect(() => {
        dispatch(fetchIngredients())
    }, [dispatch])
    

    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={loggedIn ? <Navigate to="/" /> : <LoginPage />}/>
            <Route path="/register" element={loggedIn ? <Navigate to="/" /> : <RegisterPage />} />
            <Route path="/forgot-password" element={loggedIn ? <Navigate to="/" /> : <ForgotPasswordPage />} />
            <Route path="/reset-password" element={loggedIn ? <Navigate to="/" /> : <ProtectedRoute element={<ResetPasswordPage />} />} />
            <Route path="/profile" element={<ProtectedRoute element={<ProfilePage />} />} />
            {!item._id && <Route path="/ingredients/:id" element={<IngredientPage />} />}

            {item._id && 
            <Route path="/ingredients/:id" element={
                <>
                    <HomePage />
                    <Modal header={modalHeader} onClose={onClose}>
                    {<IngredientDetails ingredient={item} />}
                    </Modal>
                </>
                }
            />
            }
        </Routes>
    )
}

export default App;