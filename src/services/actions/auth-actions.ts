import ActionTypes from ".";
import { getUser, login, logout, patchUser, registration, request } from "../../utils/api";
import { TDispatch, TUserData } from "../../utils/types";

export function registrationRequest(data: TUserData) {
    return function(dispatch: TDispatch) {
        registration("/auth/register", data)
        .then((ans) => {
            setCookie('accessToken', ans.accessToken);
            localStorage.setItem('refreshToken', ans.refreshToken)
            dispatch({
                type: ActionTypes.REGISTER_USER,
                data: ans,
            })
        })
        .catch((error) => {
          console.log(error);
        });
    }
}

export function loginRequest(data: TUserData) {
    return function(dispatch: TDispatch) {
        login("/auth/login", data)
        .then((ans) => {
            setCookie('accessToken', ans.accessToken);
            localStorage.setItem('refreshToken', ans.refreshToken)
            dispatch({
                type: ActionTypes.LOGIN_USER,
                data: ans,
            })
        })
        .catch((error) => {
          console.log(error);
        })
    }
}

export function logoutRequest() {
    return function(dispatch: TDispatch) {
        logout("/auth/logout")
        .then((ans) => {
            deleteCookie('accessToken');
            localStorage.setItem('refreshToken', ans.refreshToken)
            dispatch({
                type: ActionTypes.LOGOUT_USER,
                data: ans,
            })
        })
        .catch((error) => {
          console.log(error);
        });
        
    }
}

export function refreshToken() {
    const options = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: localStorage.getItem('refreshToken'),
        }),
    }
    return request("/auth/token", options);
}

export function getUserInfo() {
  return function(dispatch: TDispatch) {
    return getUser('/auth/user')
    .then((ans) => {
      dispatch({
          type: ActionTypes.CHECK_TOKEN,
          data: ans,
      })
    })
    .catch((error) => {
      console.log(error);
    })
  }
}

export function patchUserInfo(data: TUserData) {
  return function(dispatch: TDispatch) {
    patchUser('/auth/user', data)
    .then((ans) => {
      dispatch({
          type: ActionTypes.CHECK_TOKEN,
          data: ans,
      })
    })
    .catch((error) => {
      console.log(error);
    })
  }
}

export function setCookie(name: string, value: string, props?: any) {
    props = props || {};
    let exp = props.expires;
    if (typeof exp == 'number' && exp) {
      const d = new Date();
      d.setTime(d.getTime() + exp * 1000);
      exp = props.expires = d;
    }
    if (exp && exp.toUTCString) {
      props.expires = exp.toUTCString();
    }
    value = encodeURIComponent(value);
    let updatedCookie = name + '=' + value;
    for (const propName in props) {
      updatedCookie += '; ' + propName;
      const propValue = props[propName];
      if (propValue !== true) {
        updatedCookie += '=' + propValue;
      }
    }
    document.cookie = updatedCookie;
}

export function getCookie(name: string) {
    const matches = document.cookie.match(
      new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function deleteCookie(name: string) {
  setCookie(name, '', { expires: -1 });
}
