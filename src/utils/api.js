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


export const request = (endpoint, options) => {
    return fetch(BASE_URL + endpoint, options).then(checkResponse)
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
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            token: data.token,
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


