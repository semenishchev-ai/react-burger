import { TUserData } from "../../utils/types";
import ActionTypes from "../actions";

const initState = {
    user: {},
    accessToken: '',
    isAuthorized: false,
};

export type TActionAuth = {
    type: ActionTypes,
    data: {
        user: TUserData,
    },
}

export const authReducer = (state = initState,  action: TActionAuth) => {
    switch (action.type) {
        case ActionTypes.REGISTER_USER:
            return {
                ...state,
                user: action.data.user,
                isAuthorized: true,
            };
        case ActionTypes.LOGIN_USER:
            return {
                ...state,
                user: action.data.user,
                isAuthorized: true,
            };
        case ActionTypes.LOGOUT_USER:
            return {
                ...state,
                user: {},
                isAuthorized: false,
            };
        case ActionTypes.CHECK_TOKEN:
            return {
                ...state,
                user: action.data.user,
                isAuthorized: true,
            }
        default:
            return state;
    }
}