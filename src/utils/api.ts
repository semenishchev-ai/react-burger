import { getCookie, refreshToken, setCookie } from "../services/actions/auth-actions";
import { TUserData } from "./types";

const BASE_URL = 'https://norma.nomoreparties.space/api';

const checkResponse = (res: any) => {
    if (res.ok) {
        return res.json();
    } else {
        console.error(`Error ${res.status}: ${res.statusText}`);
        return res.json().then((errorData: any) => {
            console.error('Error details:', errorData);
            return Promise.reject(`Error ${res.status}`);
        });
    }
};


export const request = async (endpoint: string, options?: any) => {
    return fetch(BASE_URL + endpoint, options).then(checkResponse)
}

export const requestWithRefresh = async (endpoint: string, options: any) => {
  try {
    return request(endpoint, options)
  } catch(err: any) {
    if (err.message === 'jwt expired') {
      const newTokens: any = await refreshToken();
      localStorage.setItem('refreshToken', newTokens.refreshToken);
      setCookie('accessToken', newTokens.accessToken);
      options.headers.authorization = newTokens.accessToken;
      return request(endpoint, options);
    } else {
      return Promise.reject(err);
    }
  }
}

export const registration = (endpoint: string, data: TUserData) => {
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

export const login = (endpoint: string, data: TUserData) => {
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

export const logout = (endpoint: string) => {
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

export const forgotPassword = (endpoint: string, email: string) => {
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

export const resetPassword = (endpoint: string, password: string, code: string) => {
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

export const getUser = (endpoint: string) => {
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

export const patchUser = (endpoint: string, data: TUserData) => {
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
