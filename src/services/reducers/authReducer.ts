import { TUserData } from "../../utils/types";
import ActionTypes from "../actions";

type TAuthState = {
    user: TUserData;
    accessToken: string;
    isAuthorized: boolean;
}

const initState: TAuthState = {
    user: {
        email: '',
        password: '',
    },
    accessToken: '',
    isAuthorized: false,
};

export type TActionAuth = {
    type: ActionTypes,
    data: {
        user: TUserData,
    },
}

export const authReducer = (state: TAuthState = initState,  action: TActionAuth): TAuthState => {
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
                user: {
                    email: '',
                    password: '',
                },
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