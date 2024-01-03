import { LOGIN_USER, LOGOUT_USER, REGISTER_USER } from ".";
import { login, logout, registration } from "../../utils/api";

export function registrationRequest(data) {
    return function(dispatch) {
        registration("/auth/register", data)
        .then((ans) => {
            dispatch({
                type: REGISTER_USER,
                data: ans,
            })
        })
        .catch((error) => {
          console.log(error);
        });
    }
}

export function loginRequest(data) {
    return function(dispatch) {
        login("/auth/login", data)
        .then((ans) => {
            dispatch({
                type: LOGIN_USER,
                data: ans,
            })
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
            console.log("done");
        })
    }
}

export function logoutRequest(data) {
    return function(dispatch) {
        logout("/auth/logout", data)
        .then((ans) => {
            dispatch({
                type: LOGOUT_USER,
                data: ans,
            })
        })
        .catch((error) => {
          console.log(error);
        });
        
    }
}
