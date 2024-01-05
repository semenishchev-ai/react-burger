import { CHECK_TOKEN, LOGIN_USER, LOGOUT_USER, REGISTER_USER } from ".";
import { getUser, login, logout, patchUser, registration, request } from "../../utils/api";

export function registrationRequest(data) {
    return function(dispatch) {
        registration("/auth/register", data)
        .then((ans) => {
            setCookie('accessToken', ans.accessToken);
            localStorage.setItem('refreshToken', ans.refreshToken)
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
            setCookie('accessToken', ans.accessToken);
            localStorage.setItem('refreshToken', ans.refreshToken)
            dispatch({
                type: LOGIN_USER,
                data: ans,
            })
        })
        .catch((error) => {
          console.log(error);
        })
    }
}

export function logoutRequest(data) {
    return function(dispatch) {
        logout("/auth/logout", data)
        .then((ans) => {
            deleteCookie('accessToken');
            localStorage.setItem('refreshToken', ans.refreshToken)
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
  return function(dispatch) {
    getUser('/auth/user')
    .then((ans) => {
      dispatch({
          type: CHECK_TOKEN,
          data: ans,
      })
    })
    .catch((error) => {
      console.log(error);
    })
  }
}

export function patchUserInfo(data) {
  return function(dispatch) {
    patchUser('/auth/user', data)
    .then((ans) => {
      dispatch({
          type: CHECK_TOKEN,
          data: ans,
      })
    })
    .catch((error) => {
      console.log(error);
    })
  }
}

export function setCookie(name, value, props) {
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

export function getCookie(name) {
    const matches = document.cookie.match(
      new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function deleteCookie(name) {
  setCookie(name, null, { expires: -1 });
}
