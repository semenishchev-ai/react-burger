import { CHECK_TOKEN, LOGIN_USER, LOGOUT_USER, REGISTER_USER } from "../actions";

const initState = {
    user: {},
    accessToken: '',
    isAuthorized: false,
};

export const authReducer = (state = initState,  action) => {
    switch (action.type) {
        case REGISTER_USER:
            return {
                ...state,
                user: action.data.user,
                isAuthorized: true,
            };
        case LOGIN_USER:
            return {
                ...state,
                user: action.data.user,
                isAuthorized: true,
            };
        case LOGOUT_USER:
            return {
                ...state,
                user: {},
                isAuthorized: false,
            };
        case CHECK_TOKEN:
            return {
                ...state,
                user: action.data.user,
                isAuthorized: true,
            }
        default:
            return state;
    }
}