import { getCookie, refreshToken, setCookie } from "../services/actions/auth-actions";

const BASE_URL = 'https://norma.nomoreparties.space/api';

const checkResponse = (res) => {
    if (res.ok) {
        return res.json();
    } else {
        console.error(`Error ${res.status}: ${res.statusText}`);
        return res.json().then((errorData) => {
            console.error('Error details:', errorData);
            return Promise.reject(`Error ${res.status}`);
        });
    }
};


export const request = async (endpoint, options) => {
    return fetch(BASE_URL + endpoint, options).then(checkResponse)
}

export const requestWithRefresh = async (endpoint, options) => {
  try {
    return request(endpoint, options)
  } catch(err) {
    if (err.message === 'jwt expired') {
      const newTokens = await refreshToken();
      localStorage.setItem('refreshToken', newTokens.refreshToken);
      setCookie('accessToken', newTokens.accessToken);
      options.headers.authorization = newTokens.accessToken;
      return request(endpoint, options);
    } else {
      return Promise.reject(err);
    }
  }
}

export const registration = (endpoint, data) => {
    const options = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: data.email,
            password: data.password,
            name: data.name,
          }),
    }
    return request(endpoint, options)
}

export const login = (endpoint, data) => {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: data.email,
            password: data.password,
          }),
    }
    return request(endpoint, options) 
}

export const logout = (endpoint, data) => {
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
    return request(endpoint, options) 
}

export const forgotPassword = (endpoint, email) => {
    const options = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
          }),
    }
    return request(endpoint, options)
}

export const resetPassword = (endpoint, password, code) => {
    const options = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            password: password,
            token: code,
          }),
    }
    return request(endpoint, options)
}

export const getUser = (endpoint) => {
  const options = {
      method: 'GET',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          authorization: getCookie('accessToken'),
        },
  }
  return requestWithRefresh(endpoint, options)
}

export const patchUser = (endpoint, data) => {
  const options = {
      method: 'PATCH',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          authorization: getCookie('accessToken'),
        },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
        name: data.name,
      }),
  }
  return requestWithRefresh(endpoint, options)
}
